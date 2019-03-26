let button = document.getElementById('getPosition');

button.onclick = function(element) {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		var currentTab = tabs[0];
		console.log(currentTab);
		chrome.tabs.executeScript(currentTab.id, {
			file: 'setYPos.js'
		});
	});
};