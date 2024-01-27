import ResourceDependencies from "../../common/deps";
import { DataStream } from "../../common/utils";

export enum RecordType {
    Create,
    Command,
    Destroy
}

export enum RecordKind {
    CreateBuffer = 1,
}

export abstract class SingleRecord {
    abstract readonly __type: RecordType;
    abstract readonly __kind: RecordKind;
    public deps = new ResourceDependencies();

    public abstract serialize(ds: DataStream): void;
}