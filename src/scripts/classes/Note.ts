import {Sample} from "./Sample";
import {Source} from "./Source";


export interface NoteOptions {

}

export class Note {
    public samples: Sample[] = []
    public id: number
    public options: NoteOptions
    public sources: Source[] = []

    constructor(id: number, options?: NoteOptions) {
        this.id = id
        if (options) {
            this.options = options
        } else {
            this.options = {}
        }
    }

    public pushSample(sample: Sample){
        this.samples.push(sample)
    }
}