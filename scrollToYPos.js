function getValue(callback) {
	chrome.storage.sync.get(['yPos'], callback);
}

getValue(function (value) {
	console.log('yPos value currently is ' + yPos);
	window.scrollTo(0, yPos);
})