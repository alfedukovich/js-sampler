import {Instrument} from "./Instrument"
import * as Tone from "tone"


export interface PlayerInstrumentOptions {
    name: string
    url: string
    reverb?: {
        wet?: number
        decay?: number
        preDelay?: number
    }
    fadeOut?: number
    fadeIn?: number
    volume?: number
}

export interface PlayerEventOptions {
    time: number
    note: number
    duration?: number
    velocity?: number
    volume?: number
}
export interface PlayerLayerOptions {
    instrument: string
    events: PlayerEventOptions[]
}
export interface PlayerCompositionOptions {
    duration: number
    layers: PlayerLayerOptions[]
    instruments: PlayerInstrumentOptions[]
}
export interface PalyerOptions {
    onReady?: ()=>void
    loop: boolean
    bpm: number
    composition?: PlayerCompositionOptions
}


export interface Layer {
    volume?: number
    instrument?: Instrument
    events: PlayerEventOptions[]
}


export class Player extends EventTarget {

    public _bpm: number = 0
    public loop: boolean = false

    public duration: number = 0

    private _onStart: () => void = ()=>{}

    public instruments: Instrument[] = []
    public layers: Layer[] = []

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

    private _onReady: () => void = ()=>{}
    private _layersReady: boolean = false


    constructor(options?: PalyerOptions) {
        super()

        Tone.setContext(new Tone.Context({ latencyHint : "playback" }))

        if (options) {
            this.set(options)
        }
    }

    get bpm(): number {
        return this._bpm
    }
    set bpm(bpm: number) {
        const now = Tone.now()
        const delta = bpm / this._bpm
        const CurPos = ((now - this._startTime) / (60 / this._bpm)) % this.duration
        this._bpm = bpm

        if (this._play) {
            this._startTime = now - CurPos * (60 / this._bpm)
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
        this._layersReady = false

        if (options.onReady) this._onReady = options.onReady

        this.bpm = options.bpm
        this.loop = options.loop

        this._instrumentCount = options.composition ? options.composition.instruments.length : 0
        options.composition?.instruments.forEach((instrument) => {
            this.createInstrument(instrument)
        })

        if (options.composition) {
            this.duration = options.composition.duration
            this.createLayers(options.composition.layers)
        }
        this._layersReady = true
        this._onload()

        return this
    }

    private _onload = () => {
        this._instrumentCount = this._instrumentCount - 1
        if (this._instrumentCount <= 0 && this._layersReady){
            const event = new CustomEvent("load")
            this.dispatchEvent(event)
            this._onReady()
            this._onStart()
        }
    }

    private createInstrument(instrument: PlayerInstrumentOptions): Instrument {
        let instrument_obj = this.getInstrumentByName(instrument.name)
        if (!instrument_obj) {
            instrument_obj = new Instrument(instrument)
            instrument_obj.addEventListener('load', ()=>{
                this._onload()
            })
            this.instruments.push(instrument_obj)
        } else {
            this._onload()
        }
        return instrument_obj
    }
    private createLayers(layers: PlayerLayerOptions[]) {
        this.layers = []
        layers.forEach((layer) => {
            const instrument = this.getInstrumentByName(layer.instrument)
            const layer_obj: Layer = {
                instrument: instrument?instrument:undefined,
                events: layer.events
            }
            this.layers.push(layer_obj)
        })
    }

    public getInstrumentByName(name: string): Instrument | undefined {
        const instruments = this.instruments.filter((el) => el.name === name)
        if (instruments.length > 0) {
            return instruments[0]
        } else {
            return undefined
        }
    }

    public getLayersByInstrumentName(name: string): Layer[] {
        const result_layers: Layer[] = []
        this.layers.forEach((layer) => {
            if (layer.instrument?.name === name) {
                result_layers.push(layer)
            }
        })

        return result_layers
    }

    public setInstrumentVolume(instrument_name: string, value: number){
        const instrument = this.getInstrumentByName(instrument_name)
        if (instrument) instrument.volume = value
    }



    public start(options?: PalyerOptions): Player{
        if (options) {
            this.set(options)
        }

        if (!this._play) {
            this._stopped = false

            const st = () => {
                if (this._paused) {
                    this._paused = false
                }
                this._startTime = Tone.now() - this.currentPosition * (60 / this._bpm)
                this._play = true
                this.scheduler()

                const event = new CustomEvent("start")
                this.dispatchEvent(event)
            }

            if (this._instrumentCount <= 0){
                st()
            } else {
                this._onStart = ()=>{
                    st()
                }
            }
        }

        return this
    }


    private scheduler(){
        this._calcCurrentTime()

        if (!this._stopped && !this._paused) {

            this.currentPosition = ((this.currentTime - this._startTime) / (60 / this._bpm)) % this.duration
            this.currentCycle = Math.floor(((this.currentTime - this._startTime) / (60 / this._bpm)) / this.duration)
            this.currentPercent = this.currentPosition * (100 / this.duration)
            const onProgress = new CustomEvent("progress", {detail: {value: this.currentPercent}})
            this.dispatchEvent(onProgress)

            let buffLength = 16

            if (this._buffPosition - (this.currentCycle * this.duration + this.currentPosition) < 8) { // ???????????? ???????? ?????????????????? ?? ?????????? ????????????

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
                                    let volume = event.volume?event.volume:1
                                    if (layer.instrument?.volume != null) {
                                        volume *= layer.instrument?.volume
                                    }

                                    const time_in_s = this._startTime + (this._buffPosition + pos_sum) * (60 / this._bpm)
                                    if (!event.duration) {
                                        layer.instrument?.triggerAttack(event.note, time_in_s, event.velocity, volume)
                                    } else {
                                        const duration_in_s = event.duration * (60 / this._bpm)
                                        layer.instrument?.triggerAttackRelease(event.note, time_in_s, duration_in_s, event.velocity, volume)
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

    private _nextEvent(events: PlayerEventOptions[], startPosition: number, first: boolean): {event: PlayerEventOptions | null, findLength: number | null} {
        const f_events = events.filter(event => {
            return first? event.time >= startPosition: event.time > startPosition
        })
        if (f_events.length > 0) {
            const lowest = f_events.reduce((prev, cur) => (cur.time < prev.time ? cur : prev));
            return {event: lowest, findLength: lowest.time - startPosition}
        }
        if (this.loop) {
            const lowest = events.reduce((prev, cur) => (cur.time < prev.time ? cur : prev));
            return {event: lowest, findLength: lowest.time + (this.duration - startPosition)}
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

        const event = new CustomEvent("stop")
        this.dispatchEvent(event)
    }

    public pause(){
        this._paused = true
        this._buffPosition = 0
        this.currentCycle = 0
        this.instruments.forEach((instrument) => {
            instrument.stopNotesSources()
        })
        this._play = false

        const event = new CustomEvent("pause")
        this.dispatchEvent(event)
    }

}