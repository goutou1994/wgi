import RcdBase, { RecordKind } from "../../../../record/rcd";
import { RcdDetailContent } from "./RcdDetail";
import dCreateBufferView from "./dCreateBuffer";
import dDebugRes from "./dDebugRes";

export const RcdDetailMap: {[kind in RecordKind]?: (tracked: RcdBase<any, any, any>) => RcdDetailContent } = {
    [RecordKind.DebugRes]:  dDebugRes,
    [RecordKind.CreateBuffer]:  dCreateBufferView,
};