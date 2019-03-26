var yPos = window.pageYOffset;

chrome.storage.sync.set({yPos: yPos}, function() {
	console.log('Value is set to ' + yPos);
});