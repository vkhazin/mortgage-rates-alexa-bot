const skill = require('../custom');
const axios = require('../custom/node_modules/axios')

process.env.RATE_THRESHOLD = 5;


async function main() {

    const links = {
        full: "https://s3.us-east-2.amazonaws.com/mortgage-rates-service/full.json",
    }

    var  speechText = 'Welcome to mortgage rates skill. ';

    let result = await axios.get(links.full);

    let mortgages = result.data.mortgages

    speechText += "Mortgage rates are: ";
    let passedThreshold = 0;

    for (let i = 0; i < mortgages.length; i++) {
      let lowestRate = getLowestRate(mortgages[i].rates);
      if (lowestRate < process.env.RATE_THRESHOLD) {
        passedThreshold++;
        speechText += `for ${mortgages[i].provider} it is ${lowestRate}; `
      }
    }

    if (passedThreshold) {
      speechText += "Would you like to hear all quotes for a specific provider?' If so, please say: \"Yes, for\" and the provider name";
    //   return handlerInput.responseBuilder
    //     .speak(speechText)
    //     .reprompt(speechText)
    //     .getResponse();
    } else {
      speechText = "sorry but i cant find Mortgage rates lowest than threshold, please try again later."
    //   return handlerInput.responseBuilder
    //     .speak(speechText)
    //     .getResponse();
    }

    console.log(speechText)

    skill.handler("test", "", function (result, error) {
        console.log("done");
    });
}

main();


