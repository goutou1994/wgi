import { DataStream } from "../../common/utils";
import ReplayProfile from "../../replay/profile";
import TrackedGPUCommandEncoder from "../../tracked/GPUCommandEncoder";
import TrackedGPURenderPassEncoder from "../../tracked/GPURenderPassEncoder";
import RcdBase, { RecordKind } from "../rcd";



export default class RcdBeginRenderPass extends RcdBase<TrackedGPUCommandEncoder, [GPURenderPassDescriptor], TrackedGPURenderPassEncoder> {
    __kind = RecordKind.BeginRenderPass;
    public play(): TrackedGPURenderPassEncoder {
        throw new Error("Method not implemented.");
    }
    public serialize(ds: DataStream): void {
        throw new Error("Method not implemented.");
    }
    public deserialize(ds: DataStream, profile: ReplayProfile): RcdBase<TrackedGPUCommandEncoder, [GPURenderPassDescriptor], TrackedGPURenderPassEncoder> {
        throw new Error("Method not implemented.");
    }
    
}
