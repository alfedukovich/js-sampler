import {Instrument} from "./Instrument"
import * as Tone from "tone"


export interface PalyerInstrumentOptions {
    name: string
    url: string
}
export interface PalyerEventOptions {
    time: number
    note: number
    duration?: number
    velocity: number
    volume: number
}
export interface PalyerLayerOptions {
    volume?: number
    instrument: PalyerInstrumentOptions
    events: [PalyerEventOptions]
}
export interface PalyerOptions {
    onLoad?: () => void
    loop: boolean
    mpm: number
    data?: {
        duration: number
        layers: [PalyerLayerOptions]
    }
}


export interface Layer {
    volume?: null
    instrument: Instrument
    events: [PalyerEventOptions]
}


export class Player {

    public _mpm: number = 0
    public loop: boolean = false

    public duration: number = 0

    public onLoad: () => void = ()=>{}
    public onStart: () => void = ()=>{}

    public instruments: [Instrument] | [] = []
    public layers: [Layer] | [] = []

    public currentTime: number = 0
    public currentPosition: number = 0
    public currentCycle: number = 0
    public currentPercent: number = 0

    private _instrumentCount: number = 0

    private _startTime: number = 0
    private _buffPosition: number = 0

    private _stopped: boolean = true
    private _paused: boolean = false
    private _play: boolean = false


    constructor(options?: PalyerOptions) {
        if (options) {
            this.set(options)
        }
    }

    get mpm(): number {
        return this._mpm
    }
    set mpm(mpm: number) {
        const now = Tone.now()
        const delta = mpm / this._mpm
        const CurPos = ((now - this._startTime) / (60 / this._mpm)) % this.duration
        this._mpm = mpm

        if (this._play) {
            this._startTime = now - CurPos * (60 / this._mpm)
            this._buffPosition = CurPos
            this.currentCycle = 0

            this.instruments.forEach((instrument) => {
                instrument.notes.forEach((note) => {
                    note.sources.forEach((source) => {
                        if (source.startTime <= now && (source.stopTime - source.toSeconds(source.fadeOut)) > now) {
                            source.stop((source.stopTime - source.toSeconds(source.fadeOut) - now) / delta + now )
                        } else if (source.stopTime - source.toSeconds(source.fadeOut) > now) {
                            source.stop()
                            source.disconnect()
                        }
                    })
                })
            })

        }

    }

    public set(options: PalyerOptions): Player{
        this.mpm = options.mpm
        this.loop = options.loop
        this.onLoad = options.onLoad? options.onLoad: () => {}

        if (options.data) {
            this.duration = options.data.duration
            this.createLayers(options.data.layers)
        }

        return this
    }

    private _onload = () => {
        this._instrumentCount = this._instrumentCount - 1
        if (this._instrumentCount <= 0){
            this.onLoad()
            this.onStart()
        }
    }

    private createInstrument(instrument: PalyerInstrumentOptions): Instrument {
        let instrument_obj = this.getInstrumentByName(instrument.name)
        if (!instrument_obj) {
            this._instrumentCount++
            instrument_obj = new Instrument({
                name: instrument.name,
                url: instrument.url,
                onLoad: this._onload
            })
            this.instruments.push(instrument_obj)
        }
        return instrument_obj
    }
    private createLayers(layers: [PalyerLayerOptions]) {
        layers.forEach((layer) => {
            const layer_obj = {
                volume: layer.volume!==undefined? layer.volume: 1,
                instrument: this.createInstrument(layer.instrument),
                events: layer.events
            }
            this.layers.push(layer_obj)
        })
    }

    public getInstrumentByName(name: string): Instrument{
        return this.instruments.filter((el: Instrument) => el.name === name)[0]
    }




    public start(options?: PalyerOptions): Player{
        if (options) {
            this.set(options)
        }

        if (!this._play) {
            this._stopped = false

            if (this._instrumentCount <= 0){
                if (this._paused) {
                    this._paused = false
                }
                this._startTime = Tone.now() - this.currentPosition * (60 / this._mpm)
                this._play = true
                this.scheduler()
            } else {
                this.onStart = ()=>{
                    if (this._paused) {
                        this._paused = false
                    }
                    this._startTime = Tone.now() - this.currentPosition * (60 / this._mpm)
                    this._play = true
                    this.scheduler()
                }
            }
        }

        return this
    }


    private scheduler(){
        this._calcCurrentTime()

        if (!this._stopped && !this._paused) {

            this.currentPosition = ((this.currentTime - this._startTime) / (60 / this._mpm)) % this.duration
            this.currentCycle = Math.floor(((this.currentTime - this._startTime) / (60 / this._mpm)) / this.duration)
            this.currentPercent = this.currentPosition * (100 / this.duration)

            let buffLength = 4

            if (this._buffPosition - (this.currentCycle * this.duration + this.currentPosition) < 2) { // пришла пора загрузить в буфер порцию

                const buffPositionInCycle = this._buffPosition % this.duration

                if (!this.loop && this._buffPosition / this.duration >= 1) {
                    this.stop()
                } else {
                    this.layers.forEach((layer) => {
                        if (layer.events.length > 0) {
                            let pos = buffPositionInCycle
                            let pos_sum: number = 0
                            let events_count: number = 0
                            while (pos_sum <= buffLength) {
                                const {event, findLength} = this._nextEvent(layer.events, pos, events_count === 0)
                                if (event === null || findLength === null) {
                                    break
                                }
                                pos_sum += findLength
                                events_count++
                                if (pos_sum <= buffLength) {
                                    let volume = event.volume
                                    if (layer.volume != null) {
                                        volume *= layer.volume
                                    }

                                    const time_in_s = this._startTime + (this._buffPosition + pos_sum) * (60 / this._mpm)
                                    if (!event.duration) {
                                        layer.instrument.triggerAttack(event.note, time_in_s, event.velocity, volume)
                                    } else {
                                        const duration_in_s = event.duration * (60 / this._mpm)
                                        layer.instrument.triggerAttackRelease(event.note, time_in_s, duration_in_s, event.velocity, volume)
                                    }
                                }
                                pos = (buffPositionInCycle + pos_sum) % this.duration
                            }
                        }
                    })

                    this._buffPosition += buffLength
                }
            }

            window.setTimeout(() => {
                this.scheduler()
            }, 20.0)

        } else {

        }
    }

    private _nextEvent(events: [PalyerEventOptions], startPosition: number, first: boolean): {event: PalyerEventOptions | null, findLength: number | null} {
        const f_events = events.filter(event => {
            return first? event.time >= startPosition: event.time > startPosition
        })
        if (f_events.length > 0) {
            return {event: f_events[0], findLength: f_events[0].time - startPosition}
        }
        if (this.loop) {
            return {event: events[0], findLength: events[0].time + (this.duration - startPosition)}
        } else {
            return {event: null, findLength: null}
        }

    }

    private _calcCurrentTime(){
        this.currentTime = Tone.now()
    }

    public stop(fast?: boolean){
        this._stopped = true
        this.currentPosition = 0
        this.currentCycle = 0
        this.currentPercent = 0
        this._buffPosition = 0
        if (fast) {
            this.instruments.forEach((instrument) => {
                instrument.stopNotesSources()
            })
        }
        this._play = false
    }

    public pause(){
        this._paused = true
        this._buffPosition = 0
        this.currentCycle = 0
        this.instruments.forEach((instrument) => {
            instrument.stopNotesSources()
        })
        this._play = false
    }

}