/*
 * Orion Snippets plugin
 * Authors: Bartosz Polaczyk, Miłosz Lewandowski
 * Created during the Orion/Google Hackathon 2012, Cracow, Poland.
 */

// Initialize OS namespace
var OS$ = OS$ || {};
OS$.connectors = [];

OS$._buttonService = "orion.edit.command";

OS$._defaultCallback = function(result) {
	if (result.status === false) {
		OS$._error(result.error);
	}
};

OS$._entity = function(text) {
	return encodeURIComponent(text);
};

OS$._error = function(message){
	alert(message);
};

OS$.init = function(){
	//load dependencies if needed
	var connectorsNumber = OS$.enabledConnectors.length;
	var requiredFiles=[];
	for (var i = 0; i <connectorsNumber; i++) {
		var connectorEntry = OS$.enabledConnectors[i];
		if(connectorEntry.id !== undefined && !OS$.connectors[connectorEntry.id] &&
		   requiredFiles.indexOf("lib/connectors/"+connectorEntry.id) === -1){
			//this js is not included. Add to a arryay of requirements
			requiredFiles.push("lib/connectors/"+connectorEntry.id);
		}
	}
	if(requiredFiles.length > 0){
		require(requiredFiles, function() {
				//callback of required .js files
				OS$._init();
			});
	}else{
		//no dependencies
		OS$._init();
	}
};

OS$._init = function() {
	var headers = {
		name: "Orion Snippets",
		version: "1.0",
		description: "Share your snippets to various services."
	};
	var provider = new orion.PluginProvider(headers);
	var connectorsNumber = OS$.enabledConnectors.length;
	for (var i = 0; i < connectorsNumber; i++) {
		try {
			var connectorEntry = OS$.enabledConnectors[i];
			var connector = OS$.connectors[connectorEntry.id];
			var settings = connectorEntry.settings;
			if (connectorEntry.settings === undefined) {
				settings = connector.defaultSettings;
			}
			if (connector !== undefined) {
				provider.registerService(
					OS$._buttonService, 
					{
						run: function(text) {
							connector.run(text, OS$._defaultCallback);
						}
					}, 
					{name: settings.buttonText, key: settings.key});
			}	
		} catch(e) {
			if (OS$.enabledConnectors[i] && OS$.enabledConnectors[i].id) {
				OS$._error("Incorrect connector: "+ OS$.enabledConnectors[i].id);
			} else {
				OS$._error("Incorrect connector at "+i);
			}
		}
	}
		
	provider.connect();
};

window.onload = function() {
	OS$.init();
};
