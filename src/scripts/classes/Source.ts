import * as Tone from "tone";
import {Sample} from "./Sample";


export class Source extends Tone.ToneBufferSource {

    public sample?: Sample

    get stopTime(): number {
        return this._stopTime
    }
    get startTime(): number {
        return this._startTime
    }

}