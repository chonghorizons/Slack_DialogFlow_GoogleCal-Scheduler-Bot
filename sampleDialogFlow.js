// https://github.com/dialogflow/dialogflow-fulfillment-nodejs#quick-start
// Above is wrong... this is fulfillment model, which is about creating an IN route and OUT callback. Something like a message passing and webhook model.

// The client based version is:
// https://github.com/dialogflow/dialogflow-nodejs-client-v2#quickstart
//


if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw Error('Need environment variable, GOOGLE_APPLICATION_CREDENTIALS, check source env.sh');
}


// You can find your project ID in your Dialogflow agent settings
const projectId = 'horhochobot'; //https://dialogflow.com/docs/agents#settings
const sessionId = 'quickstart-session-id';
const query = 'hello';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

// The text query request.
const request = {
  session: sessionPath,
  queryInput: {
    text: {
      text: query,
      languageCode: languageCode,
    },
  },
};

// Send request and log result
sessionClient
  .detectIntent(request)
  .then(responses => {
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log(`  No intent matched.`);
    }
  })
  .catch(err => {
    console.error('ERROR:', err);
  });
