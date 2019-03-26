chrome.commands.onCommand.addListener(function(command) {
	console.log('Command: ', command);
	if (command == "save_yPos") {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var currentTab = tabs[0];
			chrome.tabs.executeScript(currentTab.id, {
				file: 'setYPos.js'
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

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	if (sender.tab) {
		if (request.messageType == "Set Position") {
			var currentTabId = sender.tab.id;
			var yPos = request.yPos;
			console.log(currentTabId + " has yPos: " + yPos);
			var obj = {};
			obj[currentTabId] = yPos;
			chrome.storage.sync.set(obj);
		}
	}
});

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