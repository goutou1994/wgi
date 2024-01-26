import wgi_Resource from "./driver/res";
import { SingleRecord } from "./record/base";

enum RecorderState {
    Background,
    Snapshot,
    Capturing,
    Saving,
    Expired
}

export default class Recorder {
    constructor() {
        this.state = RecorderState.Background;
    }
    public record(rcd: SingleRecord) {
        if (this.state != RecorderState.Capturing) return;
        this.records.push(rcd);
    }

    public snapshot() { }
    public save() {
        const resources: Set<wgi_Resource> = new Set();
        for (const rcd of this.records) {
            rcd.deps.recursivelySumDependencies(resources);
        }
    } 

    public state: RecorderState;
    private records: Array<SingleRecord> = [];
}

export const globalRecorder = new Recorder();