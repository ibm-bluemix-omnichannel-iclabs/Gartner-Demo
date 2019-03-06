
1. Create push package in your org by following this [doc](https://cloud.ibm.com/docs/openwhisk?topic=cloud-functions-push-notifications-package#push-notifications-package)

2. Then create an new push service action and add the code from `sendPush.js`.

3. Add values for `apiKey`, `appId` and `apiHost`. For example the api host for,
    - US Dallas -> `imfpush.ng.bluemix.net`
    - UK -> `imfpush.eu-gb.bluemix.net`

4. While calling the cloud functions action pass the parameter with a key `message` and a value string for the push message.


