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
			var currentTab = tabs[0];
			chrome.tabs.executeScript(currentTab.id, {
				file: 'scrollToYPos.js'
			});
		});

	}
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	console.log(sender.tab ?
				"from a content script: " + sender.tab.url :
				"from the extension:");
	console.log(request);
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