/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var token=/d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;var timezone=/\b(?:[A-Z]{1,3}[A-Z][TC])(?:[-+]\d{4})?|((?:Australian )?(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time)\b/g;var timezoneClip=/[^-+\dA-Z]/g;function dateFormat(date,mask,utc,gmt){if(arguments.length===1&&typeof date==="string"&&!/\d/.test(date)){mask=date;date=undefined;}date=date||date===0?date:new Date;if(!(date instanceof Date)){date=new Date(date);}if(isNaN(date)){throw TypeError("Invalid date")}mask=String(masks[mask]||mask||masks["default"]);var maskSlice=mask.slice(0,4);if(maskSlice==="UTC:"||maskSlice==="GMT:"){mask=mask.slice(4);utc=true;if(maskSlice==="GMT:"){gmt=true;}}var _=function _(){return utc?"getUTC":"get"};var _d=function d(){return date[_()+"Date"]()};var D=function D(){return date[_()+"Day"]()};var _m=function m(){return date[_()+"Month"]()};var y=function y(){return date[_()+"FullYear"]()};var _H=function H(){return date[_()+"Hours"]()};var _M=function M(){return date[_()+"Minutes"]()};var _s=function s(){return date[_()+"Seconds"]()};var _L=function L(){return date[_()+"Milliseconds"]()};var _o=function o(){return utc?0:date.getTimezoneOffset()};var _W=function W(){return getWeek(date)};var _N=function N(){return getDayOfWeek(date)};var flags={d:function d(){return _d()},dd:function dd(){return pad(_d())},ddd:function ddd(){return i18n.dayNames[D()]},DDD:function DDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:i18n.dayNames[D()],short:true})},dddd:function dddd(){return i18n.dayNames[D()+7]},DDDD:function DDDD(){return getDayName({y:y(),m:_m(),d:_d(),_:_(),dayName:i18n.dayNames[D()+7]})},m:function m(){return _m()+1},mm:function mm(){return pad(_m()+1)},mmm:function mmm(){return i18n.monthNames[_m()]},mmmm:function mmmm(){return i18n.monthNames[_m()+12]},yy:function yy(){return String(y()).slice(2)},yyyy:function yyyy(){return pad(y(),4)},h:function h(){return _H()%12||12},hh:function hh(){return pad(_H()%12||12)},H:function H(){return _H()},HH:function HH(){return pad(_H())},M:function M(){return _M()},MM:function MM(){return pad(_M())},s:function s(){return _s()},ss:function ss(){return pad(_s())},l:function l(){return pad(_L(),3)},L:function L(){return pad(Math.floor(_L()/10))},t:function t(){return _H()<12?i18n.timeNames[0]:i18n.timeNames[1]},tt:function tt(){return _H()<12?i18n.timeNames[2]:i18n.timeNames[3]},T:function T(){return _H()<12?i18n.timeNames[4]:i18n.timeNames[5]},TT:function TT(){return _H()<12?i18n.timeNames[6]:i18n.timeNames[7]},Z:function Z(){return gmt?"GMT":utc?"UTC":formatTimezone(date)},o:function o(){return (_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60)*100+Math.abs(_o())%60,4)},p:function p(){return (_o()>0?"-":"+")+pad(Math.floor(Math.abs(_o())/60),2)+":"+pad(Math.floor(Math.abs(_o())%60),2)},S:function S(){return ["th","st","nd","rd"][_d()%10>3?0:(_d()%100-_d()%10!=10)*_d()%10]},W:function W(){return _W()},WW:function WW(){return pad(_W())},N:function N(){return _N()}};return mask.replace(token,function(match){if(match in flags){return flags[match]()}return match.slice(1,match.length-1)})}var masks={default:"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",paddedShortDate:"mm/dd/yyyy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:sso",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'",expiresHeaderFormat:"ddd, dd mmm yyyy HH:MM:ss Z"};var i18n={dayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],monthNames:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec","January","February","March","April","May","June","July","August","September","October","November","December"],timeNames:["a","p","am","pm","A","P","AM","PM"]};var pad=function pad(val){var len=arguments.length>1&&arguments[1]!==undefined?arguments[1]:2;return String(val).padStart(len,"0")};var getDayName=function getDayName(_ref){var y=_ref.y,m=_ref.m,d=_ref.d,_=_ref._,dayName=_ref.dayName,_ref$short=_ref["short"],_short=_ref$short===void 0?false:_ref$short;var today=new Date;var yesterday=new Date;yesterday.setDate(yesterday[_+"Date"]()-1);var tomorrow=new Date;tomorrow.setDate(tomorrow[_+"Date"]()+1);var today_d=function today_d(){return today[_+"Date"]()};var today_m=function today_m(){return today[_+"Month"]()};var today_y=function today_y(){return today[_+"FullYear"]()};var yesterday_d=function yesterday_d(){return yesterday[_+"Date"]()};var yesterday_m=function yesterday_m(){return yesterday[_+"Month"]()};var yesterday_y=function yesterday_y(){return yesterday[_+"FullYear"]()};var tomorrow_d=function tomorrow_d(){return tomorrow[_+"Date"]()};var tomorrow_m=function tomorrow_m(){return tomorrow[_+"Month"]()};var tomorrow_y=function tomorrow_y(){return tomorrow[_+"FullYear"]()};if(today_y()===y&&today_m()===m&&today_d()===d){return _short?"Tdy":"Today"}else if(yesterday_y()===y&&yesterday_m()===m&&yesterday_d()===d){return _short?"Ysd":"Yesterday"}else if(tomorrow_y()===y&&tomorrow_m()===m&&tomorrow_d()===d){return _short?"Tmw":"Tomorrow"}return dayName};var getWeek=function getWeek(date){var targetThursday=new Date(date.getFullYear(),date.getMonth(),date.getDate());targetThursday.setDate(targetThursday.getDate()-(targetThursday.getDay()+6)%7+3);var firstThursday=new Date(targetThursday.getFullYear(),0,4);firstThursday.setDate(firstThursday.getDate()-(firstThursday.getDay()+6)%7+3);var ds=targetThursday.getTimezoneOffset()-firstThursday.getTimezoneOffset();targetThursday.setHours(targetThursday.getHours()-ds);var weekDiff=(targetThursday-firstThursday)/(864e5*7);return 1+Math.floor(weekDiff)};var getDayOfWeek=function getDayOfWeek(date){var dow=date.getDay();if(dow===0){dow=7;}return dow};var formatTimezone=function formatTimezone(date){return (String(date).match(timezone)||[""]).pop().replace(timezoneClip,"").replace(/GMT\+0000/g,"UTC")};

class DataStream {
    constructor(buffer, byteOffset = 0) {
        this.byteOffset = 0;
        this.bufferInternal = false;
        this.head = 0;
        this.buffer = buffer;
        this.byteOffset = byteOffset;
        this._size = buffer.byteLength;
        this.makeBufferViews();
    }
    makeBufferViews() {
        this.floatView = new Float32Array(this.buffer, this.byteOffset, Math.floor(this._size / DataStream.TypeSize[DataStream.Type.Float]));
        this.uint32View = new Uint32Array(this.buffer, this.byteOffset, Math.floor(this._size / DataStream.TypeSize[DataStream.Type.UInt32]));
        this.uint16View = new Uint16Array(this.buffer, this.byteOffset, Math.floor(this._size / DataStream.TypeSize[DataStream.Type.UInt16]));
    }
    static createWithInternalBuffer() {
        const stream = new DataStream(new ArrayBuffer(128 * 1024), // 128KB
        0);
        stream.bufferInternal = true;
        return stream;
    }
    get size() { return this._size; }
    testSufficient(size, alignment) {
        const misalign = (alignment - this.head % alignment) % alignment;
        if (this.head + misalign + size > this._size) {
            if (this.bufferInternal) {
                // enlarge internal buffer
                const newBuffer = new ArrayBuffer(this._size * 2);
                new Uint8Array(newBuffer).set(new Uint8Array(this.buffer));
                this.buffer = newBuffer;
                this._size = this.buffer.byteLength;
                this.makeBufferViews();
            }
            else {
                return -1;
            }
        }
        return misalign;
    }
    testSufficientByType(type) {
        return this.testSufficient(DataStream.TypeSize[type], DataStream.TypeAlignment[type]);
    }
    read(type) {
        const misalign = this.testSufficientByType(type);
        if (misalign < 0)
            throw "[DataStream]read buffer out of bound.";
        this.head += misalign;
        // @ts-ignore
        const view = this[`${DataStream.Type[type].toLowerCase()}View`];
        const align_offset = this.head / DataStream.TypeAlignment[type];
        const ret = view[align_offset];
        this.head += DataStream.TypeSize[type];
        return ret;
    }
    write(type, value) {
        const misalign = this.testSufficientByType(type);
        if (misalign < 0)
            throw "[DataStream]write buffer out of bound.";
        this.head += misalign;
        // @ts-ignore
        const view = this[`${DataStream.Type[type].toLowerCase()}View`];
        const align_offset = this.head / DataStream.TypeAlignment[type];
        view[align_offset] = value;
        this.head += DataStream.TypeSize[type];
    }
    /**
     * 跳过一个位置，以后再填写。
     */
    reserve(type) {
        const misalign = this.testSufficientByType(type);
        if (misalign < 0)
            throw "[DataStream]write buffer out of bound.";
        this.head += misalign;
        // @ts-ignore
        const view = this[`${DataStream.Type[type].toLowerCase()}View`];
        const align_offset = this.head / DataStream.TypeAlignment[type];
        this.head += DataStream.TypeSize[type];
        return {
            write(value) {
                view[align_offset] = value;
            }
        };
    }
    readChunk(length) {
        if (this.head + length > this._size)
            throw "[DataStream]read chunk out of bound.";
        const ret = this.buffer.slice(this.head, this.head + length);
        this.head += length;
        return ret;
    }
    writeChunk(chunk) {
        this.testSufficient(chunk.byteLength, 1);
        new Uint8Array(this.buffer, this.head).set(new Uint8Array(chunk));
        this.head += chunk.byteLength;
    }
    align(alignment) {
        const misalign = this.testSufficient(0, alignment);
        if (misalign < 0)
            throw "[DataStream]align buffer out of bound.";
        this.head += misalign;
    }
    end() {
        return this.head === this._size;
    }
    pos() {
        return this.head;
    }
    getClippedBuffer() {
        return this.buffer.slice(0, this.head);
    }
}
(function (DataStream) {
    let Type;
    (function (Type) {
        Type[Type["Float"] = 0] = "Float";
        Type[Type["UInt32"] = 1] = "UInt32";
        Type[Type["UInt16"] = 2] = "UInt16";
    })(Type = DataStream.Type || (DataStream.Type = {}));
    DataStream.TypeAlignment = {
        [Type.Float]: 4,
        [Type.UInt32]: 4,
        [Type.UInt16]: 2,
    };
    DataStream.TypeSize = {
        [Type.Float]: 4,
        [Type.UInt32]: 4,
        [Type.UInt16]: 2,
    };
})(DataStream || (DataStream = {}));
function downloadBinaryFile(buffer) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    // @ts-ignore
    a.style = "display: none";
    const blob = new Blob([buffer], { type: "octet/binary" });
    const url = window.URL.createObjectURL(blob);
    a.href = url;
    const now = new Date();
    a.download = `wgi_${dateFormat(now, "yyyy_mm_dd_HH_MM_ss")}`;
    a.click();
    window.URL.revokeObjectURL(url);
}

const encoder = new TextEncoder();
function serializeString(ds, str) {
    if (str) {
        const strBuffer = encoder.encode(str);
        ds.write(DataStream.Type.UInt32, strBuffer.byteLength);
        ds.writeChunk(strBuffer);
    }
    else {
        ds.write(DataStream.Type.UInt32, 0);
    }
}
const decoder = new TextDecoder();
function deserializeString(ds) {
    const length = ds.read(DataStream.Type.UInt32);
    if (length == 0) {
        return "";
    }
    else {
        const chunk = ds.readChunk(length);
        return decoder.decode(chunk);
    }
}

class ResourceDependencies {
    constructor() {
        // private depsMap: Map<string, Array<wgi_GPUBase>> = new Map();
        this.deps = [];
    }
    add(dep) {
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
    recursivelySumDependencies(sum) {
        for (const dep of this.deps) {
            if (!sum.has(dep)) {
                sum.add(dep);
                dep.deps.recursivelySumDependencies(sum);
            }
        }
    }
}

let global_id_counter = 1; // 0 is invalid
var brandMap;
(function (brandMap) {
    brandMap[brandMap["GPU"] = 0] = "GPU";
    brandMap[brandMap["GPUAdapter"] = 1] = "GPUAdapter";
    brandMap[brandMap["GPUDevice"] = 2] = "GPUDevice";
    brandMap[brandMap["GPUBuffer"] = 3] = "GPUBuffer";
})(brandMap || (brandMap = {}));
const wgiResMap = new Map();
class wgi_GPUBase {
    constructor() {
        this.__wgi = true; // mark as wgi driver
        this.deps = new ResourceDependencies();
        this.__id = global_id_counter++;
        wgiResMap.set(this.__id, new WeakRef(this));
    }
    static is_wgi(obj) {
        return !!(obj === null || obj === void 0 ? void 0 : obj.__wgi);
    }
}

// export class DepsHolder<T> {
//     constructor(id: number) { this.id = id; }
//     public readonly id: number = -1;
//     private obj?: T;
//     public setObj(obj: T) { this.obj = obj; }
//     public getObj() { return this.obj; }
// }
/**
 * This class is meant to be used both by capturer and replay.
 * But not all methods are available on both sides, be careful not to misuse.
 */
class TrackedBase {
    markAsTemporary() { this.__temporary = true; }
    constructor() {
        /**
         * Each resource should have an id, which is unique among all kinds of resources.
         */
        this.__id = 0;
        /**
         * Mark as temporary resource, meaning it is created during capturing.
         */
        this.__temporary = false;
        /**
         * Whether it has authentic gpu resource.
         */
        this.__restored = false;
        /**
         * Retrieve content to make a snapshot.
         * Used by capturer and replay.
         */
        this.__snapshot_id = 0;
    }
    fastFromAuthentic(authentic, Ctor) {
        const i = new Ctor();
        i.__id = authentic.__id;
        i.__restored = true;
        return i;
    }
}

class TrackedGPU extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap["GPU"];
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPU);
    }
    serialize(ds) {
        console.assert(!!this.__snapshot);
        const features = this.__snapshot.features;
        ds.write(DataStream.Type.UInt32, features.size);
        features.forEach(feature => {
            serializeString(ds, feature);
        });
    }
    deserialize(id, ds) {
        const size = ds.read(DataStream.Type.UInt32);
        const features = new Set();
        for (let i = 0; i < size; i++) {
            features.add(deserializeString(ds));
        }
        const gpu = new TrackedGPU();
        gpu.__id = id;
        gpu.__snapshot = {
            features
        };
        return gpu;
    }
    restore(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: compare snapshot features with current env, log warning if different
            this.__authentic = navigator.gpu;
        });
    }
    takeSnapshot() {
        var _a;
        const features = new Set();
        (_a = this.__authentic) === null || _a === void 0 ? void 0 : _a.wgslLanguageFeatures.forEach(f => features.add(f));
        this.__snapshot = {
            features
        };
    }
    getSnapshotDepIds() {
        return [];
    }
}

class TrackedGPUAdapter extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap["GPUAdapter"];
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUAdapter);
    }
    serialize(ds) {
        console.assert(!!this.__snapshot);
        ds.write(DataStream.Type.UInt32, this.__snapshot.gpu);
        const features = this.__snapshot.features;
        ds.write(DataStream.Type.UInt32, features.size);
        for (const feature of features) {
            serializeString(ds, feature);
        }
    }
    deserialize(id, ds) {
        const gpu_id = ds.read(DataStream.Type.UInt32);
        const size = ds.read(DataStream.Type.UInt32);
        const features = new Set();
        for (let i = 0; i < size; i++) {
            features.add(deserializeString(ds));
        }
        const adapter = new TrackedGPUAdapter();
        adapter.__id = id;
        adapter.__snapshot = {
            gpu: gpu_id,
            features
        };
        return adapter;
    }
    restore(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            this.gpu = (yield profile.getOrRestore(this.__snapshot.gpu));
            const adapter = yield this.gpu.__authentic.requestAdapter();
            if (adapter === null)
                throw "Restore GPUAdapter failed.";
            // TODO: compare features
            this.__authentic = adapter;
        });
    }
    takeSnapshot() {
        var _a;
        const wgi_gpu = this.__authentic.gpu;
        const features = new Set();
        (_a = this.__authentic) === null || _a === void 0 ? void 0 : _a.features.forEach(f => features.add(f));
        this.__snapshot = {
            gpu: wgi_gpu.__id,
            features
        };
    }
    getSnapshotDepIds() {
        return [this.__snapshot.gpu];
    }
}

var RecordType;
(function (RecordType) {
    RecordType[RecordType["Create"] = 0] = "Create";
    RecordType[RecordType["Command"] = 1] = "Command";
    RecordType[RecordType["Destroy"] = 2] = "Destroy";
})(RecordType || (RecordType = {}));
var RecordKind;
(function (RecordKind) {
    RecordKind[RecordKind["CreateBuffer"] = 1] = "CreateBuffer";
})(RecordKind || (RecordKind = {}));
class RcdBase {
    constructor(args, caller, ret) {
        this.args = args;
        this.caller = caller;
        this.ret = ret;
    }
}

class TrackedGPUBuffer extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap["GPUBuffer"];
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUBuffer);
    }
    serialize(ds) {
        console.assert(!!this.__snapshot);
        ds.write(DataStream.Type.UInt32, this.__snapshot.device);
        serializeString(ds, this.__snapshot.label);
        ds.write(DataStream.Type.UInt32, this.__snapshot.size);
        ds.write(DataStream.Type.UInt32, this.__snapshot.usage);
    }
    deserialize(id, ds) {
        const device_id = ds.read(DataStream.Type.UInt32);
        const label = deserializeString(ds);
        const size = ds.read(DataStream.Type.UInt32);
        const usage = ds.read(DataStream.Type.UInt32);
        const content = new ArrayBuffer(4);
        const snapshot = {
            device: device_id,
            label,
            size,
            usage,
            content
        };
        const tracked = new TrackedGPUBuffer();
        tracked.__id = id;
        tracked.__snapshot = snapshot;
        return tracked;
    }
    restore(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            this.device = yield profile.getOrRestore(this.__snapshot.device);
            this.__authentic = this.device.__authentic.createBuffer({
                size: this.__snapshot.size,
                usage: this.__snapshot.usage
            });
            this.__authentic.label = this.__snapshot.label;
        });
    }
    takeSnapshot() {
        const wgi_device = this.__authentic.device;
        this.__snapshot = {
            device: wgi_device.__id,
            label: this.__authentic.label,
            size: this.__authentic.size,
            usage: this.__authentic.usage,
            content: new ArrayBuffer(4) // FIXME: retrieve real content
        };
    }
    getSnapshotDepIds() {
        throw new Error("Method not implemented.");
    }
}

class RcdCreateBuffer extends RcdBase {
    constructor(args, caller, ret) {
        super(args, caller, ret);
        this.__type = RecordType.Create;
        this.__kind = RecordKind.CreateBuffer;
    }
    play() {
        const buffer = this.caller.__authentic.createBuffer({
            size: this.args[0].size,
            usage: this.args[0].usage
        });
        if (this.ret) {
            this.ret.__authentic = buffer;
        }
        else {
            this.ret = TrackedGPUBuffer.prototype.fromAuthentic(buffer);
        }
        return this.ret;
    }
    directPlay(args, caller) {
        return caller.__authentic.createBuffer(args[0]);
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].size);
        ds.write(DataStream.Type.UInt32, this.args[0].usage);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const device_id = ds.read(DataStream.Type.UInt32);
        const size = ds.read(DataStream.Type.UInt32);
        const usage = ds.read(DataStream.Type.UInt32);
        const ret_id = ds.read(DataStream.Type.UInt32);
        const tracked = new TrackedGPUBuffer();
        tracked.__id = ret_id;
        return new RcdCreateBuffer([{ size, usage }], profile.get(device_id), profile.get(ret_id));
    }
}

class TrackedGPUDevice extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap["GPUDevice"];
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUDevice);
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.__snapshot.adapter);
    }
    deserialize(id, ds) {
        const adapter_id = ds.read(DataStream.Type.UInt32);
        const device = new TrackedGPUDevice();
        device.__id = id;
        device.__snapshot = {
            adapter: adapter_id
        };
        return device;
    }
    restore(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            this.adapter = (yield profile.getOrRestore(this.__snapshot.adapter));
            const device = yield this.adapter.__authentic.requestDevice();
            if (!device)
                throw "Restore GPUDevice failed.";
            this.__authentic = device;
        });
    }
    takeSnapshot() {
        const wgi_adapter = this.__authentic.adapter;
        this.__snapshot = {
            adapter: wgi_adapter.__id
        };
    }
    getSnapshotDepIds() {
        return [this.__snapshot.adapter];
    }
}

var RecorderState;
(function (RecorderState) {
    RecorderState[RecorderState["Background"] = 0] = "Background";
    RecorderState[RecorderState["Preparing"] = 1] = "Preparing";
    RecorderState[RecorderState["Snapshot"] = 2] = "Snapshot";
    RecorderState[RecorderState["Capturing"] = 3] = "Capturing";
    RecorderState[RecorderState["Saving"] = 4] = "Saving";
    RecorderState[RecorderState["Expired"] = 5] = "Expired";
})(RecorderState || (RecorderState = {}));
class Recorder {
    constructor() {
        this.trackedMap = new Map();
        this.records = [];
        this.state = RecorderState.Background;
    }
    capture() {
        this.state = RecorderState.Preparing;
    }
    snapshot() {
        return __awaiter(this, void 0, void 0, function* () {
            // take snapshot of resources
            this.state = RecorderState.Capturing;
        });
    }
    save() {
        const ds = DataStream.createWithInternalBuffer();
        const u16 = DataStream.Type.UInt16;
        const u32 = DataStream.Type.UInt32;
        DataStream.Type.Float;
        ds.write(u32, 0x696777); // magic number
        ds.write(u16, 0); // major version
        ds.write(u16, 1); // minor version
        const totalLength = ds.reserve(u32);
        ds.write(u32, this.records.length); // records count
        for (let i = 0; i < this.records.length; i++) {
            const rcd = this.records[i];
            ds.write(u32, 0x646372); // rcd signature
            ds.write(u32, i); // record index
            ds.write(u32, rcd.__kind);
            this.records[i].serialize(ds);
        }
        ds.write(u32, this.trackedMap.size); // res count
        for (const [, tracked] of this.trackedMap) {
            ds.write(u32, 0x736572); // res signature
            ds.write(u32, tracked.__id); // res id
            ds.write(u32, tracked.__kind); // res brand
            tracked.serialize(ds);
        }
        totalLength.write(ds.pos());
        downloadBinaryFile(ds.getClippedBuffer());
        this.state = RecorderState.Expired;
    }
    frameStart(time) {
        if (this.state == RecorderState.Preparing) {
            this.state = RecorderState.Snapshot;
            return [true, this.snapshot()];
        }
        else {
            return [false, undefined];
        }
    }
    frameEnd() {
        if (this.state == RecorderState.Capturing) {
            this.state = RecorderState.Saving;
            this.save();
        }
    }
    get capturing() {
        return this.state === RecorderState.Capturing;
    }
    recursivelyGetTrackedAndTakeSnapshot(obj) {
        var _a;
        if (wgi_GPUBase.is_wgi(obj)) {
            let tracked = this.trackedMap.get(obj.__id);
            if (tracked)
                return tracked;
            const trackedCtor = obj.getTrackedType();
            tracked = trackedCtor.prototype.fromAuthentic(obj);
            this.trackedMap.set(obj.__id, tracked);
            tracked.takeSnapshot(1);
            const deps = tracked.getSnapshotDepIds();
            for (const depId of deps) {
                let depTracked = this.trackedMap.get(depId);
                if (!depTracked) {
                    const dep = (_a = wgiResMap.get(depId)) === null || _a === void 0 ? void 0 : _a.deref();
                    if (dep) {
                        this.recursivelyGetTrackedAndTakeSnapshot(dep);
                    }
                }
            }
            return tracked;
        }
        else {
            return obj;
        }
    }
    processRcd(RcdType, caller, args) {
        if (this.state === RecorderState.Capturing) {
            caller = this.recursivelyGetTrackedAndTakeSnapshot(caller);
            const rcd = new RcdType(args, caller);
            this.records.push(rcd);
            const ret = rcd.play();
            if (ret) {
                ret.markAsTemporary();
                this.trackedMap.set(ret.__id, ret);
            }
        }
        else {
            return RcdType.prototype.directPlay(args, caller);
        }
    }
}
const globalRecorder = new Recorder();

class wgi_GPUDevice extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUDevice;
    }
    constructor(next, adapter, desc) {
        super();
        this.next = next;
        this.adapter = adapter;
        this.desc = desc;
        this.__brand = "GPUDevice";
        this.deps.add(adapter);
    }
    get features() {
        return this.next.features;
    }
    get limits() {
        return this.next.limits;
    }
    get queue() {
        return this.next.queue;
    }
    destroy() {
        throw new Error("Method not implemented.");
    }
    createBuffer(descriptor) {
        return globalRecorder.processRcd(RcdCreateBuffer, this, [descriptor]);
    }
    createTexture(descriptor) {
        throw new Error("Method not implemented.");
    }
    createSampler(descriptor) {
        throw new Error("Method not implemented.");
    }
    importExternalTexture(descriptor) {
        throw new Error("Method not implemented.");
    }
    createBindGroupLayout(descriptor) {
        throw new Error("Method not implemented.");
    }
    createPipelineLayout(descriptor) {
        throw new Error("Method not implemented.");
    }
    createBindGroup(descriptor) {
        throw new Error("Method not implemented.");
    }
    createShaderModule(descriptor) {
        throw new Error("Method not implemented.");
    }
    createComputePipeline(descriptor) {
        throw new Error("Method not implemented.");
    }
    createRenderPipeline(descriptor) {
        throw new Error("Method not implemented.");
    }
    createComputePipelineAsync(descriptor) {
        throw new Error("Method not implemented.");
    }
    createRenderPipelineAsync(descriptor) {
        throw new Error("Method not implemented.");
    }
    createCommandEncoder(descriptor) {
        throw new Error("Method not implemented.");
    }
    createRenderBundleEncoder(descriptor) {
        throw new Error("Method not implemented.");
    }
    createQuerySet(descriptor) {
        throw new Error("Method not implemented.");
    }
    get lost() { return this.next.lost; }
    ;
    pushErrorScope(filter) {
        throw new Error("Method not implemented.");
    }
    popErrorScope() {
        throw new Error("Method not implemented.");
    }
    get onuncapturederror() {
        return this.next.onuncapturederror;
    }
    addEventListener(type, callback, options) {
        throw new Error("Method not implemented.");
    }
    dispatchEvent(event) {
        throw new Error("Method not implemented.");
    }
    removeEventListener(type, callback, options) {
        throw new Error("Method not implemented.");
    }
    get label() { return this.next.label; }
    ;
    set label(v) { this.next.label = v; }
}

class wgi_GPUAdapter extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUAdapter;
    }
    constructor(next, gpu) {
        super();
        this.next = next;
        this.gpu = gpu;
        this.__brand = "GPUAdapter";
        this.deps.add(gpu);
    }
    get features() {
        return this.next.features;
    }
    get limits() {
        return this.next.limits;
    }
    get isFallbackAdapter() {
        return this.next.isFallbackAdapter;
    }
    requestDevice(descriptor) {
        return this.next.requestDevice(descriptor).then(device => new wgi_GPUDevice(device, this, descriptor));
    }
    requestAdapterInfo() {
        return this.next.requestAdapterInfo();
    }
}

class wgi_GPU extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPU;
    }
    constructor(next) {
        super();
        this.next = next;
        this.__brand = "GPU";
    }
    requestAdapter(options) {
        return this.next.requestAdapter(options).then(adaptor => {
            if (adaptor == null)
                throw "No adapter available!";
            return new wgi_GPUAdapter(adaptor, this);
        });
    }
    getPreferredCanvasFormat() {
        return this.next.getPreferredCanvasFormat();
    }
    get wgslLanguageFeatures() {
        return this.next.wgslLanguageFeatures;
    }
}

function inject() {
    console.log("hello wgi!");
    Object.defineProperty(globalThis.navigator, "gpu", {
        value: new wgi_GPU(globalThis.navigator.gpu)
    });
    const raf = globalThis.requestAnimationFrame;
    globalThis.requestAnimationFrame = (callback) => {
        return raf(time => {
            const [shouldWait, p] = globalRecorder.frameStart(time);
            if (shouldWait) {
                p.then(() => {
                    raf(time => {
                        callback(time);
                        globalRecorder.frameEnd();
                    });
                });
            }
            else {
                callback(time);
                globalRecorder.frameEnd();
            }
        });
    };
    console.log("Injected");
}
function testStartCapture() {
    globalRecorder.capture();
}

export { inject as default, testStartCapture };
