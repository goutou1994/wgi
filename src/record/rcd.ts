import ResourceDependencies from "../common/deps";
import { DataStream } from "../common/utils";
import type ReplayProfile from "../replay/profile";

export enum RecordType {
    Create,
    Command,
    Destroy
}

export enum RecordKind {
    CreateBuffer = 1,
}

export default abstract class RcdBase<Caller, Args extends Array<any>, Ret = void> {
    abstract readonly __type: RecordType;
    abstract readonly __kind: RecordKind;

    protected args: Args;
    protected caller?: Caller;
    public ret?: Ret;

    constructor(args: Args, caller?: Caller, ret?: Ret) {
        this.args = args;
        this.caller = caller;
        this.ret = ret;
    }

    public abstract play(): Ret;
    public abstract directPlay(args: Args, caller?: Authentic<Caller>): Authentic<Ret>;

    public abstract serialize(ds: DataStream): void;

    public abstract deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<Caller, Args, Ret>;


}