// Method 1
// function getValue(callback) {
// 	chrome.storage.sync.get(['yPos'], callback);
// }

// getValue(function (value) {
// 	console.log('yPos value currently is ' + yPos);
// 	window.scrollTo(0, yPos);
// })

// Method 2
chrome.runtime.sendMessage({messageType: "Get Position"}, function(response) {
	console.log("Response from background.js: " + response.yPos);
});