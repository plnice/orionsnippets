/*
 * Orion Snippets plugin
 * Google+ Connector
 * Authors: Bartosz Polaczyk, Miłosz Lewandowski
 * Created during the Orion/Google Hackathon 2012, Cracow, Poland.
 */

OS$.connectors.googleplusConnector = {
	id: "googlePlusConnector",
	run: function(text, callback) {
		var result = {status: true};
		if (text !== "") {
			// Run window with Google+ composer
			var url = OS$.connectors.googleplusConnector._url+OS$._entity(text);
			window.open(url, "_blank", "width=300,height=100");
		} else {
			result.status = false;
			result.error = "Empty selection.";
		}
		callback(result);
	},
	defaultSettings: {
		buttonText: "Share selection to Google+",
		key: ["g", true, true]
	},
	_url: "https://m.google.com/app/plus/x/?v=compose&content="
};