import {parseSamples} from "../lib"
import {Sample} from "./Sample"
import * as Tone from "tone"
import {Note} from "./Note"
import {Source} from "./Source"
import {PlayerInstrumentOptions} from "./Player";

export interface InstrumentOptions extends PlayerInstrumentOptions{
}

export class Instrument extends EventTarget {

    private _buffersCount: number = 0

    public name: string = ''
    public baseUrl: string = ''
    public samples: Sample[] = []
    public notes: Note[] = []

    public url: string

    private _reverb: Tone.Reverb

    private _fadeOut = 0.1
    private _fadeIn = 0
    private _reverbWet = 0
    private _reverbDecay = 2.2
    private _reverbPreDelay = .05


    constructor(options: InstrumentOptions) {
        super()
        this.url = options.url
        if (options.url) {
            this.load(options.url)
        }
        if (options.name) {
            this.name = options.name
        }

        if (options.fadeIn){
            this._fadeIn = options.fadeIn
        }
        if (options.fadeOut){
            this._fadeOut = options.fadeOut
        }

        if (options.reverb){
            if (options.reverb.wet){
                this._reverbWet = options.reverb.wet
            }
            if (options.reverb.decay){
                this._reverbDecay = options.reverb.decay
            }
            if (options.reverb.preDelay){
                this._reverbPreDelay = options.reverb.preDelay
            }
        }

        this._reverb = new Tone.Reverb({wet: this._reverbWet, decay: this._reverbDecay, preDelay: this._reverbPreDelay}).toDestination()
    }

    private _onload = () => {
        this._buffersCount = this._buffersCount - 1
        if (this._buffersCount <= 0){
            const event = new CustomEvent("load")
            this.dispatchEvent(event)
        }
    }

    async load(url: string) {
        const response = await fetch(url)

        let parse_url: URL

        try {
            parse_url = new URL(url)
        } catch (_) {
            parse_url = new URL(url, window.location.origin)
        }
        this.baseUrl = parse_url.origin + parse_url.pathname.substring(0, parse_url.pathname.lastIndexOf("/")) + '/'

        try {
            const parser = new DOMParser()
            const text = await response.text()
            const xmlDoc = parser.parseFromString(text, "text/xml")
            const groups = xmlDoc.getElementsByTagName("groups")[0]

            // парсинг всех семплов в массив
            const samples_arr = parseSamples(groups)
            this._buffersCount = samples_arr.length

            // создание объектов семплов
            samples_arr.forEach((sample_props) => {
                const {path} = sample_props
                const buffer = new Tone.ToneAudioBuffer(this.baseUrl + encodeURIComponent(path.replaceAll('\\', '/')), this._onload)
                this.samples.push( new Sample(buffer, sample_props) )
            })

            // создание объектов midi нот
            this.samples.forEach((sample) => {

                if (sample.loNote && sample.hiNote) {
                    for ( let n = sample.loNote; n <= sample.hiNote; n++ ){
                        const f_note = this.getNote(n)
                        if (f_note === undefined) {
                            const note = new Note(n)
                            note.pushSample(sample)
                            this.notes.push( note )
                        } else {
                            f_note.pushSample(sample)
                        }
                    }
                } else {
                    const id_note = sample.rootNote
                    const f_note = this.getNote(id_note)
                    if (f_note === undefined) {
                        const note = new Note(id_note)
                        note.pushSample(sample)
                        this.notes.push( note )
                    } else {
                        f_note.pushSample(sample)
                    }
                }

            })

        } catch (error) {
            console.log(error)
        }
    }

    private getNote(n: number): Note | undefined {
        return this.notes.filter((el) => el.id === n)[0]
    }

    triggerAttack(note: number, time: number, velocity: number = 1, volume: number = 1): Source | null {
        const note_obj = this.getNote(note)

        if (note_obj !== undefined) {

            const note_samples = note_obj.samples

            // определение какой семпл проигрывать
            const midiVelocity = Math.ceil(velocity*127)
            const samples_by_vel = note_samples.filter((el) => el.loVel <= midiVelocity && el.hiVel >= midiVelocity)
            let sample_to_play
            if (samples_by_vel.length > 0) {
                sample_to_play = samples_by_vel[Math.floor(Math.random()*samples_by_vel.length)]
            }

            if (sample_to_play) {
                const playbackRate = Tone.intervalToFrequencyRatio(sample_to_play.tuning + (note - sample_to_play.rootNote))
                let duration = sample_to_play.loopEnabled? 10000: sample_to_play.buffer.duration / playbackRate

                if (time + duration >= 0) {
                    const volume_tun = parseFloat(sample_to_play.volume.replace('dB', ''))
                    const vol_filter =
                        volume_tun
                            ? new Tone.Volume(volume_tun)
                            : false
                    const source =
                        vol_filter
                            ? new Source().chain( vol_filter, this._reverb, Tone.getDestination() )
                            : new Source().chain( this._reverb, Tone.getDestination() )

                    source.onended = (s) => {
                        const index = note_obj.sources.indexOf(<Source>s)
                        if (index > -1) {
                            note_obj.sources.splice(index, 1)
                        }
                    }

                    source.buffer = sample_to_play.buffer
                    source.set({
                        playbackRate: playbackRate,
                        loop: sample_to_play.loopEnabled,
                        loopStart: sample_to_play.loopStart? sample_to_play.loopStart * source.sampleTime : undefined,
                        loopEnd: sample_to_play.loopEnd? sample_to_play.loopEnd * source.sampleTime : undefined,
                        fadeOut: this._fadeOut,
                        fadeIn: this._fadeIn,
                    })

                    const vel_vol = (midiVelocity / sample_to_play.hiVel) * volume

                    let offset = sample_to_play.start * source.sampleTime
                    let time_i = time

                    if (Tone.now() > time_i) {
                        offset = offset + (Tone.now() - time_i)
                    }
                    if (time_i < 0) {
                        offset = offset + time_i
                        duration = duration + time_i
                        time_i = 0
                    }
                    source.start(time_i, offset, duration, vel_vol)

                    source.sample = sample_to_play
                    if (sample_to_play.tags !== '') this.silencedByTags(source, time_i)

                    note_obj.sources.push(source)

                    return source
                }

            }

        }

        return null
    }

    triggerRelease(source: Tone.ToneBufferSource, time: number): this {
        if (time>=0) source.stop(time)

        return this
    }

    triggerAttackRelease(note: number, time: number, duration: number, velocity: number = 1, volume: number = 1): Source | null {
        const source = this.triggerAttack(note, time, velocity, volume)
        if (source) this.triggerRelease(source, time + duration)

        return source
    }

    stopNotesSources(time?: number){
        this.notes.forEach(note => {
            note.sources.forEach(source => {
                source.fadeOut = 0.01
                source.stop(time)
            })
            note.sources = []
        })
    }


    private silencedByTags(cur_source: Source, time: number) {
        const tags = cur_source.sample?.tags.split(',')
        this.notes.forEach(note => {
            const sourcesByTags = note.sources.filter(el => (el.sample?.silencedByTags.split(',').filter(x => tags?.includes(x)).length)! > 0 )
            sourcesByTags.forEach(source => {
                if (source.startTime <= time && (source.stopTime - source.toSeconds(source.fadeOut)) > time) {
                    source.fadeOut = 0.05
                    source.stop(time)
                }
            })
        })
    }

}