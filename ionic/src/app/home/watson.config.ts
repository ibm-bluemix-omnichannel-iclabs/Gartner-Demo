export class WatsonConfig  {

    public static iamAuth = {
        iamJson:{
            iamLink:"https://iam.bluemix.net/identity/token",
            iamtype:"urn:ibm:params:oauth:grant-type:apikey"
        }
    }
    public static watsonAuth = {
        watsonToneAnalyzer:{
            apikey: "********",
            baseLink: "https://gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=",
            version_date: "2017-09-21"
        },
    }
    public  constructor() {
    }
}