/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const axios = require('axios');
const utils = require('./skill-utils');

const baseUrl = process.env.MORTGAGE_RATES_SERVICE_URL || "https://jsej2cbo51.execute-api.us-east-2.amazonaws.com/poc/";


const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  async handle(handlerInput) {
    var speechText = 'Welcome to mortgage rates skill. ';

    if (!process.env.RATE_THRESHOLD) {
      //set the default threshold if it not present
      console.log("setting the default RATE_THRESHOLD");
      process.env.RATE_THRESHOLD = 5;
    }
    console.log(`RATE_THRESHOLD=${process.env.RATE_THRESHOLD}`);

    let result = await axios.get(baseUrl);

    let mortgages = result.data.mortgages

    speechText += "Mortgage rates are, ";
    let passedThreshold = 0;

    for (let i = 0; i < mortgages.length; i++) {
      let lowestRate = utils.getLowestRate(mortgages[i].rates);
      if (lowestRate < process.env.RATE_THRESHOLD) {
        passedThreshold++;
        speechText += `for ${mortgages[i].provider} it is ${lowestRate}; `
      }
    }

    if (passedThreshold) {
      speechText += "Would you like to hear all quotes for a specific provider?' If so, please say: Yes, for and the provider name";
      return handlerInput.responseBuilder
        .speak(speechText)
        .reprompt("Would you like to hear all quotes for a specific provider?' If so, please say: Yes, for and the provider name")
        .getResponse();
    } else {
      speechText = "sorry but i cant find mortgage rates lowest than threshold, please try again later."
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
  async handle(handlerInput) {
    if (handlerInput.requestEnvelope.request.intent.slots.providerName.value == null || handlerInput.requestEnvelope.request.intent.slots.providerName.value === "?") {
      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    }

    if (handlerInput.requestEnvelope.request.intent.slots.providerName.resolutions &&
      handlerInput.requestEnvelope.request.intent.slots.providerName.resolutions.resolutionsPerAuthority &&
      handlerInput.requestEnvelope.request.intent.slots.providerName.resolutions.resolutionsPerAuthority[0] &&
      handlerInput.requestEnvelope.request.intent.slots.providerName.resolutions.resolutionsPerAuthority[0].status.code === "ER_SUCCESS_MATCH"
    ) {
      let name = handlerInput.requestEnvelope.request.intent.slots.providerName.resolutions.resolutionsPerAuthority[0].values[0].value.name;
      let result = await axios.get(`${baseUrl}${name}`);

      let provider = result.data.mortgages[0];

      let speechText = `here are the rates for ${provider.provider}; `;

      for (let i = 0; i < provider.rates.length; i++) {
        speechText += `${provider.rates[i].type} is ${provider.rates[i].rate}; `;
      }

      return handlerInput.responseBuilder
        .speak(speechText)
        .getResponse();
    } else {
      let speechText = "Sorry but i did not understand the provider name please tell it again."
      var updatedIntent = handlerInput.requestEnvelope.request.intent;
      delete updatedIntent.slots.providerName.value;
      delete updatedIntent.slots.providerName.resolutions;
      return handlerInput.responseBuilder
        .speak(speechText)
        .addElicitSlotDirective("providerName", updatedIntent)
        .getResponse();
    }

  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    let speechText = 'Help messaage; ';

    let finalQuestion = "What do you want to do next?";
    speechText+= finalQuestion;

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(finalQuestion)
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
    utils.SessionEndedRequestHandler
  )
  .addRequestInterceptors(utils.logRequestInterceptor)
  .addResponseInterceptors(utils.logResponseInterceptor)
  .addErrorHandlers(ErrorHandler)
  .lambda();
