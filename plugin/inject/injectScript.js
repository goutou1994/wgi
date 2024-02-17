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

var brandMap;
(function (brandMap) {
    brandMap[brandMap["GPU"] = 0] = "GPU";
    brandMap[brandMap["GPUAdapter"] = 1] = "GPUAdapter";
    brandMap[brandMap["GPUDevice"] = 2] = "GPUDevice";
    brandMap[brandMap["GPUBuffer"] = 3] = "GPUBuffer";
    brandMap[brandMap["GPUCommandEncoder"] = 4] = "GPUCommandEncoder";
    brandMap[brandMap["GPUCommandBuffer"] = 5] = "GPUCommandBuffer";
    brandMap[brandMap["GPUQueue"] = 6] = "GPUQueue";
    brandMap[brandMap["GPUTexture"] = 7] = "GPUTexture";
    brandMap[brandMap["GPUShaderModule"] = 8] = "GPUShaderModule";
    brandMap[brandMap["GPURenderPipeline"] = 9] = "GPURenderPipeline";
    brandMap[brandMap["GPURenderPassEncoder"] = 10] = "GPURenderPassEncoder";
    brandMap[brandMap["GPUTextureView"] = 11] = "GPUTextureView";
    brandMap[brandMap["GPUBindGroupLayout"] = 12] = "GPUBindGroupLayout";
    brandMap[brandMap["GPUBindGroup"] = 13] = "GPUBindGroup";
    brandMap[brandMap["GPUSampler"] = 14] = "GPUSampler";
    brandMap[brandMap["GPUPipelineLayout"] = 15] = "GPUPipelineLayout";
})(brandMap || (brandMap = {}));

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
                let newSize = this._size;
                while (newSize < this.head + misalign + size) {
                    newSize *= 2;
                }
                const newBuffer = new ArrayBuffer(newSize);
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
        var _a, _b;
        this.testSufficient(chunk.byteLength, 1);
        // @ts-ignore
        const buffer = (_a = chunk.buffer) !== null && _a !== void 0 ? _a : chunk;
        // @ts-ignore
        const byteOffset = (_b = chunk.offset) !== null && _b !== void 0 ? _b : 0;
        new Uint8Array(this.buffer, this.head).set(new Uint8Array(buffer, byteOffset));
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
function serializeObject(ds, obj) {
    const str = obj ? JSON.stringify(obj) : "";
    serializeString(ds, str);
}
function deserializeObject(ds) {
    const str = deserializeString(ds);
    return str.length > 0 ? JSON.parse(str) : undefined;
}
function seralizeOptionalUint32(ds, value) {
    if (value !== undefined && value !== null) {
        ds.write(DataStream.Type.UInt32, 1);
        ds.write(DataStream.Type.UInt32, value);
    }
    else {
        ds.write(DataStream.Type.UInt32, 0);
    }
}
function deseralizeOptionalUint32(ds) {
    const flag = ds.read(DataStream.Type.UInt32);
    if (flag === 0) {
        return undefined;
    }
    else {
        return ds.read(DataStream.Type.UInt32);
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
    }
    takeSnapshotAfterSubmit() { return Promise.resolve(); }
    get label() {
        var _a, _b, _c, _d, _e, _f;
        if (((_b = (_a = this.__authentic) === null || _a === void 0 ? void 0 : _a.label) === null || _b === void 0 ? void 0 : _b.length) > 0)
            return this.__authentic.label;
        if (((_d = (_c = this.__initialSnapshot) === null || _c === void 0 ? void 0 : _c.label) === null || _d === void 0 ? void 0 : _d.length) > 0)
            return this.__initialSnapshot.label;
        if (((_f = (_e = this.__snapshot) === null || _e === void 0 ? void 0 : _e.label) === null || _f === void 0 ? void 0 : _f.length) > 0)
            return this.__snapshot.label;
        return this.__id.toString();
    }
    isReplayMode() {
        return !!this.__creator;
    }
    /**
     * When ReplayProfile need to go back to initial state,
     * all Tracked authentics should be destroyed so they can be created again.
     */
    destroyAuthentic() {
        var _a;
        (_a = this.__authentic) === null || _a === void 0 ? void 0 : _a.destroy();
        this.__authentic = undefined;
    }
    deleteSnapshot() {
        this.__snapshot = undefined;
    }
    fastFromAuthentic(authentic, Ctor) {
        const i = new Ctor();
        i.__id = authentic.__id;
        i.__authentic = authentic;
        i.__restored = true;
        return i;
    }
}

class TrackedGPU extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPU;
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
    deserialize(ds) {
        const size = ds.read(DataStream.Type.UInt32);
        const features = new Set();
        for (let i = 0; i < size; i++) {
            features.add(deserializeString(ds));
        }
        this.__initialSnapshot = {
            features
        };
    }
    restore(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: compare snapshot features with current env, log warning if different
            this.__authentic = navigator.gpu;
        });
    }
    takeSnapshotBeforeSubmit(_) {
        var _a;
        const features = new Set();
        (_a = this.__authentic) === null || _a === void 0 ? void 0 : _a.wgslLanguageFeatures.forEach(f => features.add(f));
        this.__snapshot = {
            features
        };
    }
    destroyAuthentic() {
        // global gpu cannot be destroyed
        this.__authentic = undefined;
    }
    getDeps() {
        return [];
    }
}

class TrackedGPUAdapter extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUAdapter;
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
    deserialize(ds) {
        const gpu_id = ds.read(DataStream.Type.UInt32);
        const size = ds.read(DataStream.Type.UInt32);
        const features = new Set();
        for (let i = 0; i < size; i++) {
            features.add(deserializeString(ds));
        }
        this.__initialSnapshot = {
            gpu: gpu_id,
            features
        };
    }
    restore(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__creator = (yield profile.getOrRestore(this.__initialSnapshot.gpu, null));
            const adapter = yield this.__creator.__authentic.requestAdapter();
            if (adapter === null)
                throw "Restore GPUAdapter failed.";
            // TODO: compare features
            this.__authentic = adapter;
        });
    }
    takeSnapshotBeforeSubmit(_) {
        var _a, _b, _c;
        const gpu_id = (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.gpu.__id;
        const features = new Set();
        (_c = this.__authentic) === null || _c === void 0 ? void 0 : _c.features.forEach(f => features.add(f));
        this.__snapshot = {
            gpu: gpu_id,
            features
        };
    }
    getDeps() {
        return [this.__authentic.gpu];
    }
}

// export enum RecordType {
//     Create,
//     Command,
//     Destroy
// }
var RecordKind;
(function (RecordKind) {
    RecordKind[RecordKind["DebugRes"] = 1] = "DebugRes";
    // device
    RecordKind[RecordKind["CreateBuffer"] = 2] = "CreateBuffer";
    RecordKind[RecordKind["CreateCommandEncoder"] = 3] = "CreateCommandEncoder";
    RecordKind[RecordKind["CreateTexture"] = 4] = "CreateTexture";
    RecordKind[RecordKind["CreateShaderModule"] = 5] = "CreateShaderModule";
    RecordKind[RecordKind["CreateRenderPipeline"] = 6] = "CreateRenderPipeline";
    RecordKind[RecordKind["CreateBindGroupLayout"] = 7] = "CreateBindGroupLayout";
    RecordKind[RecordKind["CreateBindGroup"] = 8] = "CreateBindGroup";
    RecordKind[RecordKind["CreateSampler"] = 9] = "CreateSampler";
    RecordKind[RecordKind["CreatePipelineLayout"] = 10] = "CreatePipelineLayout";
    // encoder
    RecordKind[RecordKind["CopyBufferToBuffer"] = 101] = "CopyBufferToBuffer";
    RecordKind[RecordKind["Finish"] = 102] = "Finish";
    RecordKind[RecordKind["BeginRenderPass"] = 103] = "BeginRenderPass";
    RecordKind[RecordKind["CopyTextureToTexture"] = 104] = "CopyTextureToTexture";
    // queue
    RecordKind[RecordKind["Submit"] = 201] = "Submit";
    RecordKind[RecordKind["WriteBuffer"] = 202] = "WriteBuffer";
    // texture
    RecordKind[RecordKind["CreateView"] = 301] = "CreateView";
    // pass
    RecordKind[RecordKind["End"] = 401] = "End";
    RecordKind[RecordKind["SetPipeline"] = 402] = "SetPipeline";
    RecordKind[RecordKind["SetVertexBuffer"] = 403] = "SetVertexBuffer";
    RecordKind[RecordKind["Draw"] = 404] = "Draw";
    RecordKind[RecordKind["DrawIndexed"] = 405] = "DrawIndexed";
    RecordKind[RecordKind["SetIndexBuffer"] = 406] = "SetIndexBuffer";
    RecordKind[RecordKind["SetBindGroup"] = 407] = "SetBindGroup";
    // pipeline
    RecordKind[RecordKind["GetBindGroupLayout"] = 501] = "GetBindGroupLayout";
})(RecordKind || (RecordKind = {}));
class RcdBase {
    constructor(args, caller, ret) {
        this.args = args;
        this.caller = caller;
        this.ret = ret;
    }
    /**
     * Used by capturer.
     * If there's no other resources in your arguments, ignore this method.
     * @static
     */
    transformArgs(args, transformer) { return args; }
}

class RcdCreateBindGroup extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.CreateBindGroup;
    }
    play() {
        const device = this.caller.__authentic.createBindGroup(this.transformArgs(this.args, tracked => tracked.__authentic)[0]);
        this.ret.__authentic = device;
        this.ret.__creator = this.caller;
        this.ret.__creatorRcd = this;
        return this.ret;
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        serializeObject(ds, this.transformArgs(this.args, tracked => tracked.__id)[0]);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const device = profile.get(ds.read(DataStream.Type.UInt32));
        const desc = this.transformArgs([deserializeObject(ds)], id => profile.get(id));
        const ret = profile.get(ds.read(DataStream.Type.UInt32));
        return new RcdCreateBindGroup(desc, device, ret);
    }
    transformArgs(args, transformer) {
        return [{
                layout: transformer(args[0].layout),
                entries: args[0].entries.map((e) => {
                    const entry = {
                        binding: e.binding,
                        resource: e.resource.buffer ? {
                            buffer: transformer(e.resource.buffer),
                            offset: e.resource.offset,
                            size: e.resource.size
                        } : transformer(e.resource)
                    };
                    if (entry.resource && entry.resource.offset === undefined)
                        delete entry.resource.offset;
                    if (entry.resource && entry.resource.size === undefined)
                        delete entry.resource.size;
                    return entry;
                })
            }];
    }
}

class RcdCreateBindGroupLayout extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.CreateBindGroupLayout;
    }
    play() {
        const device = this.caller.__authentic.createBindGroupLayout(...this.args);
        this.ret.__authentic = device;
        this.ret.__creator = this.caller;
        this.ret.__creatorRcd = this;
        return this.ret;
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        serializeObject(ds, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const device = profile.get(ds.read(DataStream.Type.UInt32));
        const desc = deserializeObject(ds);
        const ret = profile.get(ds.read(DataStream.Type.UInt32));
        return new RcdCreateBindGroupLayout([desc], device, ret);
    }
}

class TrackedGPUBuffer extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUBuffer;
    }
    fromAuthentic(authentic) {
        const tracked = this.fastFromAuthentic(authentic, TrackedGPUBuffer);
        tracked.realUsage = authentic.desc.usage;
        return tracked;
    }
    serialize(ds) {
        console.assert(!!this.__snapshot);
        const s = this.__snapshot;
        serializeString(ds, s.label);
        ds.write(DataStream.Type.UInt32, s.device);
        ds.write(DataStream.Type.UInt32, s.size);
        ds.write(DataStream.Type.UInt32, s.usage);
        ds.writeChunk(s.content);
    }
    deserialize(ds) {
        const label = deserializeString(ds);
        const device_id = ds.read(DataStream.Type.UInt32);
        const size = ds.read(DataStream.Type.UInt32);
        const usage = ds.read(DataStream.Type.UInt32);
        const content = ds.readChunk(size);
        this.__initialSnapshot = {
            label,
            device: device_id,
            size,
            usage,
            content
        };
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = this.__initialSnapshot;
            this.__creator = yield profile.getOrRestore(s.device, encoder);
            // FIXME: the usage of original buffer is tricky,
            // if it contains MAP_WRITE, then it cannot include COPY_DST as well.
            // So the best way to do this is upload the content accordingly.
            // e.g. copyBufferToBuffer for COPY_DST, mapAsync for MAP_WRITE, ...
            const usage = s.usage & (~GPUBufferUsage.MAP_READ) & ((~GPUBufferUsage.MAP_WRITE));
            this.__authentic = this.__creator.__authentic.createBuffer({
                label: s.label,
                size: s.size,
                usage: usage | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC
            });
            this.realUsage = s.usage;
            const stagingBuffer = this.__creator.__authentic.createBuffer({
                size: s.size,
                usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC
            });
            yield stagingBuffer.mapAsync(GPUMapMode.WRITE);
            const ab = stagingBuffer.getMappedRange();
            new Uint8Array(ab).set(new Uint8Array(s.content));
            stagingBuffer.unmap();
            encoder.copyBufferToBuffer(stagingBuffer, 0, this.__authentic, 0, s.size);
        });
    }
    takeSnapshotBeforeSubmit(encoder, profile) {
        let device;
        let buffer;
        if (profile) {
            device = this.__creator.__authentic;
            buffer = this.__authentic;
        }
        else {
            const wgi_device = this.__authentic.device;
            device = wgi_device.next;
            buffer = this.__authentic.next;
        }
        const stagingBuffer = device.createBuffer({
            size: this.__authentic.size,
            usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
        });
        encoder.copyBufferToBuffer(buffer, 0, stagingBuffer, 0, this.__authentic.size);
        this.stagingBuffer = stagingBuffer;
    }
    takeSnapshotAfterSubmit() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            yield this.stagingBuffer.mapAsync(GPUMapMode.READ);
            const ab = this.stagingBuffer.getMappedRange();
            let creator_id = (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.device.__id;
            this.__snapshot = {
                label: this.__authentic.label,
                device: creator_id,
                size: this.__authentic.size,
                usage: (_c = this.realUsage) !== null && _c !== void 0 ? _c : this.__authentic.usage,
                content: ab.slice(0)
            };
            this.stagingBuffer.unmap();
            this.stagingBuffer = undefined;
        });
    }
    getDeps() {
        return [this.__authentic.device];
    }
}

class RcdCreateBuffer extends RcdBase {
    constructor(args, caller, ret) {
        super(args, caller, ret);
        this.__kind = RecordKind.CreateBuffer;
    }
    play() {
        const buffer = this.caller.__authentic.createBuffer(Object.assign(Object.assign({}, this.args[0]), { usage: this.args[0].usage | GPUBufferUsage.COPY_SRC }));
        this.ret.__authentic = buffer;
        this.ret.__creator = this.caller;
        this.ret.realUsage = this.args[0].usage;
        return this.ret;
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        serializeObject(ds, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const device_id = ds.read(DataStream.Type.UInt32);
        const desc = deserializeObject(ds);
        const ret_id = ds.read(DataStream.Type.UInt32);
        const tracked = new TrackedGPUBuffer();
        tracked.__id = ret_id;
        return new RcdCreateBuffer([desc], profile.get(device_id), profile.get(ret_id));
    }
}

class RcdCreateCommandEncoder extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.CreateCommandEncoder;
    }
    play() {
        const encoder = this.caller.__authentic.createCommandEncoder(...this.args);
        this.ret.__authentic = encoder;
        this.ret.__creator = this.caller;
        return this.ret;
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        serializeObject(ds, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const device = profile.get(ds.read(DataStream.Type.UInt32));
        const desc = deserializeObject(ds);
        const ret = profile.get(ds.read(DataStream.Type.UInt32));
        return new RcdCreateCommandEncoder([desc], device, ret);
    }
}

class RcdCreatePipelineLayout extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.CreatePipelineLayout;
    }
    play() {
        const layout = this.caller.__authentic.createPipelineLayout(this.transformArgs(this.args, tracked => tracked.__authentic)[0]);
        this.ret.__authentic = layout;
        this.ret.__creator = this.caller;
        this.ret.__creatorRcd = this;
        return this.ret;
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        serializeObject(this.transformArgs(this.args, tracked => tracked.__id)[0]);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const device = profile.get(ds.read(DataStream.Type.UInt32));
        const desc = deserializeObject(ds);
        const ret = profile.get(ds.read(DataStream.Type.UInt32));
        return new RcdCreatePipelineLayout(this.transformArgs([desc], id => profile.get(id)), device, ret);
    }
    transformArgs(args, transformer) {
        return [{
                label: args[0].label,
                bindGroupLayouts: Array.from(args[0].bindGroupLayouts).map(layout => transformer(layout))
            }];
    }
}

class RcdCreateRenderPipeline extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.CreateRenderPipeline;
    }
    play() {
        this.args[0];
        const pipeline = this.caller.__authentic.createRenderPipeline(this.transformArgs(this.args, tracked => tracked.__authentic)[0]);
        this.ret.__authentic = pipeline;
        this.ret.__creator = this.caller;
        this.ret.__creatorRcd = this;
        return this.ret;
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        serializeObject(ds, this.transformArgs(this.args, tracked => tracked.__id)[0]);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const device = profile.get(ds.read(DataStream.Type.UInt32));
        const rawDesc = deserializeObject(ds);
        const desc = this.transformArgs([rawDesc], id => profile.get(id))[0];
        const ret = profile.get(ds.read(DataStream.Type.UInt32));
        return new RcdCreateRenderPipeline([desc], device, ret);
    }
    transformArgs(args, transformer) {
        const desc = Object.assign(Object.assign({}, args[0]), { layout: args[0].layout === "auto" ? "auto" : transformer(args[0].layout), vertex: Object.assign(Object.assign({}, args[0].vertex), { module: transformer(args[0].vertex.module) }), fragment: args[0].fragment ? Object.assign(Object.assign({}, args[0].fragment), { module: transformer(args[0].fragment.module) }) : undefined });
        if (!desc.fragment) {
            delete desc.fragment;
        }
        return [desc];
    }
}

class RcdCreateSampler extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.CreateSampler;
    }
    play() {
        const sampler = this.caller.__authentic.createSampler(...this.args);
        this.ret.__authentic = sampler;
        this.ret.__creator = this.caller;
        this.ret.__creatorRcd = this;
        return this.ret;
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        serializeObject(ds, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const device = profile.get(ds.read(DataStream.Type.UInt32));
        const desc = deserializeObject(ds);
        const ret = profile.get(ds.read(DataStream.Type.UInt32));
        return new RcdCreateSampler([desc], device, ret);
    }
}

class RcdCreateShaderModule extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.CreateShaderModule;
    }
    play() {
        const sm = this.caller.__authentic.createShaderModule(this.args[0]);
        this.ret.__authentic = sm;
        this.ret.__creator = this.caller;
        this.ret.__creatorRcd = this;
        return this.ret;
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        serializeObject(ds, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const device_id = ds.read(DataStream.Type.UInt32);
        const desc = deserializeObject(ds);
        const ret_id = ds.read(DataStream.Type.UInt32);
        return new RcdCreateShaderModule([desc], profile.get(device_id), profile.get(ret_id));
    }
}

const pixelSizeMap = {
    "rgba8unorm": 4,
    "rgba8snorm": 4,
    "rgba8uint": 4,
    "rgba8sint": 4,
    "bgra8unorm": 4,
    // "depth24plus": 4, // depth24plus cannot be copied
};
class TrackedGPUTexture extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUTexture;
    }
    fromAuthentic(authentic) {
        const tracked = this.fastFromAuthentic(authentic, TrackedGPUTexture);
        tracked.realUsage = authentic.usage;
        return tracked;
    }
    serialize(ds) {
        const s = this.__snapshot;
        serializeString(ds, s.label);
        ds.write(DataStream.Type.UInt32, s.device);
        ds.write(DataStream.Type.UInt32, s.width);
        ds.write(DataStream.Type.UInt32, s.height);
        ds.write(DataStream.Type.UInt32, s.depthOrArrayLayers);
        ds.write(DataStream.Type.UInt32, s.mipLevelCount);
        ds.write(DataStream.Type.UInt32, s.sampleCount);
        serializeString(ds, s.dimension);
        serializeString(ds, s.format);
        ds.write(DataStream.Type.UInt32, s.usage);
        if (s.content) {
            ds.write(DataStream.Type.UInt32, s.content.byteLength);
            ds.writeChunk(s.content);
        }
        else {
            ds.write(DataStream.Type.UInt32, 0);
        }
        ds.write(DataStream.Type.UInt32, s.bytesPerRow);
        ds.write(DataStream.Type.UInt32, s.isCanvas);
    }
    deserialize(ds) {
        const label = deserializeString(ds);
        const device_id = ds.read(DataStream.Type.UInt32);
        const width = ds.read(DataStream.Type.UInt32);
        const height = ds.read(DataStream.Type.UInt32);
        const depthOrArrayLayers = ds.read(DataStream.Type.UInt32);
        const mipLevelCount = ds.read(DataStream.Type.UInt32);
        const sampleCount = ds.read(DataStream.Type.UInt32);
        const dimension = deserializeString(ds);
        const format = deserializeString(ds);
        const usage = ds.read(DataStream.Type.UInt32);
        const contentLength = ds.read(DataStream.Type.UInt32);
        const content = contentLength > 0 ? ds.readChunk(contentLength) : undefined;
        const bytesPerRow = ds.read(DataStream.Type.UInt32);
        const isCanvas = !!ds.read(DataStream.Type.UInt32);
        this.__initialSnapshot = {
            label,
            device: device_id,
            width, height, depthOrArrayLayers,
            mipLevelCount, sampleCount,
            dimension: dimension,
            format: format,
            usage,
            content,
            bytesPerRow,
            isCanvas
        };
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = this.__initialSnapshot;
            this.__creator = yield profile.getOrRestore(s.device, encoder);
            this.__authentic = this.__creator.__authentic.createTexture({
                label: s.label,
                size: [s.width, s.height, s.depthOrArrayLayers],
                mipLevelCount: s.mipLevelCount,
                sampleCount: s.sampleCount,
                dimension: s.dimension,
                format: s.format,
                usage: s.usage | GPUTextureUsage.COPY_DST | GPUTextureUsage.COPY_SRC | GPUTextureUsage.TEXTURE_BINDING
            });
            this.realUsage = s.usage;
            if (s.content) {
                const stagingBuffer = this.__creator.__authentic.createBuffer({
                    size: s.content.byteLength,
                    usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC
                });
                yield stagingBuffer.mapAsync(GPUMapMode.WRITE);
                const ab = stagingBuffer.getMappedRange();
                new Uint8Array(ab).set(new Uint8Array(s.content));
                stagingBuffer.unmap();
                encoder.copyBufferToTexture({
                    buffer: stagingBuffer,
                    bytesPerRow: s.bytesPerRow,
                    rowsPerImage: s.height
                }, {
                    texture: this.__authentic
                }, {
                    width: s.width,
                    height: s.height,
                    depthOrArrayLayers: s.depthOrArrayLayers
                });
            }
        });
    }
    takeSnapshotBeforeSubmit(encoder, profile) {
        let device;
        let texture;
        if (profile) {
            device = this.__creator.__authentic;
            texture = this.__authentic;
        }
        else {
            const wgi_device = this.__authentic.device;
            device = wgi_device.next;
            texture = this.__authentic.next;
        }
        if (!this.isReplayMode() && this.__authentic.isCanvas) {
            // canvas texture doesn't contain usage COPY_SRC
            return;
        }
        if (texture.sampleCount > 1) {
            // cannot copy from multisampled texture
            return;
        }
        const pixelSize = pixelSizeMap[texture.format];
        if (!pixelSize)
            return; // unsupported format
        const columns = texture.width;
        const bytesPerRow = Math.ceil(columns * pixelSize / 256) * 256;
        const bufferSize = bytesPerRow * texture.height * texture.depthOrArrayLayers;
        const stagingBuffer = device.createBuffer({
            size: bufferSize,
            usage: GPUBufferUsage.MAP_READ | GPUBufferUsage.COPY_DST
        });
        encoder.copyTextureToBuffer({
            texture: texture
        }, {
            buffer: stagingBuffer,
            bytesPerRow: bytesPerRow,
            rowsPerImage: texture.height,
        }, {
            width: texture.width,
            height: texture.height,
            depthOrArrayLayers: texture.depthOrArrayLayers
        });
        this.stagingBuffer = stagingBuffer;
        this.bytesPerRow = bytesPerRow;
    }
    takeSnapshotAfterSubmit() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            let ab = undefined;
            if (this.stagingBuffer) {
                yield this.stagingBuffer.mapAsync(GPUMapMode.READ);
                ab = this.stagingBuffer.getMappedRange().slice(0);
            }
            let creator_id = (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.device.__id;
            let isCanvas = false;
            if (this.__initialSnapshot) {
                isCanvas = this.__initialSnapshot.isCanvas;
            }
            else if (!this.isReplayMode()) {
                isCanvas = this.__authentic.isCanvas;
            }
            this.__snapshot = {
                label: this.__authentic.label,
                device: creator_id,
                width: this.__authentic.width,
                height: this.__authentic.height,
                depthOrArrayLayers: this.__authentic.depthOrArrayLayers,
                mipLevelCount: this.__authentic.mipLevelCount,
                sampleCount: this.__authentic.sampleCount,
                dimension: this.__authentic.dimension,
                format: this.__authentic.format,
                usage: (_c = this.realUsage) !== null && _c !== void 0 ? _c : this.__authentic.usage,
                content: ab,
                bytesPerRow: this.bytesPerRow,
                isCanvas
            };
            if (this.stagingBuffer) {
                this.stagingBuffer.unmap();
                this.stagingBuffer = undefined;
            }
        });
    }
    getDeps() {
        return [this.__authentic.device];
    }
}

class RcdCreateTexture extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.CreateTexture;
    }
    play() {
        const texture = this.caller.__authentic.createTexture(Object.assign(Object.assign({}, this.args[0]), { usage: this.args[0].usage | GPUTextureUsage.COPY_SRC }));
        this.ret.__authentic = texture;
        this.ret.__creator = this.caller;
        this.ret.realUsage = this.args[0].usage;
        return this.ret;
    }
    serialize(ds) {
        this.args[0];
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        serializeObject(ds, this.args[0]);
        // serializeString(ds, a.label);
        // const sizes = [];
        // if ("width" in a.size) {
        //     sizes.push(a.size.width);
        //     sizes.push(a.size.height ?? 1);
        //     sizes.push(a.size.depthOrArrayLayers ?? 1);
        // } else {
        //     sizes.push(...a.size);
        // }
        // ds.write(DataStream.Type.UInt32, sizes[0]); // width
        // ds.write(DataStream.Type.UInt32, sizes[1]); // height
        // ds.write(DataStream.Type.UInt32, sizes[2]); // depthOrArrayLayers
        // ds.write(DataStream.Type.UInt32, a.mipLevelCount ?? 1);
        // ds.write(DataStream.Type.UInt32, a.sampleCount ?? 1);
        // serializeString(ds, a.dimension ?? "2d");
        // serializeString(ds, a.format);
        // ds.write(DataStream.Type.UInt32, a.usage);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const device_id = ds.read(DataStream.Type.UInt32);
        const desc = deserializeObject(ds);
        // const label = deserializeString(ds);
        // const width = ds.read<number>(DataStream.Type.UInt32);
        // const height = ds.read<number>(DataStream.Type.UInt32);
        // const depthOrArrayLayers = ds.read<number>(DataStream.Type.UInt32);
        // const mipLevelCount = ds.read<number>(DataStream.Type.UInt32);
        // const sampleCount = ds.read<number>(DataStream.Type.UInt32);
        // const dimension = deserializeString(ds) as GPUTextureDimension;
        // const format = deserializeString(ds) as GPUTextureFormat;;
        // const usage = ds.read<number>(DataStream.Type.UInt32);
        const ret_id = ds.read(DataStream.Type.UInt32);
        const tracked = new TrackedGPUTexture();
        tracked.__id = ret_id;
        return new RcdCreateTexture([desc], profile.get(device_id), profile.get(ret_id));
    }
}

class RcdDebugRes extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.DebugRes;
    }
    play() { }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.args[0].res.__id);
    }
    deserialize(ds, profile) {
        const resId = ds.read(DataStream.Type.UInt32);
        const res = profile.get(resId);
        return new RcdDebugRes([{ res }]);
    }
    transformArgs(args, transformer) {
        return [{
                res: transformer(args[0].res)
            }];
    }
}

class TrackedGPUDevice extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUDevice;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUDevice);
    }
    serialize(ds) {
        serializeString(ds, this.__snapshot.label);
        ds.write(DataStream.Type.UInt32, this.__snapshot.adapter);
    }
    deserialize(ds) {
        const label = deserializeString(ds);
        const adapter_id = ds.read(DataStream.Type.UInt32);
        this.__initialSnapshot = {
            label,
            adapter: adapter_id
        };
    }
    restore(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__creator = (yield profile.getOrRestore(this.__initialSnapshot.adapter, null));
            const device = yield this.__creator.__authentic.requestDevice({
                label: this.__initialSnapshot.label
            });
            if (!device)
                throw "Restore GPUDevice failed.";
            this.__authentic = device;
        });
    }
    takeSnapshotBeforeSubmit(_) {
        var _a, _b;
        const adapter_id = (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.adapter.__id;
        this.__snapshot = {
            label: this.__authentic.label,
            adapter: adapter_id
        };
    }
    getDeps() {
        return [this.__authentic.adapter];
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

// DEFLATE is a complex format; to read this code, you should probably check the RFC first:
// https://tools.ietf.org/html/rfc1951
// You may also wish to take a look at the guide I made about this program:
// https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
// Some of the following code is similar to that of UZIP.js:
// https://github.com/photopea/UZIP.js
// However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
// Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
// is better for memory in most engines (I *think*).

// aliases for shorter compressed code (most minifers don't do this)
var u8 = Uint8Array, u16 = Uint16Array, i32 = Int32Array;
// fixed length extra bits
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
// fixed distance extra bits
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
// code length index map
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
// get base, reverse index map from extra bits
var freb = function (eb, start) {
    var b = new u16(31);
    for (var i = 0; i < 31; ++i) {
        b[i] = start += 1 << eb[i - 1];
    }
    // numbers here are at max 18 bits
    var r = new i32(b[30]);
    for (var i = 1; i < 30; ++i) {
        for (var j = b[i]; j < b[i + 1]; ++j) {
            r[j] = ((j - b[i]) << 5) | i;
        }
    }
    return { b: b, r: r };
};
var _a = freb(fleb, 2), fl = _a.b, revfl = _a.r;
// we can ignore the fact that the other numbers are wrong; they never happen anyway
fl[28] = 258, revfl[258] = 28;
var _b = freb(fdeb, 0), revfd = _b.r;
// map of value to reverse (assuming 16 bits)
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
    // reverse table algorithm from SO
    var x = ((i & 0xAAAA) >> 1) | ((i & 0x5555) << 1);
    x = ((x & 0xCCCC) >> 2) | ((x & 0x3333) << 2);
    x = ((x & 0xF0F0) >> 4) | ((x & 0x0F0F) << 4);
    rev[i] = (((x & 0xFF00) >> 8) | ((x & 0x00FF) << 8)) >> 1;
}
// create huffman tree from u8 "map": index -> code length for code index
// mb (max bits) must be at most 15
// TODO: optimize/split up?
var hMap = (function (cd, mb, r) {
    var s = cd.length;
    // index
    var i = 0;
    // u16 "map": index -> # of codes with bit length = index
    var l = new u16(mb);
    // length of cd must be 288 (total # of codes)
    for (; i < s; ++i) {
        if (cd[i])
            ++l[cd[i] - 1];
    }
    // u16 "map": index -> minimum code for bit length = index
    var le = new u16(mb);
    for (i = 1; i < mb; ++i) {
        le[i] = (le[i - 1] + l[i - 1]) << 1;
    }
    var co;
    if (r) {
        // u16 "map": index -> number of actual bits, symbol for code
        co = new u16(1 << mb);
        // bits to remove for reverser
        var rvb = 15 - mb;
        for (i = 0; i < s; ++i) {
            // ignore 0 lengths
            if (cd[i]) {
                // num encoding both symbol and bits read
                var sv = (i << 4) | cd[i];
                // free bits
                var r_1 = mb - cd[i];
                // start value
                var v = le[cd[i] - 1]++ << r_1;
                // m is end value
                for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                    // every 16 bit value starting with the code yields the same result
                    co[rev[v] >> rvb] = sv;
                }
            }
        }
    }
    else {
        co = new u16(s);
        for (i = 0; i < s; ++i) {
            if (cd[i]) {
                co[i] = rev[le[cd[i] - 1]++] >> (15 - cd[i]);
            }
        }
    }
    return co;
});
// fixed length tree
var flt = new u8(288);
for (var i = 0; i < 144; ++i)
    flt[i] = 8;
for (var i = 144; i < 256; ++i)
    flt[i] = 9;
for (var i = 256; i < 280; ++i)
    flt[i] = 7;
for (var i = 280; i < 288; ++i)
    flt[i] = 8;
// fixed distance tree
var fdt = new u8(32);
for (var i = 0; i < 32; ++i)
    fdt[i] = 5;
// fixed length map
var flm = /*#__PURE__*/ hMap(flt, 9, 0);
// fixed distance map
var fdm = /*#__PURE__*/ hMap(fdt, 5, 0);
// get end of byte
var shft = function (p) { return ((p + 7) / 8) | 0; };
// typed array slice - allows garbage collector to free original reference,
// while being more compatible than .slice
var slc = function (v, s, e) {
    if (s == null || s < 0)
        s = 0;
    if (e == null || e > v.length)
        e = v.length;
    // can't use .constructor in case user-supplied
    return new u8(v.subarray(s, e));
};
// starting at p, write the minimum number of bits that can hold v to d
var wbits = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) | 0;
    d[o] |= v;
    d[o + 1] |= v >> 8;
};
// starting at p, write the minimum number of bits (>8) that can hold v to d
var wbits16 = function (d, p, v) {
    v <<= p & 7;
    var o = (p / 8) | 0;
    d[o] |= v;
    d[o + 1] |= v >> 8;
    d[o + 2] |= v >> 16;
};
// creates code lengths from a frequency table
var hTree = function (d, mb) {
    // Need extra info to make a tree
    var t = [];
    for (var i = 0; i < d.length; ++i) {
        if (d[i])
            t.push({ s: i, f: d[i] });
    }
    var s = t.length;
    var t2 = t.slice();
    if (!s)
        return { t: et, l: 0 };
    if (s == 1) {
        var v = new u8(t[0].s + 1);
        v[t[0].s] = 1;
        return { t: v, l: 1 };
    }
    t.sort(function (a, b) { return a.f - b.f; });
    // after i2 reaches last ind, will be stopped
    // freq must be greater than largest possible number of symbols
    t.push({ s: -1, f: 25001 });
    var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
    t[0] = { s: -1, f: l.f + r.f, l: l, r: r };
    // efficient algorithm from UZIP.js
    // i0 is lookbehind, i2 is lookahead - after processing two low-freq
    // symbols that combined have high freq, will start processing i2 (high-freq,
    // non-composite) symbols instead
    // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
    while (i1 != s - 1) {
        l = t[t[i0].f < t[i2].f ? i0++ : i2++];
        r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
        t[i1++] = { s: -1, f: l.f + r.f, l: l, r: r };
    }
    var maxSym = t2[0].s;
    for (var i = 1; i < s; ++i) {
        if (t2[i].s > maxSym)
            maxSym = t2[i].s;
    }
    // code lengths
    var tr = new u16(maxSym + 1);
    // max bits in tree
    var mbt = ln(t[i1 - 1], tr, 0);
    if (mbt > mb) {
        // more algorithms from UZIP.js
        // TODO: find out how this code works (debt)
        //  ind    debt
        var i = 0, dt = 0;
        //    left            cost
        var lft = mbt - mb, cst = 1 << lft;
        t2.sort(function (a, b) { return tr[b.s] - tr[a.s] || a.f - b.f; });
        for (; i < s; ++i) {
            var i2_1 = t2[i].s;
            if (tr[i2_1] > mb) {
                dt += cst - (1 << (mbt - tr[i2_1]));
                tr[i2_1] = mb;
            }
            else
                break;
        }
        dt >>= lft;
        while (dt > 0) {
            var i2_2 = t2[i].s;
            if (tr[i2_2] < mb)
                dt -= 1 << (mb - tr[i2_2]++ - 1);
            else
                ++i;
        }
        for (; i >= 0 && dt; --i) {
            var i2_3 = t2[i].s;
            if (tr[i2_3] == mb) {
                --tr[i2_3];
                ++dt;
            }
        }
        mbt = mb;
    }
    return { t: new u8(tr), l: mbt };
};
// get the max length and assign length codes
var ln = function (n, l, d) {
    return n.s == -1
        ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1))
        : (l[n.s] = d);
};
// length codes generation
var lc = function (c) {
    var s = c.length;
    // Note that the semicolon was intentional
    while (s && !c[--s])
        ;
    var cl = new u16(++s);
    //  ind      num         streak
    var cli = 0, cln = c[0], cls = 1;
    var w = function (v) { cl[cli++] = v; };
    for (var i = 1; i <= s; ++i) {
        if (c[i] == cln && i != s)
            ++cls;
        else {
            if (!cln && cls > 2) {
                for (; cls > 138; cls -= 138)
                    w(32754);
                if (cls > 2) {
                    w(cls > 10 ? ((cls - 11) << 5) | 28690 : ((cls - 3) << 5) | 12305);
                    cls = 0;
                }
            }
            else if (cls > 3) {
                w(cln), --cls;
                for (; cls > 6; cls -= 6)
                    w(8304);
                if (cls > 2)
                    w(((cls - 3) << 5) | 8208), cls = 0;
            }
            while (cls--)
                w(cln);
            cls = 1;
            cln = c[i];
        }
    }
    return { c: cl.subarray(0, cli), n: s };
};
// calculate the length of output from tree, code lengths
var clen = function (cf, cl) {
    var l = 0;
    for (var i = 0; i < cl.length; ++i)
        l += cf[i] * cl[i];
    return l;
};
// writes a fixed block
// returns the new bit pos
var wfblk = function (out, pos, dat) {
    // no need to write 00 as type: TypedArray defaults to 0
    var s = dat.length;
    var o = shft(pos + 2);
    out[o] = s & 255;
    out[o + 1] = s >> 8;
    out[o + 2] = out[o] ^ 255;
    out[o + 3] = out[o + 1] ^ 255;
    for (var i = 0; i < s; ++i)
        out[o + i + 4] = dat[i];
    return (o + 4 + s) * 8;
};
// writes a block
var wblk = function (dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
    wbits(out, p++, final);
    ++lf[256];
    var _a = hTree(lf, 15), dlt = _a.t, mlb = _a.l;
    var _b = hTree(df, 15), ddt = _b.t, mdb = _b.l;
    var _c = lc(dlt), lclt = _c.c, nlc = _c.n;
    var _d = lc(ddt), lcdt = _d.c, ndc = _d.n;
    var lcfreq = new u16(19);
    for (var i = 0; i < lclt.length; ++i)
        ++lcfreq[lclt[i] & 31];
    for (var i = 0; i < lcdt.length; ++i)
        ++lcfreq[lcdt[i] & 31];
    var _e = hTree(lcfreq, 7), lct = _e.t, mlcb = _e.l;
    var nlcc = 19;
    for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
        ;
    var flen = (bl + 5) << 3;
    var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
    var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + 2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18];
    if (bs >= 0 && flen <= ftlen && flen <= dtlen)
        return wfblk(out, p, dat.subarray(bs, bs + bl));
    var lm, ll, dm, dl;
    wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
    if (dtlen < ftlen) {
        lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
        var llm = hMap(lct, mlcb, 0);
        wbits(out, p, nlc - 257);
        wbits(out, p + 5, ndc - 1);
        wbits(out, p + 10, nlcc - 4);
        p += 14;
        for (var i = 0; i < nlcc; ++i)
            wbits(out, p + 3 * i, lct[clim[i]]);
        p += 3 * nlcc;
        var lcts = [lclt, lcdt];
        for (var it = 0; it < 2; ++it) {
            var clct = lcts[it];
            for (var i = 0; i < clct.length; ++i) {
                var len = clct[i] & 31;
                wbits(out, p, llm[len]), p += lct[len];
                if (len > 15)
                    wbits(out, p, (clct[i] >> 5) & 127), p += clct[i] >> 12;
            }
        }
    }
    else {
        lm = flm, ll = flt, dm = fdm, dl = fdt;
    }
    for (var i = 0; i < li; ++i) {
        var sym = syms[i];
        if (sym > 255) {
            var len = (sym >> 18) & 31;
            wbits16(out, p, lm[len + 257]), p += ll[len + 257];
            if (len > 7)
                wbits(out, p, (sym >> 23) & 31), p += fleb[len];
            var dst = sym & 31;
            wbits16(out, p, dm[dst]), p += dl[dst];
            if (dst > 3)
                wbits16(out, p, (sym >> 5) & 8191), p += fdeb[dst];
        }
        else {
            wbits16(out, p, lm[sym]), p += ll[sym];
        }
    }
    wbits16(out, p, lm[256]);
    return p + ll[256];
};
// deflate options (nice << 13) | chain
var deo = /*#__PURE__*/ new i32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
// empty
var et = /*#__PURE__*/ new u8(0);
// compresses data into a raw DEFLATE buffer
var dflt = function (dat, lvl, plvl, pre, post, st) {
    var s = st.z || dat.length;
    var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
    // writing to this writes to the output buffer
    var w = o.subarray(pre, o.length - post);
    var lst = st.l;
    var pos = (st.r || 0) & 7;
    if (lvl) {
        if (pos)
            w[0] = st.r >> 3;
        var opt = deo[lvl - 1];
        var n = opt >> 13, c = opt & 8191;
        var msk_1 = (1 << plvl) - 1;
        //    prev 2-byte val map    curr 2-byte val map
        var prev = st.p || new u16(32768), head = st.h || new u16(msk_1 + 1);
        var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
        var hsh = function (i) { return (dat[i] ^ (dat[i + 1] << bs1_1) ^ (dat[i + 2] << bs2_1)) & msk_1; };
        // 24576 is an arbitrary number of maximum symbols per block
        // 424 buffer for last block
        var syms = new i32(25000);
        // length/literal freq   distance freq
        var lf = new u16(288), df = new u16(32);
        //  l/lcnt  exbits  index          l/lind  waitdx          blkpos
        var lc_1 = 0, eb = 0, i = st.i || 0, li = 0, wi = st.w || 0, bs = 0;
        for (; i + 2 < s; ++i) {
            // hash value
            var hv = hsh(i);
            // index mod 32768    previous index mod
            var imod = i & 32767, pimod = head[hv];
            prev[imod] = pimod;
            head[hv] = imod;
            // We always should modify head and prev, but only add symbols if
            // this data is not yet processed ("wait" for wait index)
            if (wi <= i) {
                // bytes remaining
                var rem = s - i;
                if ((lc_1 > 7000 || li > 24576) && (rem > 423 || !lst)) {
                    pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                    li = lc_1 = eb = 0, bs = i;
                    for (var j = 0; j < 286; ++j)
                        lf[j] = 0;
                    for (var j = 0; j < 30; ++j)
                        df[j] = 0;
                }
                //  len    dist   chain
                var l = 2, d = 0, ch_1 = c, dif = imod - pimod & 32767;
                if (rem > 2 && hv == hsh(i - dif)) {
                    var maxn = Math.min(n, rem) - 1;
                    var maxd = Math.min(32767, i);
                    // max possible length
                    // not capped at dif because decompressors implement "rolling" index population
                    var ml = Math.min(258, rem);
                    while (dif <= maxd && --ch_1 && imod != pimod) {
                        if (dat[i + l] == dat[i + l - dif]) {
                            var nl = 0;
                            for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                                ;
                            if (nl > l) {
                                l = nl, d = dif;
                                // break out early when we reach "nice" (we are satisfied enough)
                                if (nl > maxn)
                                    break;
                                // now, find the rarest 2-byte sequence within this
                                // length of literals and search for that instead.
                                // Much faster than just using the start
                                var mmd = Math.min(dif, nl - 2);
                                var md = 0;
                                for (var j = 0; j < mmd; ++j) {
                                    var ti = i - dif + j & 32767;
                                    var pti = prev[ti];
                                    var cd = ti - pti & 32767;
                                    if (cd > md)
                                        md = cd, pimod = ti;
                                }
                            }
                        }
                        // check the previous match
                        imod = pimod, pimod = prev[imod];
                        dif += imod - pimod & 32767;
                    }
                }
                // d will be nonzero only when a match was found
                if (d) {
                    // store both dist and len data in one int32
                    // Make sure this is recognized as a len/dist with 28th bit (2^28)
                    syms[li++] = 268435456 | (revfl[l] << 18) | revfd[d];
                    var lin = revfl[l] & 31, din = revfd[d] & 31;
                    eb += fleb[lin] + fdeb[din];
                    ++lf[257 + lin];
                    ++df[din];
                    wi = i + l;
                    ++lc_1;
                }
                else {
                    syms[li++] = dat[i];
                    ++lf[dat[i]];
                }
            }
        }
        for (i = Math.max(i, wi); i < s; ++i) {
            syms[li++] = dat[i];
            ++lf[dat[i]];
        }
        pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
        if (!lst) {
            st.r = (pos & 7) | w[(pos / 8) | 0] << 3;
            // shft(pos) now 1 less if pos & 7 != 0
            pos -= 7;
            st.h = head, st.p = prev, st.i = i, st.w = wi;
        }
    }
    else {
        for (var i = st.w || 0; i < s + lst; i += 65535) {
            // end
            var e = i + 65535;
            if (e >= s) {
                // write final block
                w[(pos / 8) | 0] = lst;
                e = s;
            }
            pos = wfblk(w, pos + 1, dat.subarray(i, e));
        }
        st.i = s;
    }
    return slc(o, 0, pre + shft(pos) + post);
};
// CRC32 table
var crct = /*#__PURE__*/ (function () {
    var t = new Int32Array(256);
    for (var i = 0; i < 256; ++i) {
        var c = i, k = 9;
        while (--k)
            c = ((c & 1) && -306674912) ^ (c >>> 1);
        t[i] = c;
    }
    return t;
})();
// CRC32
var crc = function () {
    var c = -1;
    return {
        p: function (d) {
            // closures have awful performance
            var cr = c;
            for (var i = 0; i < d.length; ++i)
                cr = crct[(cr & 255) ^ d[i]] ^ (cr >>> 8);
            c = cr;
        },
        d: function () { return ~c; }
    };
};
// deflate with opts
var dopt = function (dat, opt, pre, post, st) {
    if (!st) {
        st = { l: 1 };
        if (opt.dictionary) {
            var dict = opt.dictionary.subarray(-32768);
            var newDat = new u8(dict.length + dat.length);
            newDat.set(dict);
            newDat.set(dat, dict.length);
            dat = newDat;
            st.w = dict.length;
        }
    }
    return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? (st.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : 20) : (12 + opt.mem), pre, post, st);
};
// write bytes
var wbytes = function (d, b, v) {
    for (; v; ++b)
        d[b] = v, v >>>= 8;
};
// gzip header
var gzh = function (c, o) {
    var fn = o.filename;
    c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
    if (o.mtime != 0)
        wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
    if (fn) {
        c[3] = 8;
        for (var i = 0; i <= fn.length; ++i)
            c[i + 10] = fn.charCodeAt(i);
    }
};
// gzip header length
var gzhl = function (o) { return 10 + (o.filename ? o.filename.length + 1 : 0); };
/**
 * Compresses data with GZIP
 * @param data The data to compress
 * @param opts The compression options
 * @returns The gzipped version of the data
 */
function gzipSync(data, opts) {
    if (!opts)
        opts = {};
    var c = crc(), l = data.length;
    c.p(data);
    var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
    return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
}
// text decoder
var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
// text decoder stream
var tds = 0;
try {
    td.decode(et, { stream: true });
    tds = 1;
}
catch (e) { }

var RecorderState;
(function (RecorderState) {
    RecorderState[RecorderState["Background"] = 0] = "Background";
    RecorderState[RecorderState["Preparing"] = 1] = "Preparing";
    RecorderState[RecorderState["Snapshot"] = 2] = "Snapshot";
    RecorderState[RecorderState["Capturing"] = 3] = "Capturing";
    RecorderState[RecorderState["Saving"] = 4] = "Saving";
    RecorderState[RecorderState["Expired"] = 5] = "Expired";
})(RecorderState || (RecorderState = {}));
// There a problem, recorder doesn't know how to choose GPUDevcie for snapshot.
class Recorder {
    constructor(device) {
        this.device = device;
        this.snapshotPromises = [];
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
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all(this.snapshotPromises);
            this.snapshotPromises = [];
            const ds = DataStream.createWithInternalBuffer();
            const u16 = DataStream.Type.UInt16;
            const u32 = DataStream.Type.UInt32;
            DataStream.Type.Float;
            ds.write(u32, 0x696777); // magic number
            ds.write(u16, 0); // major version
            ds.write(u16, 1); // minor version
            const totalLength = ds.reserve(u32);
            ds.write(u32, this.trackedMap.size); // res count
            for (const [, tracked] of this.trackedMap) {
                ds.write(u32, 0x736572); // res signature
                ds.write(u32, tracked.__id); // res id
                ds.write(u32, tracked.__kind); // res brand
                if (tracked.__temporary) {
                    ds.write(u32, 0x1);
                }
                else {
                    ds.write(u32, 0);
                    tracked.serialize(ds);
                }
            }
            ds.write(u32, this.records.length); // records count
            for (let i = 0; i < this.records.length; i++) {
                const rcd = this.records[i];
                ds.write(u32, 0x646372); // rcd signature
                ds.write(u32, i); // record index
                ds.write(u32, rcd.__kind);
                this.records[i].serialize(ds);
            }
            totalLength.write(ds.pos());
            const clipped = ds.getClippedBuffer();
            const compressed = gzipSync(new Uint8Array(clipped));
            downloadBinaryFile(compressed);
            this.state = RecorderState.Expired;
        });
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
    recursivelyGetTrackedAndTakeSnapshot(obj, encoder, newTracks) {
        if (wgi_GPUBase.is_wgi(obj)) {
            let tracked = this.trackedMap.get(obj.__id);
            if (tracked)
                return tracked;
            const trackedCtor = obj.getTrackedType();
            tracked = trackedCtor.prototype.fromAuthentic(obj);
            this.trackedMap.set(obj.__id, tracked);
            if (!tracked.__temporary) {
                tracked.takeSnapshotBeforeSubmit(encoder);
                newTracks.push(tracked);
                const deps = tracked.getDeps();
                for (const depAuthentic of deps) {
                    const depTracked = this.trackedMap.get(depAuthentic.__id);
                    if (!depTracked) {
                        this.recursivelyGetTrackedAndTakeSnapshot(depAuthentic, encoder, newTracks);
                    }
                }
            }
            return tracked;
        }
        else {
            return obj;
        }
    }
    processRcd(RcdType, caller, args, directPlay) {
        if (this.state === RecorderState.Capturing) {
            const newTracks = [];
            const encoder = this.device.next.createCommandEncoder();
            // collect tracks
            caller = this.recursivelyGetTrackedAndTakeSnapshot(caller, encoder, newTracks);
            const rcd = new RcdType(RcdType.prototype.transformArgs(args, (obj) => this.recursivelyGetTrackedAndTakeSnapshot(obj, encoder, newTracks)), caller);
            this.device.next.queue.submit([encoder.finish()]);
            const gpuDone = this.device.queue.onSubmittedWorkDone();
            for (const newTracked of newTracks) {
                this.snapshotPromises.push(gpuDone.then(() => newTracked.takeSnapshotAfterSubmit()));
            }
            this.records.push(rcd);
            const ret = directPlay();
            if (ret) {
                const trackedRet = ret.getTrackedType().prototype.fromAuthentic(ret);
                rcd.ret = trackedRet;
                trackedRet.markAsTemporary();
                this.trackedMap.set(trackedRet.__id, trackedRet);
            }
            return ret;
        }
        else {
            return directPlay();
        }
    }
}
let globalRecorder;
function createGlobalRecorder(device) {
    globalRecorder = new Recorder(device);
}

class TrackedGPUBindGroup extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUBindGroup;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUBindGroup);
    }
    serialize(ds) {
        serializeObject(ds, this.__snapshot);
    }
    deserialize(ds) {
        this.__initialSnapshot = deserializeObject(ds);
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = this.__initialSnapshot;
            this.__creator = (yield profile.getOrRestore(s.device, encoder));
            const entries = [];
            for (const e of s.entries) {
                let resource;
                if (e.resourceType === "GPUBuffer") {
                    resource = {
                        buffer: (yield profile.getOrRestore(e.resource.buffer, encoder)).__authentic,
                        offset: e.resource.offset,
                        size: e.resource.size,
                    };
                }
                else {
                    resource = (yield profile.getOrRestore(e.resource, encoder)).__authentic;
                }
                entries.push({
                    binding: e.binding,
                    resource
                });
            }
            this.__authentic = this.__creator.__authentic.createBindGroup({
                label: s.label,
                layout: (yield profile.getOrRestore(s.layout, encoder)).__authentic,
                entries
            });
        });
    }
    takeSnapshotBeforeSubmit(encoder, profile) {
        var _a, _b;
        if (this.isReplayMode() && this.__initialSnapshot) {
            this.__snapshot = this.__initialSnapshot;
            return;
        }
        let desc;
        if (this.isReplayMode()) {
            desc = this.__creatorRcd.args[0];
        }
        else {
            desc = this.__authentic.desc;
        }
        this.__snapshot = {
            label: this.__authentic.label,
            device: (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.device.__id,
            layout: desc.layout.__id,
            entries: desc.entries.map((e) => {
                var _a, _b, _c, _d, _e;
                if (e.resource.buffer) {
                    const bufferSize = (_a = e.resource.buffer.size) !== null && _a !== void 0 ? _a : e.resource.buffer.__authentic.size;
                    return {
                        binding: e.binding,
                        resourceType: "GPUBuffer",
                        resource: {
                            buffer: e.resource.buffer.__id,
                            offset: (_b = e.resource.offset) !== null && _b !== void 0 ? _b : 0,
                            size: (_c = e.resource.size) !== null && _c !== void 0 ? _c : (bufferSize - ((_d = e.resource.offset) !== null && _d !== void 0 ? _d : 0))
                        }
                    };
                }
                else {
                    const brand = (_e = e.resource.__brand) !== null && _e !== void 0 ? _e : brandMap[e.resource.__kind];
                    return {
                        binding: e.binding,
                        resourceType: brand,
                        resource: e.resource.__id
                    };
                }
            })
        };
    }
    getDeps() {
        const desc = this.__authentic.desc;
        const deps = [
            desc.layout
        ];
        for (const e of desc.entries) {
            if (e.resource.buffer) {
                deps.push(e.resource.buffer);
            }
            else {
                deps.push(e.resource);
            }
        }
        return deps;
    }
}

class wgi_GPUBindGroup extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUBindGroup;
    }
    constructor(next, device, desc) {
        super();
        this.next = next;
        this.device = device;
        this.desc = desc;
        this.__brand = "GPUBindGroup";
    }
    get label() { return this.next.label; }
}

class TrackedGPUBindGroupLayout extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUBindGroupLayout;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUBindGroupLayout);
    }
    serialize(ds) {
        serializeObject(ds, this.__snapshot);
    }
    deserialize(ds) {
        this.__initialSnapshot = deserializeObject(ds);
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = this.__initialSnapshot;
            if (s.source === "device") {
                this.__creator = (yield profile.getOrRestore(s.creator, encoder));
                this.__authentic = this.__creator.__authentic.createBindGroupLayout({
                    label: s.label,
                    entries: s.entries.map(e => ({
                        binding: e.binding,
                        visibility: e.visibility,
                        buffer: e.type === "buffer" ? e.resourceLayout : undefined,
                        externalTexture: e.type === "externalTexture" ? e.resourceLayout : undefined,
                        sampler: e.type === "sampler" ? e.resourceLayout : undefined,
                        storageTexture: e.type === "storageTexture" ? e.resourceLayout : undefined,
                        texture: e.type === "texture" ? e.resourceLayout : undefined,
                    }))
                });
            }
            else {
                this.__creator = (yield profile.getOrRestore(s.creator, encoder));
                this.__authentic = this.__creator.__authentic.getBindGroupLayout(s.pipelineBindGroupIndex);
            }
        });
    }
    takeSnapshotBeforeSubmit(encoder, profile) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let desc;
        if (this.isReplayMode()) {
            if (this.__initialSnapshot) {
                this.__snapshot = this.__initialSnapshot;
                return;
            }
            else {
                desc = this.__creatorRcd.args[0];
            }
        }
        else {
            desc = this.__authentic.desc;
        }
        this.__snapshot = {
            label: this.__authentic.label,
            creator: (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.creator.__id,
            source: "device",
            entries: []
        };
        if (typeof desc === "number") {
            // created by pipeline.getBindGroupLayout()
            this.__snapshot.source = "pipeline";
            this.__snapshot.pipelineBindGroupIndex = desc;
            return;
        }
        // created by device.createBindGroupLayout()
        for (const e of desc.entries) {
            const type = ["buffer", "externalTexture", "sampler", "storageTexture", "texture"].find(t => e[t]);
            if (!type)
                continue;
            let resourceLayout;
            if (type === "buffer") {
                resourceLayout = {
                    hasDynamicOffset: (_c = e.buffer.hasDynamicOffset) !== null && _c !== void 0 ? _c : false,
                    minBindingSize: (_d = e.buffer.minBindingSize) !== null && _d !== void 0 ? _d : 0,
                    type: (_e = e.buffer.type) !== null && _e !== void 0 ? _e : "uniform"
                };
            }
            else if (type === "externalTexture") {
                resourceLayout = {};
            }
            else if (type === "sampler") {
                resourceLayout = {
                    type: (_f = e.sampler.type) !== null && _f !== void 0 ? _f : "filtering"
                };
            }
            else if (type === "storageTexture") {
                resourceLayout = {
                    access: (_g = e.storageTexture.access) !== null && _g !== void 0 ? _g : "write-only",
                    format: e.storageTexture.format,
                    viewDimension: (_h = e.storageTexture.viewDimension) !== null && _h !== void 0 ? _h : "2d"
                };
            }
            else if (type === "texture") {
                resourceLayout = {
                    multisampled: (_j = e.texture.multisampled) !== null && _j !== void 0 ? _j : false,
                    sampleType: (_k = e.texture.sampleType) !== null && _k !== void 0 ? _k : "float",
                    viewDimension: (_l = e.texture.viewDimension) !== null && _l !== void 0 ? _l : "2d"
                };
            }
            this.__snapshot.entries.push({
                binding: e.binding,
                visibility: e.visibility,
                type,
                resourceLayout
            });
        }
    }
    getDeps() {
        return [this.__authentic.creator];
    }
}

class wgi_GPUBindGroupLayout extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUBindGroupLayout;
    }
    constructor(next, creator, desc) {
        super();
        this.next = next;
        this.creator = creator;
        this.desc = desc;
        this.__brand = "GPUBindGroupLayout";
    }
    get label() { return this.next.label; }
}

class wgi_GPUBuffer extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUBuffer;
    }
    constructor(next, device, desc) {
        super();
        this.next = next;
        this.device = device;
        this.desc = desc;
        this.__brand = "GPUBuffer";
        this.deps.add(device);
    }
    get size() { return this.next.size; }
    ;
    get usage() { return this.desc.usage; }
    ;
    get mapState() { return this.next.mapState; }
    mapAsync(mode, offset, size) {
        return this.next.mapAsync(mode, offset, size);
    }
    getMappedRange(offset, size) {
        return this.next.getMappedRange(offset, size);
    }
    unmap() {
        this.next.unmap();
    }
    destroy() {
        this.next.destroy();
    }
    get label() { return this.next.label; }
    ;
    set label(v) { this.next.label = v; }
    serialize(ds) {
        serializeString(ds, this.label);
        ds.write(DataStream.Type.UInt32, this.size);
        ds.write(DataStream.Type.UInt32, this.usage);
    }
}

class TrackedGPURenderPassEncoder extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPURenderPassEncoder;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPURenderPassEncoder);
    }
    serialize(ds) {
        serializeObject(ds, this.__snapshot);
    }
    deserialize(ds) {
        this.__initialSnapshot = deserializeObject(ds);
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            // it's impossible to restore a RenderPassEncoder.
            console.assert(false);
            // const s = this.__initialSnapshot!;
            // this.__creator = await profile.getOrRestore(s.encoder, encoder);
            // const colors = [];
            // for (const color of s.colorAttachments) {
            //     const view = (await profile.getOrRestore(color.view, encoder)).__authentic!;
            //     const resolveTarget = color.resolveTarget ? (await profile.getOrRestore(color.resolveTarget, encoder)).__authentic! : undefined;
            //     colors.push({
            //         ...color,
            //         view,
            //         resolveTarget
            //     });
            // }
            // let depth = undefined;
            // if (s.depthStencilAttachment) {
            //     depth = {
            //         ...s.depthStencilAttachment,
            //         view: (await profile.getOrRestore(s.depthStencilAttachment.view, encoder)).__authentic!
            //     };
            // }
            // this.__authentic = this.__creator.__authentic!.beginRenderPass({
            //     ...s,
            //     colorAttachments: colors,
            //     depthStencilAttachment: depth,
            //     occlusionQuerySet: undefined,
            //     timestampWrites: undefined
            // });
        });
    }
    takeSnapshotBeforeSubmit(encoder, profile) {
        var _a, _b;
        let encoder_id;
        let desc;
        if (profile) {
            if (this.__initialSnapshot) {
                this.__snapshot = this.__initialSnapshot;
                return;
            }
            encoder_id = this.__creator.__id;
            desc = this.__creatorRcd.args[0];
        }
        else {
            encoder_id = this.__authentic.__id;
            desc = this.__authentic.desc;
        }
        desc = RcdBeginRenderPass.prototype.transformArgs([desc], (tracked) => tracked.__id)[0];
        for (const att of desc.colorAttachments) {
            att.clearValue = (_a = att.clearValue) !== null && _a !== void 0 ? _a : [0, 0, 0, 0];
            if (att.clearValue.r !== undefined) {
                att.clearValue = [att.clearValue.r, att.clearValue.g, att.clearValue.b, att.clearValue.a];
            }
        }
        this.__snapshot = Object.assign(Object.assign({}, desc), { label: this.__authentic.label, encoder: encoder_id, maxDrawCount: (_b = desc.maxDrawCount) !== null && _b !== void 0 ? _b : 50000000 });
    }
    getDeps() {
        const deps = [this.__authentic.encoder];
        const desc = this.__authentic.desc;
        for (const color of desc.colorAttachments) {
            if (color) {
                deps.push(color.view);
                if (color.resolveTarget) {
                    deps.push(color.resolveTarget);
                }
            }
        }
        if (desc.depthStencilAttachment) {
            deps.push(desc.depthStencilAttachment.view);
        }
        return deps;
    }
    deleteSnapshot() {
        this.__snapshot = undefined;
        this.__runtime = {
            vbs: {},
            bindGroups: {}
        };
    }
}

class RcdBeginRenderPass extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.BeginRenderPass;
    }
    play() {
        const desc = this.transformArgs(this.args, (tracked) => tracked.__authentic);
        const pass = this.caller.__authentic.beginRenderPass(desc[0]);
        this.ret.__authentic = pass;
        this.ret.__creator = this.caller;
        this.ret.__creatorRcd = this;
        return this.ret;
    }
    serialize(ds) {
        const desc = this.transformArgs(this.args, (tracked) => tracked.__id);
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        serializeObject(ds, desc);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const encoder_id = ds.read(DataStream.Type.UInt32);
        const rawDesc = deserializeObject(ds);
        const ret_id = ds.read(DataStream.Type.UInt32);
        const tracked = new TrackedGPURenderPassEncoder();
        tracked.__id = ret_id;
        const desc = this.transformArgs(rawDesc, (id) => profile.get(id));
        return new RcdBeginRenderPass(desc, profile.get(encoder_id), profile.get(ret_id));
    }
    transformArgs(args, transformer) {
        const desc = Object.assign(Object.assign({}, args[0]), { colorAttachments: [] });
        args[0].colorAttachments.forEach((att) => {
            desc.colorAttachments.push(Object.assign(Object.assign({}, att), { view: transformer(att.view) }));
            if (att.resolveTarget) {
                desc.colorAttachments[desc.colorAttachments.length - 1].resolveTarget = transformer(att.resolveTarget);
            }
        });
        if (args[0].depthStencilAttachment) {
            desc.depthStencilAttachment = Object.assign(Object.assign({}, args[0].depthStencilAttachment), { view: transformer(args[0].depthStencilAttachment.view) });
        }
        return [desc];
    }
}

class RcdCopyBufferToBuffer extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.CopyBufferToBuffer;
    }
    play() {
        this.caller.__authentic.copyBufferToBuffer(this.args[0].__authentic, this.args[1], this.args[2].__authentic, this.args[3], this.args[4]);
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].__id);
        ds.write(DataStream.Type.UInt32, this.args[1]);
        ds.write(DataStream.Type.UInt32, this.args[2].__id);
        ds.write(DataStream.Type.UInt32, this.args[3]);
        ds.write(DataStream.Type.UInt32, this.args[4]);
    }
    deserialize(ds, profile) {
        const encoder = profile.get(ds.read(DataStream.Type.UInt32));
        const src = profile.get(ds.read(DataStream.Type.UInt32));
        const srcOffset = ds.read(DataStream.Type.UInt32);
        const dst = profile.get(ds.read(DataStream.Type.UInt32));
        const dstOffset = ds.read(DataStream.Type.UInt32);
        const size = ds.read(DataStream.Type.UInt32);
        return new RcdCopyBufferToBuffer([src, srcOffset, dst, dstOffset, size], encoder);
    }
    transformArgs(args, transformer) {
        return [
            transformer(args[0]),
            args[1],
            transformer(args[2]),
            args[3], args[4]
        ];
    }
}

class RcdCopyTextureToTexture extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.CopyTextureToTexture;
    }
    play() {
        this.caller.__authentic.copyTextureToTexture(...this.transformArgs(this.args, tracked => tracked.__authentic));
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        const args = this.transformArgs(this.args, tracked => tracked.__id);
        serializeObject(ds, args[0]);
        serializeObject(ds, args[1]);
        serializeObject(ds, args[2]);
    }
    deserialize(ds, profile) {
        const encoder = profile.get(ds.read(DataStream.Type.UInt32));
        const source = deserializeObject(ds);
        const destination = deserializeObject(ds);
        const copySize = deserializeObject(ds);
        const rawArgs = [source, destination, copySize];
        const args = this.transformArgs(rawArgs, id => profile.get(id));
        return new RcdCopyTextureToTexture(args, encoder);
    }
    transformArgs(args, transformer) {
        return [
            Object.assign(Object.assign({}, args[0]), { texture: transformer(args[0].texture) }),
            Object.assign(Object.assign({}, args[1]), { texture: transformer(args[1].texture) }),
            args[2]
        ];
    }
}

class RcdFinish extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.Finish;
    }
    play() {
        const cb = this.caller.__authentic.finish();
        this.ret.__authentic = cb;
        this.ret.__creator = this.caller;
        return this.ret;
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const encoder = profile.get(ds.read(DataStream.Type.UInt32));
        const ret = profile.get(ds.read(DataStream.Type.UInt32));
        return new RcdFinish([], encoder, ret);
    }
}

class TrackedGPUCommandEncoder extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUCommandEncoder;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUCommandEncoder);
    }
    serialize(ds) {
        serializeString(ds, this.__snapshot.label);
        ds.write(DataStream.Type.UInt32, this.__snapshot.device);
    }
    deserialize(ds) {
        const label = deserializeString(ds);
        const device_id = ds.read(DataStream.Type.UInt32);
        this.__initialSnapshot = {
            label: label,
            device: device_id
        };
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__creator = (yield profile.getOrRestore(this.__initialSnapshot.device, encoder));
            this.__authentic = this.__creator.__authentic.createCommandEncoder({
                label: this.__initialSnapshot.label
            });
        });
    }
    takeSnapshotBeforeSubmit(_) {
        var _a, _b;
        const device_id = (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.device.__id;
        this.__snapshot = {
            label: this.__authentic.label,
            device: device_id
        };
    }
    getDeps() {
        return [this.__authentic.device];
    }
}

class TrackedGPUCommandBuffer extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUCommandBuffer;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUCommandBuffer);
    }
    serialize(ds) {
        serializeString(ds, this.__snapshot.label);
        ds.write(DataStream.Type.UInt32, this.__snapshot.encoder);
    }
    deserialize(ds) {
        const label = deserializeString(ds);
        const encoder_id = ds.read(DataStream.Type.UInt32);
        this.__initialSnapshot = {
            label,
            encoder: encoder_id
        };
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__creator = (yield profile.getOrRestore(this.__initialSnapshot.encoder, encoder));
            this.__authentic = this.__creator.__authentic.finish({
                label: this.__initialSnapshot.label
            });
        });
    }
    takeSnapshotBeforeSubmit() {
        var _a, _b;
        const encoder_id = (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.encoder.__id;
        this.__snapshot = {
            label: this.__authentic.label,
            encoder: encoder_id
        };
    }
    getDeps() {
        return [this.__authentic.encoder];
    }
}

class wgi_GPUCommandBuffer extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUCommandBuffer;
    }
    constructor(next, encoder) {
        super();
        this.next = next;
        this.encoder = encoder;
        this.__brand = "GPUCommandBuffer";
    }
    get label() { return this.next.label; }
}

class RcdDraw extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.Draw;
    }
    play() {
        this.caller.__authentic.draw(...this.args);
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.args[0]);
        seralizeOptionalUint32(ds, this.args[1]);
        seralizeOptionalUint32(ds, this.args[2]);
        seralizeOptionalUint32(ds, this.args[3]);
    }
    deserialize(ds, profile) {
        const pass = profile.get(ds.read(DataStream.Type.UInt32));
        const vertexCount = ds.read(DataStream.Type.UInt32);
        const instanceCount = deseralizeOptionalUint32(ds);
        const firstVertex = deseralizeOptionalUint32(ds);
        const firstInstance = deseralizeOptionalUint32(ds);
        return new RcdDraw([vertexCount, instanceCount, firstVertex, firstInstance], pass);
    }
}

class RcdDrawIndexed extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.DrawIndexed;
    }
    play() {
        this.caller.__authentic.drawIndexed(...this.args);
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.args[0]);
        seralizeOptionalUint32(ds, this.args[1]);
        seralizeOptionalUint32(ds, this.args[2]);
        seralizeOptionalUint32(ds, this.args[3]);
        seralizeOptionalUint32(ds, this.args[4]);
    }
    deserialize(ds, profile) {
        const pass = profile.get(ds.read(DataStream.Type.UInt32));
        const indexCount = ds.read(DataStream.Type.UInt32);
        const instanceCount = deseralizeOptionalUint32(ds);
        const firstIndex = deseralizeOptionalUint32(ds);
        const baseVertex = deseralizeOptionalUint32(ds);
        const firstInstance = deseralizeOptionalUint32(ds);
        return new RcdDrawIndexed([indexCount, instanceCount, firstIndex, baseVertex, firstInstance], pass);
    }
}

class RcdEnd extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.End;
    }
    play() {
        this.caller.__authentic.end();
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
    }
    deserialize(ds, profile) {
        const pass = profile.get(ds.read(DataStream.Type.UInt32));
        return new RcdEnd([], pass);
    }
}

class RcdSetBindGroup extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.SetBindGroup;
    }
    play() {
        this.caller.__authentic.setBindGroup(this.args[0], this.args[1] ? this.args[1].__authentic : null, this.args[2]);
        if (this.args[1]) {
            this.caller.__runtime.bindGroups[this.args[0]] = {
                bindGroup: this.args[1],
                dynamicOffsets: this.args[2]
            };
        }
        else {
            delete this.caller.__runtime.bindGroups[this.args[0]];
        }
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.args[0]);
        seralizeOptionalUint32(ds, this.args[1] ? this.args[1].__id : null);
        if (!this.args[2]) {
            ds.write(DataStream.Type.UInt32, 0);
        }
        else {
            ds.write(DataStream.Type.UInt32, this.args[2].length);
            for (const offset of this.args[2]) {
                ds.write(DataStream.Type.UInt32, offset);
            }
        }
    }
    deserialize(ds, profile) {
        const pass = profile.get(ds.read(DataStream.Type.UInt32));
        const index = ds.read(DataStream.Type.UInt32);
        const bindGroupId = deseralizeOptionalUint32(ds);
        const bindGroup = bindGroupId !== undefined ? profile.get(bindGroupId) : null;
        const offsets = [];
        const offsetLength = ds.read(DataStream.Type.UInt32);
        for (let i = 0; i < offsetLength; i++) {
            offsets.push(ds.read(DataStream.Type.UInt32));
        }
        return new RcdSetBindGroup([index, bindGroup, offsets.length === 0 ? undefined : offsets], pass);
    }
    transformArgs(args, transformer) {
        return [
            args[0],
            args[1] ? transformer(args[1]) : null,
            args[2]
        ];
    }
}

class RcdSetIndexBuffer extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.SetIndexBuffer;
    }
    play() {
        var _a, _b, _c;
        this.caller.__authentic.setIndexBuffer(this.args[0].__authentic, this.args[1], this.args[2], this.args[3]);
        this.caller.__runtime.ib = {
            buffer: this.args[0],
            format: this.args[1],
            offset: (_a = this.args[2]) !== null && _a !== void 0 ? _a : 0,
            size: (_b = this.args[3]) !== null && _b !== void 0 ? _b : this.args[0].__authentic.size - ((_c = this.args[2]) !== null && _c !== void 0 ? _c : 0)
        };
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].__id);
        serializeString(ds, this.args[1]);
        seralizeOptionalUint32(ds, this.args[2]);
        seralizeOptionalUint32(ds, this.args[3]);
    }
    deserialize(ds, profile) {
        const pass = profile.get(ds.read(DataStream.Type.UInt32));
        const buffer = profile.get(ds.read(DataStream.Type.UInt32));
        const format = deserializeString(ds);
        const offset = deseralizeOptionalUint32(ds);
        const size = deseralizeOptionalUint32(ds);
        return new RcdSetIndexBuffer([buffer, format, offset, size], pass);
    }
    transformArgs(args, transformer) {
        return [
            transformer(args[0]),
            args[1], args[2], args[3]
        ];
    }
}

class RcdSetPipeline extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.SetPipeline;
    }
    play() {
        this.caller.__authentic.setPipeline(this.args[0].__authentic);
        this.caller.__runtime.pipeline = this.args[0];
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].__id);
    }
    deserialize(ds, profile) {
        const pass = profile.get(ds.read(DataStream.Type.UInt32));
        const pipeline = profile.get(ds.read(DataStream.Type.UInt32));
        return new RcdSetPipeline([pipeline], pass);
    }
    transformArgs(args, transformer) {
        return [transformer(args[0])];
    }
}

class RcdSetVertexBuffer extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.SetVertexBuffer;
    }
    play() {
        var _a, _b;
        this.caller.__authentic.setVertexBuffer(this.args[0], this.args[1] ? this.args[1].__authentic : null, this.args[2], this.args[3]);
        if (this.args[1]) {
            const offset = (_a = this.args[2]) !== null && _a !== void 0 ? _a : 0;
            const size = (_b = this.args[3]) !== null && _b !== void 0 ? _b : this.args[1].__authentic.size - offset;
            this.caller.__runtime.vbs[this.args[0]] = {
                buffer: this.args[1],
                offset, size,
            };
        }
        else {
            delete this.caller.__runtime.vbs[this.args[0]];
        }
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.args[0]);
        seralizeOptionalUint32(ds, this.args[1] ? this.args[1].__id : null);
        seralizeOptionalUint32(ds, this.args[2]);
        seralizeOptionalUint32(ds, this.args[3]);
    }
    deserialize(ds, profile) {
        const pass = profile.get(ds.read(DataStream.Type.UInt32));
        const slot = ds.read(DataStream.Type.UInt32);
        const buffer_id = deseralizeOptionalUint32(ds);
        const buffer = buffer_id ? profile.get(buffer_id) : null;
        const offset = deseralizeOptionalUint32(ds);
        const size = deseralizeOptionalUint32(ds);
        return new RcdSetVertexBuffer([slot, buffer, offset, size], pass);
    }
    transformArgs(args, transformer) {
        return [args[0], transformer(args[1]), args[2], args[3]];
    }
}

class wgi_GPURenderPassEncoder extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPURenderPassEncoder;
    }
    constructor(next, encoder, desc) {
        super();
        this.next = next;
        this.encoder = encoder;
        this.desc = desc;
        this.__brand = "GPURenderPassEncoder";
    }
    setViewport(x, y, width, height, minDepth, maxDepth) {
        throw new Error("Method not implemented.");
    }
    setScissorRect(x, y, width, height) {
        throw new Error("Method not implemented.");
    }
    setBlendConstant(color) {
        throw new Error("Method not implemented.");
    }
    setStencilReference(reference) {
        throw new Error("Method not implemented.");
    }
    beginOcclusionQuery(queryIndex) {
        throw new Error("Method not implemented.");
    }
    endOcclusionQuery() {
        throw new Error("Method not implemented.");
    }
    executeBundles(bundles) {
        throw new Error("Method not implemented.");
    }
    end() {
        globalRecorder.processRcd(RcdEnd, this, [], () => this.next.end());
    }
    get label() { return this.next.label; }
    pushDebugGroup(groupLabel) {
        throw new Error("Method not implemented.");
    }
    popDebugGroup() {
        throw new Error("Method not implemented.");
    }
    insertDebugMarker(markerLabel) {
        throw new Error("Method not implemented.");
    }
    setBindGroup(index, bindGroup, dynamicOffsets, dynamicOffsetsDataStart, dynamicOffsetsDataLength) {
        if (dynamicOffsets instanceof Uint32Array) {
            const offsets = [];
            for (let i = 0; i < dynamicOffsetsDataLength; i++) {
                offsets.push(dynamicOffsets[i + dynamicOffsetsDataStart]);
            }
            dynamicOffsets = offsets;
        }
        globalRecorder.processRcd(RcdSetBindGroup, this, [index, bindGroup, dynamicOffsets ? Array.from(dynamicOffsets) : undefined], () => this.next.setBindGroup(index, bindGroup ? bindGroup.next : null, dynamicOffsets));
    }
    setPipeline(pipeline) {
        globalRecorder.processRcd(RcdSetPipeline, this, [pipeline], () => this.next.setPipeline(pipeline.next));
    }
    setIndexBuffer(buffer, indexFormat, offset, size) {
        globalRecorder.processRcd(RcdSetIndexBuffer, this, [buffer, indexFormat, offset, size], () => this.next.setIndexBuffer(buffer.next, indexFormat, offset, size));
    }
    setVertexBuffer(slot, buffer, offset, size) {
        globalRecorder.processRcd(RcdSetVertexBuffer, this, [slot, buffer, offset, size], () => this.next.setVertexBuffer(slot, buffer ? buffer.next : null, offset, size));
    }
    draw(...args) {
        globalRecorder.processRcd(RcdDraw, this, args, () => this.next.draw(...args));
    }
    drawIndexed(...args) {
        globalRecorder.processRcd(RcdDrawIndexed, this, args, () => this.next.drawIndexed(...args));
    }
    drawIndirect(indirectBuffer, indirectOffset) {
        throw new Error("Method not implemented.");
    }
    drawIndexedIndirect(indirectBuffer, indirectOffset) {
        throw new Error("Method not implemented.");
    }
}

class wgi_GPUCommandEncoder extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUCommandEncoder;
    }
    constructor(next, device, desc) {
        super();
        this.next = next;
        this.device = device;
        this.desc = desc;
        this.__brand = "GPUCommandEncoder";
    }
    beginRenderPass(descriptor) {
        return globalRecorder.processRcd(RcdBeginRenderPass, this, [descriptor], () => new wgi_GPURenderPassEncoder(this.next.beginRenderPass(RcdBeginRenderPass.prototype.transformArgs([descriptor], (wgi) => wgi.next)[0]), this, descriptor));
    }
    beginComputePass(descriptor) {
        throw new Error("Method not implemented.");
    }
    copyBufferToBuffer(...args) {
        return globalRecorder.processRcd(RcdCopyBufferToBuffer, this, args, () => this.next.copyBufferToBuffer(args[0].next, args[1], args[2].next, args[3], args[4]));
    }
    copyBufferToTexture(source, destination, copySize) {
        throw new Error("Method not implemented.");
    }
    copyTextureToBuffer(source, destination, copySize) {
        throw new Error("Method not implemented.");
    }
    copyTextureToTexture(...args) {
        return globalRecorder.processRcd(RcdCopyTextureToTexture, this, args, () => this.next.copyTextureToTexture(...RcdCopyTextureToTexture.prototype.transformArgs(args, wgi => wgi.next)));
    }
    clearBuffer(buffer, offset, size) {
        throw new Error("Method not implemented.");
    }
    resolveQuerySet(querySet, firstQuery, queryCount, destination, destinationOffset) {
        throw new Error("Method not implemented.");
    }
    finish(descriptor) {
        return globalRecorder.processRcd(RcdFinish, this, [descriptor], () => new wgi_GPUCommandBuffer(this.next.finish(descriptor), this));
    }
    get label() { return this.next.label; }
    pushDebugGroup(groupLabel) {
        throw new Error("Method not implemented.");
    }
    popDebugGroup() {
        throw new Error("Method not implemented.");
    }
    insertDebugMarker(markerLabel) {
        throw new Error("Method not implemented.");
    }
}

class TrackedGPUPipelineLayout extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUPipelineLayout;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUPipelineLayout);
    }
    serialize(ds) {
        serializeObject(ds, this.__snapshot);
    }
    deserialize(ds) {
        this.__initialSnapshot = deserializeObject(ds);
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = this.__initialSnapshot;
            this.__creator = (yield profile.getOrRestore(s.device, encoder));
            const layouts = [];
            for (const layoutId of s.bindGroupLayouts) {
                layouts.push(yield profile.getOrRestore(layoutId, encoder));
            }
            this.__authentic = this.__creator.__authentic.createPipelineLayout({
                label: s.label,
                bindGroupLayouts: layouts.map(layout => layout.__authentic)
            });
        });
    }
    takeSnapshotBeforeSubmit(encoder, profile) {
        var _a, _b;
        if (this.isReplayMode() && this.__initialSnapshot) {
            this.__snapshot = this.__initialSnapshot;
            return;
        }
        let desc;
        if (this.isReplayMode()) {
            desc = this.__creatorRcd.args[0];
        }
        else {
            desc = this.__authentic.desc;
        }
        this.__snapshot = {
            label: this.__authentic.label,
            device: (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.device.__id,
            bindGroupLayouts: desc.bindGroupLayouts.map((layout) => layout.__id)
        };
    }
    getDeps() {
        const deps = [this.__authentic.device];
        for (const layout of this.__authentic.desc.bindGroupLayouts) {
            deps.push(layout);
        }
        return deps;
    }
}

class wgi_GPUPipelineLayout extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUPipelineLayout;
    }
    constructor(next, device, desc) {
        super();
        this.next = next;
        this.device = device;
        this.desc = desc;
        this.__brand = "GPUPipelineLayout";
    }
    get label() { return this.next.label; }
}

class RcdSubmit extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.Submit;
    }
    play() {
        this.caller.__authentic.submit(this.args[0].map(cb => cb.__authentic));
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].length); // cb count
        for (let i = 0; i < this.args[0].length; i++) {
            ds.write(DataStream.Type.UInt32, this.args[0][i].__id); // cb
        }
    }
    deserialize(ds, profile) {
        const queue = profile.get(ds.read(DataStream.Type.UInt32));
        const cbCount = ds.read(DataStream.Type.UInt32);
        const cbs = [];
        for (let i = 0; i < cbCount; i++) {
            const cb = profile.get(ds.read(DataStream.Type.UInt32));
            cbs.push(cb);
        }
        return new RcdSubmit([cbs], queue);
    }
    transformArgs(args, transformer) {
        const transformed = [];
        for (const cb of args[0]) {
            transformed.push(transformer(cb));
        }
        return [transformed];
    }
}

class RcdWriteBuffer extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.WriteBuffer;
    }
    play() {
        this.caller.__authentic.writeBuffer(this.args[0].__authentic, this.args[1], this.args[2], this.args[3], this.args[4]);
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.args[0].__id);
        ds.write(DataStream.Type.UInt32, this.args[1]);
        ds.write(DataStream.Type.UInt32, this.args[2].byteLength);
        ds.writeChunk(this.args[2]);
        seralizeOptionalUint32(ds, this.args[3]);
        seralizeOptionalUint32(ds, this.args[4]);
    }
    deserialize(ds, profile) {
        const queue = profile.get(ds.read(DataStream.Type.UInt32));
        const buffer = profile.get(ds.read(DataStream.Type.UInt32));
        const bufferOffset = ds.read(DataStream.Type.UInt32);
        const srcBufferLength = ds.read(DataStream.Type.UInt32);
        const srcBuffer = ds.readChunk(srcBufferLength);
        const dataOffset = deseralizeOptionalUint32(ds);
        const size = deseralizeOptionalUint32(ds);
        return new RcdWriteBuffer([buffer, bufferOffset, srcBuffer, dataOffset, size], queue);
    }
    transformArgs(args, transformer) {
        return [
            transformer(args[0]),
            args[1], args[2], args[3], args[4]
        ];
    }
}

class TrackedGPUQueue extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUQueue;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUQueue);
    }
    serialize(ds) {
        serializeString(ds, this.__snapshot.label);
        ds.write(DataStream.Type.UInt32, this.__snapshot.device);
    }
    deserialize(ds) {
        const label = deserializeString(ds);
        const device_id = ds.read(DataStream.Type.UInt32);
        this.__initialSnapshot = {
            label,
            device: device_id
        };
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            this.__creator = (yield profile.getOrRestore(this.__initialSnapshot.device, encoder));
            this.__authentic = this.__creator.__authentic.queue;
            this.__authentic.label = this.__initialSnapshot.label;
        });
    }
    takeSnapshotBeforeSubmit(encoder, profile) {
        var _a, _b;
        this.__snapshot = {
            label: this.__authentic.label,
            device: (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.device.__id
        };
    }
    getDeps() {
        return [this.__authentic.device];
    }
}

class wgi_GPUQueue extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUQueue;
    }
    constructor(next, device) {
        super();
        this.next = next;
        this.device = device;
        this.__brand = "GPUQueue";
    }
    submit(commandBuffers) {
        return globalRecorder.processRcd(RcdSubmit, this, [commandBuffers], () => {
            const cbs = [];
            for (const cb of commandBuffers) {
                cbs.push(cb.next);
            }
            this.next.submit(cbs);
        });
    }
    onSubmittedWorkDone() {
        return this.next.onSubmittedWorkDone();
    }
    writeBuffer(...args) {
        globalRecorder.processRcd(RcdWriteBuffer, this, args, () => this.next.writeBuffer(args[0].next, args[1], args[2], args[3], args[4]));
    }
    writeTexture(destination, data, dataLayout, size) {
        throw new Error("Method not implemented.");
    }
    copyExternalImageToTexture(source, destination, copySize) {
        const dst = Object.assign(Object.assign({}, destination), { texture: destination.texture.next });
        this.next.copyExternalImageToTexture(source, dst, copySize);
    }
    get label() { return this.next.label; }
}

class RcdGetBindGroupLayout extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.GetBindGroupLayout;
    }
    play() {
        const pipeline = this.caller.__authentic.getBindGroupLayout(...this.args);
        this.ret.__authentic = pipeline;
        this.ret.__creator = this.caller;
        this.ret.__creatorRcd = this;
        return this.ret;
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        ds.write(DataStream.Type.UInt32, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const pipeline = profile.get(ds.read(DataStream.Type.UInt32));
        const index = ds.read(DataStream.Type.UInt32);
        const ret = profile.get(ds.read(DataStream.Type.UInt32));
        return new RcdGetBindGroupLayout([index], pipeline, ret);
    }
}

class TrackedGPURenderPipeline extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPURenderPipeline;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPURenderPipeline);
    }
    serialize(ds) {
        serializeObject(ds, this.__snapshot);
    }
    deserialize(ds) {
        this.__initialSnapshot = deserializeObject(ds);
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = this.__initialSnapshot;
            this.__creator = (yield profile.getOrRestore(this.__initialSnapshot.device, encoder));
            this.__authentic = this.__creator.__authentic.createRenderPipeline({
                label: s.label,
                layout: s.layout === "auto" ? "auto" : (yield profile.getOrRestore(s.layout, encoder)).__authentic,
                vertex: {
                    module: (yield profile.getOrRestore(s.vsModule, encoder)).__authentic,
                    entryPoint: s.vsEntryPoint,
                    constants: s.vsConstants,
                    buffers: s.vbs
                },
                fragment: s.fsModule ? {
                    module: (yield profile.getOrRestore(s.fsModule, encoder)).__authentic,
                    entryPoint: s.fsEntryPoint,
                    constants: s.fsConstants,
                    targets: s.targets
                } : undefined,
                depthStencil: s.depthStencilFormat ? {
                    depthBias: s.depthBias,
                    depthBiasClamp: s.depthBiasClamp,
                    depthBiasSlopeScale: s.depthBiasSlopeScale,
                    depthCompare: s.depthCompare,
                    depthWriteEnabled: s.depthWriteEnabled,
                    format: s.depthStencilFormat,
                    stencilBack: s.stencilBack,
                    stencilFront: s.stencilFront,
                    stencilReadMask: s.stencilReadMask,
                    stencilWriteMask: s.stencilWriteMask
                } : undefined,
                primitive: {
                    topology: s.topology,
                    cullMode: s.cullMode,
                    frontFace: s.frontFace,
                    stripIndexFormat: s.stripIndexFormat
                },
                multisample: {
                    count: s.sampleCount,
                    mask: s.sampleMask,
                    alphaToCoverageEnabled: s.alphaToCoverageEnabled
                }
            });
        });
    }
    takeSnapshotBeforeSubmit(encoder, profile) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let desc;
        if (this.isReplayMode()) {
            if (this.__initialSnapshot) {
                this.__snapshot = this.__initialSnapshot;
                return;
            }
            else {
                desc = this.__creatorRcd.args[0];
            }
        }
        else {
            desc = this.__authentic.desc;
        }
        const s = {
            label: this.__authentic.label,
            device: (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.device.__id,
            layout: desc.layout === "auto" ? "auto" : desc.layout.__id,
            vsModule: desc.vertex.module.__id,
            vsEntryPoint: desc.vertex.entryPoint,
            vsConstants: desc.vertex.constants
        };
        const vbs = [];
        if (desc.vertex.buffers) {
            for (const buffer of desc.vertex.buffers) {
                if (buffer !== null) {
                    vbs.push({
                        arrayStride: buffer.arrayStride,
                        stepMode: (_c = buffer.stepMode) !== null && _c !== void 0 ? _c : "vertex",
                        attributes: []
                    });
                    for (const attr of buffer.attributes) {
                        vbs[vbs.length - 1].attributes.push(attr);
                    }
                }
            }
        }
        s.vbs = vbs;
        if (desc.fragment) {
            s.fsModule = desc.fragment.module.__id;
            s.fsEntryPoint = desc.fragment.entryPoint;
            s.fsConstants = desc.fragment.constants;
            const targets = [];
            for (const target of desc.fragment.targets) {
                if (target) {
                    const defaultBlendComp = {
                        operation: "add",
                        srcFactor: "one",
                        dstFactor: "zero"
                    };
                    targets.push({
                        format: target.format,
                        writeMask: (_d = target.writeMask) !== null && _d !== void 0 ? _d : GPUColorWrite.ALL,
                        blend: target.blend ? {
                            alpha: Object.assign(Object.assign({}, defaultBlendComp), ((_e = target.blend.alpha) !== null && _e !== void 0 ? _e : {})),
                            color: Object.assign(Object.assign({}, defaultBlendComp), ((_f = target.blend.color) !== null && _f !== void 0 ? _f : {})),
                        } : {
                            alpha: defaultBlendComp,
                            color: defaultBlendComp,
                        }
                    });
                }
            }
            s.targets = targets;
        }
        else {
            s.targets = [];
        }
        const defaultStacilState = {
            compare: "always",
            failOp: "keep",
            depthFailOp: "keep",
            passOp: "keep"
        };
        const defaultDepthStencil = {
            depthBias: 0,
            depthBiasClamp: 0,
            depthBiasSlopeScale: 0,
            depthWriteEnabled: false,
            depthCompare: "always",
            stencilReadMask: 0xFFFFFFFF,
            stencilWriteMask: 0xFFFFFFFF,
        };
        if (desc.depthStencil) {
            const ds = Object.assign(Object.assign({}, desc.depthStencil), { format: undefined, depthStencilFormat: desc.depthStencil.format });
            Object.assign(s, defaultDepthStencil, ds);
            s.stencilBack = Object.assign(Object.assign({}, defaultStacilState), ((_g = ds.stencilBack) !== null && _g !== void 0 ? _g : {}));
            s.stencilFront = Object.assign(Object.assign({}, defaultStacilState), ((_h = ds.stencilBack) !== null && _h !== void 0 ? _h : {}));
        }
        else {
            Object.assign(s, defaultDepthStencil);
        }
        const defaultPrimive = {
            topology: "triangle-list",
            frontFace: "ccw",
            cullMode: "none"
        };
        if (desc.primitive) {
            Object.assign(s, defaultPrimive, desc.primitive);
        }
        else {
            Object.assign(s, defaultPrimive);
        }
        if (desc.multisample) {
            Object.assign(s, {
                sampleCount: (_j = desc.multisample.count) !== null && _j !== void 0 ? _j : 1,
                sampleMask: (_k = desc.multisample.mask) !== null && _k !== void 0 ? _k : 0xFFFFFFFF,
                alphaToCoverageEnabled: (_l = desc.multisample.alphaToCoverageEnabled) !== null && _l !== void 0 ? _l : false
            });
        }
        else {
            Object.assign(s, {
                sampleCount: 1,
                sampleMask: 0xFFFFFFFF,
                alphaToCoverageEnabled: false
            });
        }
        this.__snapshot = s;
    }
    getDeps() {
        const authentic = this.__authentic;
        const deps = [authentic.device, authentic.desc.vertex.module];
        if (authentic.desc.layout !== "auto") {
            deps.push(authentic.desc.layout);
        }
        if (authentic.desc.fragment) {
            deps.push(authentic.desc.fragment.module);
        }
        return deps;
    }
}

class wgi_GPURenderPipeline extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPURenderPipeline;
    }
    constructor(next, device, desc) {
        super();
        this.next = next;
        this.device = device;
        this.desc = desc;
        this.__brand = "GPURenderPipeline";
        this.bindGroupLayouts = [];
    }
    get label() { return this.next.label; }
    getBindGroupLayout(index) {
        if (this.bindGroupLayouts[index]) {
            return this.bindGroupLayouts[index];
        }
        else {
            this.bindGroupLayouts[index] = globalRecorder.processRcd(RcdGetBindGroupLayout, this, [index], () => new wgi_GPUBindGroupLayout(this.next.getBindGroupLayout(index), this, index));
            return this.bindGroupLayouts[index];
        }
    }
}

class TrackedGPUSampler extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUSampler;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUSampler);
    }
    serialize(ds) {
        serializeObject(ds, this.__snapshot);
    }
    deserialize(ds) {
        this.__initialSnapshot = deserializeObject(ds);
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = this.__initialSnapshot;
            this.__creator = (yield profile.getOrRestore(s.device, encoder));
            this.__authentic = this.__creator.__authentic.createSampler(s);
        });
    }
    takeSnapshotBeforeSubmit(encoder, profile) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        if (this.isReplayMode() && this.__initialSnapshot) {
            this.__snapshot = this.__initialSnapshot;
            return;
        }
        let desc = undefined;
        if (this.isReplayMode()) {
            desc = this.__creatorRcd.args[0];
        }
        else {
            desc = this.__authentic.desc;
        }
        desc = desc !== null && desc !== void 0 ? desc : {};
        this.__snapshot = {
            label: this.__authentic.label,
            device: (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.device.__id,
            addressModeU: (_c = desc.addressModeU) !== null && _c !== void 0 ? _c : "clamp-to-edge",
            addressModeV: (_d = desc.addressModeV) !== null && _d !== void 0 ? _d : "clamp-to-edge",
            addressModeW: (_e = desc.addressModeW) !== null && _e !== void 0 ? _e : "clamp-to-edge",
            magFilter: (_f = desc.magFilter) !== null && _f !== void 0 ? _f : "nearest",
            minFilter: (_g = desc.minFilter) !== null && _g !== void 0 ? _g : "nearest",
            mipmapFilter: (_h = desc.mipmapFilter) !== null && _h !== void 0 ? _h : "nearest",
            lodMinClamp: (_j = desc.lodMinClamp) !== null && _j !== void 0 ? _j : 0,
            lodMaxClamp: (_k = desc.lodMaxClamp) !== null && _k !== void 0 ? _k : 0,
            compare: desc.compare,
            maxAnisotropy: (_l = desc.maxAnisotropy) !== null && _l !== void 0 ? _l : 1
        };
    }
    getDeps() {
        return [this.__authentic.device];
    }
}

class wgi_GPUSampler extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUSampler;
    }
    constructor(next, device, desc) {
        super();
        this.next = next;
        this.device = device;
        this.desc = desc;
        this.__brand = "GPUSampler";
    }
    get label() { return this.next.label; }
    ;
}

var ShaderMessageType;
(function (ShaderMessageType) {
    ShaderMessageType[ShaderMessageType["info"] = 0] = "info";
    ShaderMessageType[ShaderMessageType["warning"] = 1] = "warning";
    ShaderMessageType[ShaderMessageType["error"] = 2] = "error";
})(ShaderMessageType || (ShaderMessageType = {}));
class TrackedGPUShaderModule extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUShaderModule;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUShaderModule);
    }
    serialize(ds) {
        const s = this.__snapshot;
        serializeString(ds, s.label);
        ds.write(DataStream.Type.UInt32, s.device);
        serializeString(ds, s.src);
        ds.write(DataStream.Type.UInt32, s.messages.length);
        for (const msg of s.messages) {
            ds.write(DataStream.Type.UInt32, msg.type);
            serializeString(ds, msg.content);
        }
    }
    deserialize(ds) {
        const label = deserializeString(ds);
        const device_id = ds.read(DataStream.Type.UInt32);
        const src = deserializeString(ds);
        const msgCount = ds.read(DataStream.Type.UInt32);
        const messages = [];
        for (let i = 0; i < msgCount; i++) {
            const type = ds.read(DataStream.Type.UInt32);
            const content = deserializeString(ds);
            messages.push({
                type, content
            });
        }
        this.__initialSnapshot = {
            label, device: device_id,
            src, messages
        };
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = this.__initialSnapshot;
            this.__creator = yield profile.getOrRestore(s.device, encoder);
            this.__authentic = this.__creator.__authentic.createShaderModule({
                label: s.label,
                code: s.src
            });
        });
    }
    takeSnapshotBeforeSubmit(encoder) { }
    takeSnapshotAfterSubmit() {
        var _a, _b, _c, _d;
        return __awaiter(this, void 0, void 0, function* () {
            const { messages: rawMessages } = yield this.__authentic.getCompilationInfo();
            const messages = [];
            for (const raw of rawMessages) {
                const type = ShaderMessageType[raw.type];
                const content = `[line ${raw.lineNum}: column ${raw.linePos}]\n${raw.message}`;
                messages.push({
                    type, content
                });
            }
            this.__snapshot = {
                label: this.__authentic.label,
                device: (_b = (_a = this.__creator) === null || _a === void 0 ? void 0 : _a.__id) !== null && _b !== void 0 ? _b : this.__authentic.device.__id,
                src: this.isReplayMode() ? ((_d = (_c = this.__initialSnapshot) === null || _c === void 0 ? void 0 : _c.src) !== null && _d !== void 0 ? _d : this.__creatorRcd.args[0].code) : this.__authentic.desc.code,
                messages
            };
        });
    }
    getDeps() {
        return [this.__authentic.device];
    }
}

class wgi_GPUShaderModule extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUShaderModule;
    }
    constructor(next, device, desc) {
        super();
        this.next = next;
        this.device = device;
        this.desc = desc;
        this.__brand = "GPUShaderModule";
    }
    getCompilationInfo() {
        return this.next.getCompilationInfo();
    }
    get label() { return this.next.label; }
}

class RcdCreateView extends RcdBase {
    constructor() {
        super(...arguments);
        this.__kind = RecordKind.CreateView;
    }
    play() {
        const view = this.caller.__authentic.createView(...this.args);
        this.ret.__authentic = view;
        this.ret.__creator = this.caller;
        this.ret.__creatorRcd = this;
        return this.ret;
    }
    serialize(ds) {
        ds.write(DataStream.Type.UInt32, this.caller.__id);
        serializeObject(ds, this.args[0]);
        ds.write(DataStream.Type.UInt32, this.ret.__id);
    }
    deserialize(ds, profile) {
        const texture = profile.get(ds.read(DataStream.Type.UInt32));
        const desc = deserializeObject(ds);
        const ret = profile.get(ds.read(DataStream.Type.UInt32));
        return new RcdCreateView([desc], texture, ret);
    }
}

class TrackedGPUTextureView extends TrackedBase {
    constructor() {
        super(...arguments);
        this.__kind = brandMap.GPUTextureView;
    }
    fromAuthentic(authentic) {
        return this.fastFromAuthentic(authentic, TrackedGPUTextureView);
    }
    serialize(ds) {
        const s = this.__snapshot;
        serializeString(ds, s.label);
        ds.write(DataStream.Type.UInt32, s.texture);
        ds.write(DataStream.Type.UInt32, s.arrayLayerCount);
        serializeString(ds, s.aspect);
        ds.write(DataStream.Type.UInt32, s.baseArrayLayer);
        ds.write(DataStream.Type.UInt32, s.baseMipLevel);
        serializeString(ds, s.dimension);
        serializeString(ds, s.format);
        ds.write(DataStream.Type.UInt32, s.mipLevelCount);
    }
    deserialize(ds) {
        const label = deserializeString(ds);
        const texture_id = ds.read(DataStream.Type.UInt32);
        const arrayLayerCount = ds.read(DataStream.Type.UInt32);
        const aspect = deserializeString(ds);
        const baseArrayLayer = ds.read(DataStream.Type.UInt32);
        const baseMipLevel = ds.read(DataStream.Type.UInt32);
        const dimension = deserializeString(ds);
        const format = deserializeString(ds);
        const mipLevelCount = ds.read(DataStream.Type.UInt32);
        this.__initialSnapshot = {
            label, texture: texture_id, arrayLayerCount,
            aspect: aspect,
            baseArrayLayer, baseMipLevel,
            dimension: dimension,
            format: format, mipLevelCount
        };
    }
    restore(profile, encoder) {
        return __awaiter(this, void 0, void 0, function* () {
            const s = this.__initialSnapshot;
            this.__creator = yield profile.getOrRestore(s.texture, encoder);
            this.__authentic = this.__creator.__authentic.createView(s);
        });
    }
    takeSnapshotBeforeSubmit(encoder, profile) {
        var _a, _b, _c, _d, _e, _f;
        let texture_id;
        let texture;
        let desc;
        if (profile) {
            if (this.__initialSnapshot) {
                this.__snapshot = this.__initialSnapshot;
                return;
            }
            texture = this.__creator.__authentic;
            texture_id = this.__creator.__id;
            desc = (_a = this.__creatorRcd.args[0]) !== null && _a !== void 0 ? _a : {};
        }
        else {
            texture = this.__authentic.texture;
            texture_id = texture.__id;
            desc = (_b = this.__authentic.desc) !== null && _b !== void 0 ? _b : {};
        }
        const baseArrayLayer = (_c = desc.baseArrayLayer) !== null && _c !== void 0 ? _c : 0;
        let dimension = desc.dimension;
        if (!dimension) {
            if (texture.dimension === "1d") {
                dimension = "1d";
            }
            else if (texture.dimension === "2d" && texture.depthOrArrayLayers === 1) {
                dimension = "2d";
            }
            else if (texture.dimension === "2d" && texture.depthOrArrayLayers > 1) {
                dimension = "2d-array";
            }
            else if (texture.dimension === "3d") {
                dimension = "3d";
            }
        }
        let arrayLayerCount = desc.arrayLayerCount;
        if (!arrayLayerCount) {
            if (["1d", "2d", "3d"].includes(dimension)) {
                arrayLayerCount = 1;
            }
            else if (dimension === "cube") {
                arrayLayerCount = 6;
            }
            else {
                arrayLayerCount = texture.depthOrArrayLayers - baseArrayLayer;
            }
        }
        const aspect = (_d = desc.aspect) !== null && _d !== void 0 ? _d : "all";
        let format = desc.format;
        if (!format) {
            if (aspect === "depth-only") {
                if (texture.format === "depth24plus-stencil8") {
                    format = "depth24plus";
                }
                else if (texture.format === "depth32float-stencil8") {
                    format = "depth32float";
                }
            }
            else if (aspect === "stencil-only") {
                if (texture.format === "depth24plus-stencil8") {
                    format = "stencil8";
                }
                else if (texture.format === "depth32float-stencil8") {
                    format = "stencil8";
                }
            }
            else {
                format = texture.format;
            }
        }
        const baseMipLevel = (_e = desc.baseMipLevel) !== null && _e !== void 0 ? _e : 0;
        this.__snapshot = {
            label: this.__authentic.label,
            texture: texture_id,
            arrayLayerCount,
            aspect,
            baseArrayLayer,
            baseMipLevel,
            dimension,
            format,
            mipLevelCount: (_f = desc.mipLevelCount) !== null && _f !== void 0 ? _f : texture.mipLevelCount - baseMipLevel
        };
    }
    getDeps() {
        return [this.__authentic.texture];
    }
}

class wgi_GPUTextureView extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUTextureView;
    }
    constructor(next, texture, desc) {
        super();
        this.next = next;
        this.texture = texture;
        this.desc = desc;
        this.__brand = "GPUTextureView";
    }
    get label() { return this.next.label; }
}

class wgi_GPUTexture extends wgi_GPUBase {
    getTrackedType() {
        return TrackedGPUTexture;
    }
    constructor(next, device, canvasId) {
        super();
        this.next = next;
        this.device = device;
        this.canvasId = canvasId;
        this.__brand = "GPUTexture";
        this.realUsage = 0;
        if (canvasId) {
            this.realUsage = next.usage;
        }
    }
    get isCanvas() { return this.canvasId !== undefined; }
    createView(descriptor) {
        return globalRecorder.processRcd(RcdCreateView, this, [descriptor], () => new wgi_GPUTextureView(this.next.createView(descriptor), this, descriptor));
    }
    destroy() {
        this.next.destroy();
    }
    get width() { return this.next.width; }
    get height() { return this.next.height; }
    get depthOrArrayLayers() { return this.next.depthOrArrayLayers; }
    get mipLevelCount() { return this.next.mipLevelCount; }
    get sampleCount() { return this.next.sampleCount; }
    get dimension() { return this.next.dimension; }
    get format() { return this.next.format; }
    get usage() { return this.realUsage === 0 ? this.next.usage : this.realUsage; }
    get label() { return this.next.label; }
}

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
        // Just use the first device created to construct global recorder.
        createGlobalRecorder(this);
        // create queue
        this._queue = new wgi_GPUQueue(this.next.queue, this);
    }
    get features() {
        return this.next.features;
    }
    get limits() {
        return this.next.limits;
    }
    get queue() {
        return this._queue;
    }
    destroy() {
        throw new Error("Method not implemented.");
    }
    debugRes(res) {
        return globalRecorder.processRcd(RcdDebugRes, undefined, [{ res }], () => { });
    }
    createBuffer(descriptor) {
        return globalRecorder.processRcd(RcdCreateBuffer, this, [descriptor], () => new wgi_GPUBuffer(this.next.createBuffer(Object.assign(Object.assign({}, descriptor), { usage: descriptor.usage | GPUBufferUsage.COPY_SRC })), this, descriptor));
    }
    createTexture(descriptor) {
        return globalRecorder.processRcd(RcdCreateTexture, this, [descriptor], () => {
            const tex = new wgi_GPUTexture(this.next.createTexture(Object.assign(Object.assign({}, descriptor), { usage: descriptor.usage | GPUTextureUsage.COPY_SRC })), this);
            tex.realUsage = descriptor.usage;
            return tex;
        });
    }
    createSampler(descriptor) {
        return globalRecorder.processRcd(RcdCreateSampler, this, [descriptor], () => new wgi_GPUSampler(this.next.createSampler(descriptor), this, descriptor));
    }
    importExternalTexture(descriptor) {
        throw new Error("Method not implemented.");
    }
    createBindGroupLayout(descriptor) {
        return globalRecorder.processRcd(RcdCreateBindGroupLayout, this, [descriptor], () => new wgi_GPUBindGroupLayout(this.next.createBindGroupLayout(descriptor), this, descriptor));
    }
    createPipelineLayout(descriptor) {
        return globalRecorder.processRcd(RcdCreatePipelineLayout, this, [descriptor], () => new wgi_GPUPipelineLayout(this.next.createPipelineLayout(RcdCreatePipelineLayout.prototype.transformArgs([descriptor], wgi => wgi.next)[0]), this, descriptor));
    }
    createBindGroup(descriptor) {
        return globalRecorder.processRcd(RcdCreateBindGroup, this, [descriptor], () => new wgi_GPUBindGroup(this.next.createBindGroup(RcdCreateBindGroup.prototype.transformArgs([descriptor], wgi => wgi.next)[0]), this, descriptor));
    }
    createShaderModule(descriptor) {
        return globalRecorder.processRcd(RcdCreateShaderModule, this, [descriptor], () => new wgi_GPUShaderModule(this.next.createShaderModule(descriptor), this, descriptor));
    }
    createComputePipeline(descriptor) {
        throw new Error("Method not implemented.");
    }
    createRenderPipeline(descriptor) {
        return globalRecorder.processRcd(RcdCreateRenderPipeline, this, [descriptor], () => new wgi_GPURenderPipeline(this.next.createRenderPipeline(RcdCreateRenderPipeline.prototype.transformArgs([descriptor], wgi => wgi.next)[0]), this, descriptor));
    }
    createComputePipelineAsync(descriptor) {
        throw new Error("Method not implemented.");
    }
    createRenderPipelineAsync(descriptor) {
        throw new Error("Method not implemented.");
    }
    createCommandEncoder(descriptor) {
        return globalRecorder.processRcd(RcdCreateCommandEncoder, this, [descriptor], () => new wgi_GPUCommandEncoder(this.next.createCommandEncoder(descriptor), this, descriptor));
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

class wgi_GPUCanvasContext {
    constructor(next, canvasId) {
        this.next = next;
        this.canvasId = canvasId;
        this.__brand = "GPUCanvasContext";
    }
    get canvas() { return this.next.canvas; }
    configure(configuration) {
        this._configuration = configuration;
        this.next.configure(Object.assign(Object.assign({}, configuration), { device: configuration.device.next }));
    }
    unconfigure() {
        this._configuration = undefined;
        this.next.unconfigure();
    }
    getCurrentTexture() {
        if (this._configuration) {
            if (this.wgiTexture) {
                return this.wgiTexture;
            }
            else {
                const tex = this.next.getCurrentTexture();
                return new wgi_GPUTexture(tex, this._configuration.device, this.canvasId);
            }
        }
        else {
            this.next.getCurrentTexture();
            throw "wgi_error: CanvasContext not configured.";
        }
    }
}

function inject() {
    // gpu
    Object.defineProperty(globalThis.navigator, "gpu", {
        value: new wgi_GPU(globalThis.navigator.gpu)
    });
    // raf
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
    // canvas
    const _getContext = HTMLCanvasElement.prototype.getContext;
    function getContext(contextId) {
        if (contextId === "webgpu") {
            const realContext = _getContext.call(this, contextId);
            if (realContext === null)
                return null;
            return new wgi_GPUCanvasContext(realContext, this.id);
        }
        else {
            return _getContext.call(this, contextId);
        }
    }
    HTMLCanvasElement.prototype.getContext = getContext;
    console.log("wgi injected!");
}
function startCapture() {
    globalRecorder.capture();
}

console.log("wgi plugin injecting...");
inject();
window.startCapture = startCapture;
