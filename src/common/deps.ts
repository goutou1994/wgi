import wgi_Resource from "../recorder/driver/res";

export default class ResourceDependencies {
    constructor() {}
    // private depsMap: Map<string, Array<wgi_Resource>> = new Map();
    private deps: Array<wgi_Resource> = [];
    public add(dep: wgi_Resource) {
        // let arr: Array<wgi_Resource>;
        // if (!this.depsMap.has(dep.__brand)) {
        //     arr = [];
        //     this.depsMap.set(dep.__brand, arr);
        // } else {
        //     arr = this.depsMap.get(dep.__brand)!;
        // }
        // arr.push(dep);
        this.deps.push(dep);
    }
    public recursivelySumDependencies(sum: Set<wgi_Resource>) {
        for (const dep of this.deps) {
            if (!sum.has(dep)) {
                sum.add(dep);
                dep.deps.recursivelySumDependencies(sum);
            }
        }
    }
};
