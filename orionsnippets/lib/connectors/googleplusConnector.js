OS$.connectors["googleplusConnector"] = {
	id: "googlePlusConnector",
	run: function(text, callback) {
		var result = {status: true};
		if (text !== "") {
			// TODO run window with Google+ composer
			alert(text);
		} else {
			result.status = false;
			result.error = "Empty selection.";
		}
		callback(result);
	},
	defaultSettings: {
		buttonText: "Share selection to Google+",
		key: ["g", true, true]
	}
};