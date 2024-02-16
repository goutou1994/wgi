function sendMessage(message) {
    try {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) { 
            chrome.tabs.sendMessage(tabs[0].id, message, function(response) { }); 
        });
    }
    catch (e) {
        // Tab has probably been closed.
    }
};

document.getElementById("capture-button").onclick = function handleCapture() {
    console.log("wgi capturing...");
    sendMessage({ 
        action: "wgi_capture"
    });
};
