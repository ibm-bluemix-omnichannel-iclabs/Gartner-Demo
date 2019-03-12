var request = require('request');
var openwhisk = require('openwhisk');
function main(params) {

	
    var response = {};
    var whisk = openwhisk();
    var apiKey = "Push service API Key";
    var appId = "Push Service App GUID";
    var apiHost = "Push service region"

    
    const name = 'push-notifications/send-message'
    const blocking = true, result = true
    const paramsJson = {
        appId:appId,
        apikey:apiKey,
        messageText:params.message,
        apiHost:apiHost
    };
    
    return whisk.actions.invoke({name, blocking, result,params:paramsJson});    
}