import RcdBase, { RecordKind } from "../../../../record/rcd";
import { RcdDetailContent } from "./RcdDetail";
import dBeginRenderPass from "./dBeginRenderPass";
import dCopyBufferToBuffer from "./dCopyBufferToBuffer";
import dCreateBindGroup from "./dCreateBindGroup";
import dCreateBindGroupLayout from "./dCreateBindGroupLayout";
import dCreateBufferView from "./dCreateBuffer";
import dCreateCommandEncoder from "./dCreateCommandEncoder";
import dCreateRenderPipeline from "./dCreateRenderPipeline";
import dCreateSampler from "./dCreateSampler";
import dCreateShaderModule from "./dCreateShaderModule";
import dCreateTexture from "./dCreateTexture";
import dCreateView from "./dCreateView";
import dDebugRes from "./dDebugRes";
import dDraw from "./dDraw";
import dDrawIndexed from "./dDrawIndexed";
import dEnd from "./dEnd";
import dFinish from "./dFinish";
import dSetIndexBuffer from "./dSetIndexBuffer";
import dSetPipeline from "./dSetPipeline";
import dSetVertexBuffer from "./dSetVertexBuffer";
import dSubmit from "./dSubmit";

export const RcdDetailMap: {[kind in RecordKind]?: (rcd: RcdBase<any, any, any>) => RcdDetailContent } = {
    [RecordKind.DebugRes]: dDebugRes,

    // device
    [RecordKind.CreateBuffer]: dCreateBufferView,
    [RecordKind.CreateCommandEncoder]: dCreateCommandEncoder,
    [RecordKind.CreateTexture]: dCreateTexture,
    [RecordKind.CreateShaderModule]: dCreateShaderModule,
    [RecordKind.CreateRenderPipeline]: dCreateRenderPipeline,
    [RecordKind.CreateBindGroupLayout]: dCreateBindGroupLayout,
    [RecordKind.CreateBindGroup]: dCreateBindGroup,
    [RecordKind.CreateSampler]: dCreateSampler,
    
    // encoder
    [RecordKind.CopyBufferToBuffer]: dCopyBufferToBuffer,
    [RecordKind.Finish]: dFinish,
    [RecordKind.BeginRenderPass]: dBeginRenderPass,
    
    // queue
    [RecordKind.Submit]: dSubmit,
    
    // texture
    [RecordKind.CreateView]: dCreateView,
    
    // pass
    [RecordKind.End]: dEnd,
    [RecordKind.SetPipeline]: dSetPipeline,
    [RecordKind.SetVertexBuffer]: dSetVertexBuffer,
    [RecordKind.Draw]: dDraw,
    [RecordKind.SetIndexBuffer]: dSetIndexBuffer,
    [RecordKind.DrawIndexed]: dDrawIndexed,

};