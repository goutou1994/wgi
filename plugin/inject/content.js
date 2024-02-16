function insertHeaderNode(node) {
    var targets = [document.body, document.head, document.documentElement];
    for (var n = 0; n < targets.length; n++) {
        var target = targets[n];
        if (target) {
            if (target.firstElementChild) {
                target.insertBefore(node, target.firstElementChild);
            } else {
                target.appendChild(node);
            }
            break;
        }
    }
};

const scriptNode = document.createElement('script');
scriptNode.type = 'text/javascript';
const url = chrome.runtime.getURL('/inject/injectScript.js')
scriptNode.src = url;
insertHeaderNode(scriptNode);

document.addEventListener("wgi_capture", function() {
    const scriptNode = document.createElement('script');
    scriptNode.type = 'text/javascript';
    const url = chrome.runtime.getURL('/inject/capture.js')
    scriptNode.src = url;
    document.body.append(scriptNode);
});

chrome.runtime.onMessage.addListener(function(message, sender) {
    if (message.action === 'wgi_capture') {
        document.dispatchEvent(new CustomEvent("wgi_capture"));
    }
});