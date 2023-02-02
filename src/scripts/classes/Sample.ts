import {ToneAudioBuffer} from "tone";

export interface SampleOptions {
    path: string
    tags: string
    silencedByTags: string
    rootNote: string | number
    loNote?: string | number
    hiNote?: string | number
    loVel?: string | number
    hiVel?: string | number
    loopStart?: string | number
    loopEnd?: string | number
    seqPosition?: string | number
    loopEnabled?: string | boolean
    tuning?: string | number
    start?: string | number
    volume?: string
}

export class Sample {
    public buffer: ToneAudioBuffer

    public path: string = ''
    public tags: string = ''
    public silencedByTags: string = ''

    public rootNote: number = 1
    public loNote: number = 1
    public hiNote: number = 1
    public loVel: number = 0
    public hiVel: number = 127
    public loopStart: number | undefined = undefined
    public loopEnd: number | undefined = undefined
    public seqPosition: number | undefined = undefined
    public loopEnabled: boolean = false
    public tuning: number = 0
    public start: number = 0
    public volume: string = '0dB'


    constructor(buffer: ToneAudioBuffer, options: SampleOptions) {
        this.buffer = buffer
        this.setOptions(options)
    }

    setOptions(options: SampleOptions){
        this.path = options.path
        if (options.tags !== undefined) this.tags = options.tags
        if (options.silencedByTags !== undefined) this.silencedByTags = options.silencedByTags

        this.rootNote = typeof options.rootNote === 'string' ? parseInt(options.rootNote) : options.rootNote
        if (options.loNote !== undefined) this.loNote = typeof options.loNote === 'string' ? parseInt(options.loNote) : options.loNote
        if (options.hiNote !== undefined) this.hiNote = typeof options.hiNote === 'string' ? parseInt(options.hiNote) : options.hiNote
        if (options.loVel !== undefined) this.loVel = typeof options.loVel === 'string' ? parseInt(options.loVel) : options.loVel
        if (options.hiVel !== undefined) this.hiVel = typeof options.hiVel === 'string' ? parseInt(options.hiVel) : options.hiVel
        if (options.loopStart !== undefined) this.loopStart = typeof options.loopStart === 'string' ? parseInt(options.loopStart) : options.loopStart
        if (options.loopEnd !== undefined) this.loopEnd = typeof options.loopEnd === 'string' ? parseInt(options.loopEnd) : options.loopEnd
        if (options.seqPosition !== undefined) this.seqPosition = typeof options.seqPosition === 'string' ? parseInt(options.seqPosition) : options.seqPosition
        if (options.loopEnabled !== undefined) this.loopEnabled = options.loopEnabled == true
        if (options.tuning !== undefined) this.tuning = typeof options.tuning === 'string' ? parseFloat(options.tuning) : options.tuning
        if (options.start !== undefined) this.start = typeof options.start === 'string' ? parseInt(options.start) : options.start
        if (options.volume !== undefined) this.volume = options.volume
    }
}