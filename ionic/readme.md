
## Configure

1. go to `src` -> `app` -> `home` -> `watson.config.ts` and add,

 - IAM url
 - Watson Tone analyzer credentials (get it from service)

 2. go to `src` -> `app` -> `home` -> `watson.messages.ts` and add message for each tone ids

 ### Code

  Find the code for accessing the TOne Analyzer in `watsonToneAnalyzer.service.ts`.

  To invoke the action,

  ```TypeScript
  import { watsonToneAnalyzer } from './watsonToneAnalyzer.service'

   this.WatsonToneAnalyzer.analyzeToneOnGivenText(this.textValue).subscribe((data) => {
        console.log(data);
      }, (error) => {
        console.log(error)
      })
  ```