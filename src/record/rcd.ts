import ResourceDependencies from "../common/deps";
import { DataStream } from "../common/utils";
import type wgi_GPUBase from "../recorder/driver/gpubase";
import type ReplayProfile from "../replay/profile";
import type TrackedBase from "../tracked/tracked";

export enum RecordType {
    Create,
    Command,
    Destroy
}

export enum RecordKind {
    DebugRes = 1,
    CreateBuffer = 2,
    CreateCommandEncoder = 3,

    // Commands
    CopyBufferToBuffer = 101,
    Finish = 102,

    // Submit
    Submit = 201,
}

export default abstract class RcdBase<Caller, Args extends Array<any>, Ret = void> {
    abstract readonly __type: RecordType;
    abstract readonly __kind: RecordKind;

    public args: Args;
    public caller?: Caller;
    public ret?: Ret;

    constructor(args: Args, caller?: Caller, ret?: Ret) {
        this.args = args;
        this.caller = caller;
        this.ret = ret;
    }

    /**
     * Used by replay.
     */
    public abstract play(): Ret;

    /**
     * Used by capturer.
     */
    public abstract serialize(ds: DataStream): void;

    /**
     * Used by replay.
     */
    public abstract deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<Caller, Args, Ret>;

    /**
     * Used by capturer.
     * If there's no other resources in your arguments, ignore this method.
     * @static
     */
    public transformArgs(args: any, transformer: (obj: any) => TrackedBase<any>): Args { return args; }
}