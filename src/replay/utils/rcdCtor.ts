import RcdCreateBuffer from "../../record/create/rcdCreateBuffer";
import RcdBase, { RecordKind } from "../../record/rcd";

export const rcdCtorMap: { [kind: number]: typeof RcdBase<any, any, any> } = {
    [RecordKind["CreateBuffer"]]: RcdCreateBuffer
}