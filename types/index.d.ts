declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.wgsl' {
    const source: string;
    export default source;
}

type UniversalResourceId = number;
type Authentic<T> = T["__authentic"];