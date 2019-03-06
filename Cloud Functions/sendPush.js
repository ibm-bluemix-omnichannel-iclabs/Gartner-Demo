var request = require('request');
var openwhisk = require('openwhisk');
function main(params) {

	
    var whisk = openwhisk();
    const PushActionsName = 'push-notifications/send-message'

    
    var apiKey = "Push service API Key";
    var appId = "Push Service App GUID";
    var apiHost = "Push service region"
    
    const blocking = true, result = true
    const paramsJson = {
        appId:appId,
        apikey:apiKey,
        apiHost:apiHost,
        messageText:params.message
    };
    
    return whisk.actions.invoke({PushActionsName, blocking, result,params:paramsJson});
}