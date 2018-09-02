/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const axios = require('axios');
const utils = require('./skill-utils');
const askUtils = require('ask-utils');

const links = {
  full: "https://s3.us-east-2.amazonaws.com/mortgage-rates-service/full.json",
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    var speechText = 'Welcome to mortgage rates skill. ';

    //comment this on production
    process.env.RATE_TRESHOLD = 5;

    let result = await axios.get(links.full);

    let mortgages = result.data.mortgages

    speechText += "Mortgage reates are: ";
    let passedTreshold = 0;

    for (let i = 0; i < mortgages.length; i++) {
      let lowestRate = utils.getLowestRate(mortgages[i].rates);
      if (lowestRate < process.env.RATE_TRESHOLD) {
        passedTreshold++;
        speechText += `for ${mortgages[i].provider} it is ${lowestRate}; `
      }
    }

    if (passedTreshold) {
      speechText += "Would you like to hear all quotes for a specific provider?' If so, please say: Yes, for and the provider name";
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt(speechText)
        .getResponse();
    } else {
      speechText = "sorry but i cant find Mortgage rates lowest than treshold, please try again later."
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    }
  },
};

const ReadProviderIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'ReadProviderIntent';
  },
  handle(handlerInput) {
    const speechText = 'read provider intent hello';

    if(handlerInput.requestEnvelope.request.intent.slots.providerName.value == null || handlerInput.requestEnvelope.request.intent.slots.providerName.value === "?"){
      return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
    }

    if(handlerInput.requestEnvelope.request.intent.slots.providerName.value == null || handlerInput.requestEnvelope.request.intent.slots.providerName.value === "?"){
      return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
    }

    return handlerInput.responseBuilder
      .speak(speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent' ||
        handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
  },
  handle(handlerInput) {
    const speechText = 'Goodbye!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}\n${error.stack}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt('Sorry, I can\'t understand the command. Please say again.')
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    ReadProviderIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addRequestInterceptors(askUtils.logRequestInterceptor)
  .addResponseInterceptors(askUtils.logResponseInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();
