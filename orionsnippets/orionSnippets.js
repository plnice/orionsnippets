// Initialize OS namespace
var OS$ = {};
OS$.connectors = [];

OS$._buttonService = "orion.edit.command";

OS$._defaultCallback = function(result) {
	if (result.status === false) {
		alert(result.error);
	}
};

OS$.init = function() {
	var headers = {
		name: "Orion Snippets",
		version: "1.0",
		description: "Share your snippets to various services."
	};
	var provider = new orion.PluginProvider(headers);
	
	for (var i = 0; i < OS$.enabledConnectors.length; i++) {
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
	}
		
	provider.connect();
};

window.onload = function() {
	OS$.init();
};