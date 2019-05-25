// Key Commands -- Need updating
chrome.commands.onCommand.addListener(function(command) {
	console.log('Command: ', command);
	if (command == "save_yPos") {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var currentTab = tabs[0];
			chrome.tabs.executeScript(currentTab.id, {
				file: 'pin.js'
			});
		});
	} else if (command == "return_yPos") {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.storage.sync.get(String(tabs[0].id), function(result) {
				console.log(result[Object.keys(result)[0]]);
				chrome.tabs.executeScript(
					tabs[0].id,
					{code: 'window.scrollTo(0, ' + String(result[Object.keys(result)[0]]) + ');'});
			});
		});
	} else if (command == "test_tab") {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			console.log(tabs[0]);
		});
	}
});

// Messages - Set Position and Date (value) for URL (key)
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (sender.tab) {
		if (request.messageType == "Position") {
			var currentTabUrl = sender.tab.url;
			var currentTabTitle = sender.tab.title;
			// Date
			var now = Date.now();
			// Pos
			var pos = request.pos;
			var obj = {};
			obj[currentTabUrl] = {pos: pos, date: now, title: currentTabTitle};
			chrome.storage.sync.set(obj);
		}
	}
});

// For testing
chrome.storage.onChanged.addListener(function(changes, namespace) {
	for (var key in changes) {
		var storageChange = changes[key];
		console.log('Storage key "%s" in namespace "%s" changed. ' +
					'Old value was "%s", new value is "%s".',
					key,
					namespace,
					storageChange.oldValue,
					storageChange.newValue);
	}
});