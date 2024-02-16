import inject, { startCapture } from "../../output/wgi.mjs";

console.log("wgi plugin injecting...");
inject();
window.startCapture = startCapture;

