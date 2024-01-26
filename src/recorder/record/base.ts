import ResourceDependencies from "../../common/deps";

export enum RecordType {
    Create,
    Command,
    Destroy
}

export enum RecordKind {
    CreateBuffer = 1,
}

export class SingleRecord {
    declare readonly __type: RecordType;
    declare readonly __kind: RecordKind;
    public deps = new ResourceDependencies();
}