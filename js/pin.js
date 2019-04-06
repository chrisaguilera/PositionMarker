var pos = window.pageYOffset;
chrome.runtime.sendMessage({messageType: "Position", pos: pos});