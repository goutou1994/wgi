import inject, { testStartCapture } from "./wgi.mjs";

console.log("wgi plugin injecting...");
inject();
window.testStartCapture = testStartCapture;

// window.chrome.runtime.onMessage.addListener(function(message) {
//     var action = message.action;
//     console.log(message);
    
//     if (action === "wgi_capture") {
//         testStartCapture();
//     }
// });
