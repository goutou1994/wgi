import ResourceDependencies from "../../common/deps";

let global_id_counter = 0;

export default class wgi_Resource {
    constructor() { this.__id = global_id_counter++; }

    declare readonly __brand: string;
    public __id: number;
    public deps = new ResourceDependencies();
}