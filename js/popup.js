function getTimeElapsedString(timeElapsed) {
	if (timeElapsed < 60) { // Secs
		return String(Math.trunc(timeElapsed)) + 's';
	} else if (timeElapsed < 3600) { // Mins
		return String(Math.trunc(timeElapsed/60)) + 'm';
	} else if (timeElapsed < 86400) { // Hours
		return String(Math.trunc(timeElapsed/3600)) + 'hr';
	} else if (timeElapsed < 2592000) { // Days
		return String(Math.trunc(timeElapsed/86400)) + 'd';
	} else if (timeElapsed < 31556952) { // Months
		return String(Math.trunc(timeElapsed/2592000)) + 'mnth';
	} else { // Years
		return String(Math.trunc(timeElapsed/31556952)) + 'yr';
	}
}

var pinButton = document.getElementById("pin-button");
var returnButton = document.getElementById("return-button");
var clearButton = document.getElementById("clear-button");

pinButton.onclick = function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.executeScript(
			tabs[0].id,
			{file: 'js/pin.js'}
		);
		var timeBadge = document.getElementById("time-badge");
		timeBadge.textContent = "0s";
		timeBadge.classList.add("badge-success");
		timeBadge.classList.remove("badge-secondary");
	});
};

returnButton.onclick = function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.storage.sync.get(String(tabs[0].url), function(result) {
			console.log(result[Object.keys(result)[0]]);
			chrome.tabs.executeScript(
				tabs[0].id,
				{code: 'window.scrollTo(0, ' + String(result[Object.keys(result)[0]].pos) + ');'});
		});
	});
};

clearButton.onclick = function() {
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.storage.sync.remove(String(tabs[0].url));
		var timeBadge = document.getElementById("time-badge");
		timeBadge.textContent = "None";
		timeBadge.classList.add("badge-secondary");
		timeBadge.classList.remove("badge-success");
	});
};

// Setup url container
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	chrome.storage.sync.get(String(tabs[0].url), function(result) {
		var currentTabUrl = tabs[0].url;
		if (typeof result[Object.keys(result)[0]] == 'undefined') {
			var content =	'<div id="url" class="col" style="word-wrap: break-word;">' + currentTabUrl + 
								' <span class="badge badge-secondary" id="time-badge">None</span>' + 
							"</div>";
			$("#url-container").html( content );
		} else {
			var timeElapsed = Date.now() - result[Object.keys(result)[0]].date;
			timeElapsed = timeElapsed/1000;

			var content =	'<div id="url" class="col" style="word-wrap: break-word;">' + currentTabUrl + 
								' <span class="badge badge-success" id="time-badge">' + getTimeElapsedString(timeElapsed) + '</span>' + 
							"</div>";
			$("#url-container").html( content );
		}
		
	});
});