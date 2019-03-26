// Method 1 - One global yPos
// var yPos = window.pageYOffset;

// chrome.storage.sync.set({yPos: yPos}, function() {
// 	console.log('Value is set to ' + yPos);
// });

// Method 2 - yPos per tab
var yPos = window.pageYOffset;
chrome.runtime.sendMessage({messageType: "Set Position", yPos: yPos});