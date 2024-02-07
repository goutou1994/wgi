import RcdCreateBuffer from "../../record/create/rcdCreateBuffer";
import RcdBase, { RecordKind } from "../../record/rcd";
import RcdDebugRes from "../../record/rcdDebugRes";

export const rcdCtorMap: { [kind: number]: typeof RcdBase<any, any, any> } = {
    [RecordKind["DebugRes"]]: RcdDebugRes,
    [RecordKind["CreateBuffer"]]: RcdCreateBuffer
}