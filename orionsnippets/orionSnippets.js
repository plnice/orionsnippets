var buttonService = "orion.edit.command";
var buttonServiceProperties = {name: "Share Snippet",
		key: ["s",true,true]};
var buttonServiceImpl = {
	run: function(text) {
		alert("Hello World");
		console.log(GooglePlusAPI);
	}
};

window.onload = function() {
	var headers = {
		name: "Orion Snippets",
		version: "1.0",
		description: "Share your snippets to various services."
	};
	var provider = new orion.PluginProvider(headers);
	provider.registerService(buttonService, buttonServiceImpl, 
		buttonServiceProperties);
	provider.connect();
};