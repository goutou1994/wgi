import RcdBase, { RecordKind } from "../../../../record/rcd";
import { RcdDetailContent } from "./RcdDetail";
import dBeginRenderPass from "./dBeginRenderPass";
import dCopyBufferToBuffer from "./dCopyBufferToBuffer";
import dCreateBufferView from "./dCreateBuffer";
import dCreateCommandEncoder from "./dCreateCommandEncoder";
import dCreateRenderPipeline from "./dCreateRenderPipeline";
import dCreateShaderModule from "./dCreateShaderModule";
import dCreateTexture from "./dCreateTexture";
import dCreateView from "./dCreateView";
import dDebugRes from "./dDebugRes";
import dFinish from "./dFinish";
import dSubmit from "./dSubmit";

export const RcdDetailMap: {[kind in RecordKind]?: (rcd: RcdBase<any, any, any>) => RcdDetailContent } = {
    [RecordKind.DebugRes]: dDebugRes,

    // device
    [RecordKind.CreateBuffer]: dCreateBufferView,
    [RecordKind.CreateCommandEncoder]: dCreateCommandEncoder,
    [RecordKind.CreateTexture]: dCreateTexture,
    [RecordKind.CreateShaderModule]: dCreateShaderModule,
    [RecordKind.CreateRenderPipeline]: dCreateRenderPipeline,
    
    // encoder
    [RecordKind.CopyBufferToBuffer]: dCopyBufferToBuffer,
    [RecordKind.Finish]: dFinish,
    [RecordKind.BeginRenderPass]: dBeginRenderPass,
    
    // queue
    [RecordKind.Submit]: dSubmit,
    
    // texture
    [RecordKind.CreateView]: dCreateView,

};