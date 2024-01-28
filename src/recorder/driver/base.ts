import ResourceDependencies from "../../common/deps";
import { DataStream } from "../../common/utils";

let global_id_counter = 0;

export enum brandMap {
    GPU = 0,
    GPUAdapter = 1,
    GPUDevice = 2,
    GPUBuffer = 3
};

export default abstract class wgi_GPUBase {
    constructor() { this.__id = global_id_counter++; }

    abstract readonly __brand: keyof typeof brandMap;
    public __id: number;
    public deps = new ResourceDependencies();

    public abstract serialize(ds: DataStream): void;
}