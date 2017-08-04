var syncContentScript = function() {
	chrome.tabs.query({currentWindow: true}, function(tabs) {
	  tabs.forEach(function(x){
		chrome.tabs.sendMessage(x.id, settings);		
	  });
	});	
}

var settings = {running: 'on', activationKey: 'shift'};
if(localStorage.running === 'on' || localStorage.running === 'off')
{
	settings.running = localStorage.running;
}
if(localStorage.activationKey === 'shift' || localStorage.activationKey === 'control' || localStorage.activationKey === 'alt')
{
	settings.activationKey = localStorage.activationKey;
}
syncContentScript();

var changeIcon = function() {
	if(settings.running == 'on')
	{
		chrome.browserAction.setIcon({path: 'on.png'});
	}
	else
	{
		chrome.browserAction.setIcon({path: 'off.png'});
	}
}
changeIcon();

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	if(request.messageType === 'askSettings')
	{
      	sendResponse(settings);
	}
	else
	{
		settings = request;
		localStorage.running = settings.running;
		localStorage.activationKey = settings.activationKey;
		changeIcon();		
		syncContentScript();
	}	
});