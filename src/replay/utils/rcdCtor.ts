import RcdCopyBufferToBuffer from "../../record/device/rcdCopyBufferToBuffer";
import RcdCreateBuffer from "../../record/device/rcdCreateBuffer";
import RcdCreateCommandEncoder from "../../record/device/rcdCreateCommandEncoder";
import RcdCreateRenderPipeline from "../../record/device/rcdCreateRenderPipeline";
import RcdCreateShaderModule from "../../record/device/rcdCreateShaderModule";
import RcdCreateTexture from "../../record/device/rcdCreateTexture";
import RcdFinish from "../../record/device/rcdFinish";
import RcdSubmit from "../../record/device/rcdSubmit";
import RcdBase, { RecordKind } from "../../record/rcd";
import RcdDebugRes from "../../record/rcdDebugRes";

export const rcdCtorMap: { [kind in RecordKind]: typeof RcdBase<any, any, any> } = {
    [RecordKind.DebugRes]: RcdDebugRes,
    [RecordKind.CreateBuffer]: RcdCreateBuffer,
    [RecordKind.CreateCommandEncoder]: RcdCreateCommandEncoder,
    [RecordKind.CreateTexture]: RcdCreateTexture,
    [RecordKind.CreateShaderModule]: RcdCreateShaderModule,
    [RecordKind.CreateRenderPipeline]: RcdCreateRenderPipeline,

    // Commands
    [RecordKind.CopyBufferToBuffer]: RcdCopyBufferToBuffer,
    [RecordKind.Finish]: RcdFinish,

    // Submit
    [RecordKind.Submit]: RcdSubmit
}