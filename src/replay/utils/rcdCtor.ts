import RcdCopyBufferToBuffer from "../../record/encoder/rcdCopyBufferToBuffer";
import RcdCreateBuffer from "../../record/device/rcdCreateBuffer";
import RcdCreateCommandEncoder from "../../record/device/rcdCreateCommandEncoder";
import RcdCreateRenderPipeline from "../../record/device/rcdCreateRenderPipeline";
import RcdCreateShaderModule from "../../record/device/rcdCreateShaderModule";
import RcdCreateTexture from "../../record/device/rcdCreateTexture";
import RcdFinish from "../../record/encoder/rcdFinish";
import RcdSubmit from "../../record/queue/rcdSubmit";
import RcdBase, { RecordKind } from "../../record/rcd";
import RcdDebugRes from "../../record/rcdDebugRes";
import RcdCreateView from "../../record/texture/rcdCreateView";
import RcdBeginRenderPass from "../../record/encoder/rcdBeginRenderPass";
import RcdEnd from "../../record/pass/RcdEnd";
import RcdSetPipeline from "../../record/pass/RcdSetPipeline";
import RcdSetVertexBuffer from "../../record/pass/RcdSetVertexBuffer";
import RcdDraw from "../../record/pass/RcdDraw";
import RcdWriteBuffer from "../../record/queue/writeBuffer";
import RcdDrawIndexed from "../../record/pass/RcdDrawIndexed";
import RcdSetIndexBuffer from "../../record/pass/RcdSetIndexBuffer";
import RcdCreateBindGroupLayout from "../../record/device/rcdCreateBindGroupLayout";
import RcdCreateBindGroup from "../../record/device/rcdCreateBindGroup";
import RcdGetBindGroupLayout from "../../record/pipeline/RcdGetBindGroupLayout";

export const rcdCtorMap: { [kind in RecordKind]: typeof RcdBase<any, any, any> } = {
    [RecordKind.DebugRes]: RcdDebugRes,

    // device
    [RecordKind.CreateBuffer]: RcdCreateBuffer,
    [RecordKind.CreateCommandEncoder]: RcdCreateCommandEncoder,
    [RecordKind.CreateTexture]: RcdCreateTexture,
    [RecordKind.CreateShaderModule]: RcdCreateShaderModule,
    [RecordKind.CreateRenderPipeline]: RcdCreateRenderPipeline,
    [RecordKind.CreateBindGroupLayout]: RcdCreateBindGroupLayout,
    [RecordKind.CreateBindGroup]: RcdCreateBindGroup,

    // encoder
    [RecordKind.CopyBufferToBuffer]: RcdCopyBufferToBuffer,
    [RecordKind.Finish]: RcdFinish,
    [RecordKind.BeginRenderPass]: RcdBeginRenderPass,

    // queue
    [RecordKind.Submit]: RcdSubmit,
    [RecordKind.WriteBuffer]: RcdWriteBuffer,
    
    // texture
    [RecordKind.CreateView]: RcdCreateView,
    
    // pass
    [RecordKind.End]: RcdEnd,
    [RecordKind.SetPipeline]: RcdSetPipeline,
    [RecordKind.SetVertexBuffer]: RcdSetVertexBuffer,
    [RecordKind.Draw]: RcdDraw,
    [RecordKind.DrawIndexed]: RcdDrawIndexed,
    [RecordKind.SetIndexBuffer]: RcdSetIndexBuffer,
    
    // pipeline
    [RecordKind.GetBindGroupLayout]: RcdGetBindGroupLayout,


}