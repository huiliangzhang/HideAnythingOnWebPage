var syncContentScript = function(settings){
	chrome.runtime.sendMessage(settings);
}

var settings;
var clickRunning = function() {
	if(settings.running == document.runningForm.running.value)
	{
		return;
	}
	settings.running = document.runningForm.running.value;	
	settings.titleName = document.titleNameForm.titleName.value;	
	updateUI();
	
	syncContentScript(settings);
}

var updateUI = function() {
	if(settings.running == 'off')
	{
		document.getElementById('helpSection').className = 'disabled';
	}
	else
	{
		document.getElementById('helpSection').className = '';
	}
}

document.addEventListener('DOMContentLoaded', function() {	
	chrome.runtime.sendMessage({messageType: "askSettings"}, function(response) {
		settings = response;

		document.getElementById('activationKey').value = settings.activationKey;	
		document.getElementById('activationKey').onchange = function(){
			settings.activationKey = document.getElementById('activationKey').value;
			syncContentScript(settings);
		};

		document.runningForm.running.value = settings.running;	
		for(var i=0; i<document.runningForm.running.length; i++)
		{
			document.runningForm.running[i].onclick = clickRunning;
		}
		
		if(settings.titleName)
		{
			document.titleNameForm.titleName.value = settings.titleName;	
		}
		document.titleNameForm.titleName.onchange = function(){
			settings.titleName = document.titleNameForm.titleName.value;
			syncContentScript(settings);
		}
		
		updateUI();
		
	});	
});
