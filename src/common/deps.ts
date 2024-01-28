import wgi_GPUBase from "../recorder/driver/base";

export default class ResourceDependencies {
    constructor() {}
    // private depsMap: Map<string, Array<wgi_GPUBase>> = new Map();
    private deps: Array<wgi_GPUBase> = [];
    public add(dep: wgi_GPUBase) {
        // let arr: Array<wgi_GPUBase>;
        // if (!this.depsMap.has(dep.__brand)) {
        //     arr = [];
        //     this.depsMap.set(dep.__brand, arr);
        // } else {
        //     arr = this.depsMap.get(dep.__brand)!;
        // }
        // arr.push(dep);
        this.deps.push(dep);
    }
    public recursivelySumDependencies(sum: Set<wgi_GPUBase>) {
        for (const dep of this.deps) {
            if (!sum.has(dep)) {
                sum.add(dep);
                dep.deps.recursivelySumDependencies(sum);
            }
        }
    }
};
