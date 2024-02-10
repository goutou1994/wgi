import RcdCopyBufferToBuffer from "../../record/create/rcdCopyBufferToBuffer";
import RcdCreateBuffer from "../../record/create/rcdCreateBuffer";
import RcdCreateCommandEncoder from "../../record/create/rcdCreateCommandEncoder";
import RcdCreateRenderPipeline from "../../record/create/rcdCreateRenderPipeline";
import RcdCreateShaderModule from "../../record/create/rcdCreateShaderModule";
import RcdCreateTexture from "../../record/create/rcdCreateTexture";
import RcdFinish from "../../record/create/rcdFinish";
import RcdSubmit from "../../record/create/rcdSubmit";
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