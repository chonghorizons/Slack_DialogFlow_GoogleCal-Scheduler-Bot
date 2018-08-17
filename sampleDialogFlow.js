// https://github.com/dialogflow/dialogflow-fulfillment-nodejs#quick-start
// Above is wrong... above is fulfillment model, which is about creating an IN route and OUT callback. Something like a message passing and webhook model.

// The client based version is:
// https://github.com/dialogflow/dialogflow-nodejs-client-v2#quickstart
//


if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw Error('Need environment variable, GOOGLE_APPLICATION_CREDENTIALS, check source env.sh');
}


// You can find your project ID in your Dialogflow agent settings
const projectId = 'kevhowbot'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


export default function queryDialogFlowPromise(query) {
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: languageCode,
      },
    },
  };

  return sessionClient.detectIntent(request)
}

//SAMPLE
// Send request and log result
queryDialogFlowPromise('remind me to brush my teeth on friday')
.then((responses) => {
  console.log('Response received for detect intent');
  const result = responses[0].queryResult;
  console.log(`  Query: ${result.queryText}`);
  console.log(`  Response: ${result.fulfillmentText}`);
  //console.log('resultRaw', result);
  if (result.intent) {
    console.log(`  Intent: ${result.intent.displayName}`);
  } else {
    console.log(`  No intent matched.`);
  }
  if (result.parameters && result.parameters.fields) {
    console.log(`  Paremeters.Fields: `);
    Object.keys(result.parameters.fields).forEach((key) => {
      console.log(`key *** ${key} *** has contents:`);
      console.log(result.parameters.fields[key]);
    })
  } else {
    console.log(`  No paremeter.fields matched.`);
  }
})
.catch(err => {
  console.error('ERROR:', err);
});
