import RcdBase, { RecordKind } from "../../../../record/rcd";
import { RcdDetailContent } from "./RcdDetail";
import dCopyBufferToBuffer from "./dCopyBufferToBuffer";
import dCreateBufferView from "./dCreateBuffer";
import dCreateCommandEncoder from "./dCreateCommandEncoder";
import dDebugRes from "./dDebugRes";
import dFinish from "./dFinish";
import dSubmit from "./dSubmit";

export const RcdDetailMap: {[kind in RecordKind]?: (tracked: RcdBase<any, any, any>) => RcdDetailContent } = {
    [RecordKind.DebugRes]: dDebugRes,
    [RecordKind.CreateBuffer]: dCreateBufferView,
    [RecordKind.CreateCommandEncoder]: dCreateCommandEncoder,
    
    // Commands
    [RecordKind.CopyBufferToBuffer]: dCopyBufferToBuffer,
    [RecordKind.Finish]: dFinish,
    
    // Submit
    [RecordKind.Submit]: dSubmit,
};