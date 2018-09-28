module.exports.getLowestRates = (rates, limitPerType) => {

  let types = [
      "5-years-variable",
      "3-years-fixed",
      "5-years-fixed",
      "10-years-fixed"
    ];
  
  let result = [];

  types.forEach(type => {
    result = result.concat(
      //Eliminate 0 rates
      rates.mortgages.filter(i => i.rates.find(r => r.type == type).rate > 0)
      //Sort by rate
      .sort(
        i => i.rates.find(r => r.type == type).rate
      )
      //Return top N for each rate
      .slice(0, limitPerType)
      //Remap the output
      .map(i => {
              const selectedRate = i.rates.find(r => r.type == type);
              const result = {
                  provider: i.provider,
                  type: selectedRate.type,
                  rate: selectedRate.rate    
              };
              return result;
          }
      )
    );   
  });
  
  //Sort by rate
  result = result.sort(i => i.rate);
  
  //Sample output
  /*
  [
    {
      "provider": "Scotiabank",
      "type": "10-years-fixed",
      "rate": 4.74
    },
    {
      "provider": "Tangerine",
      "type": "10-years-fixed",
      "rate": 3.89
    }
  ]
  */
  return result;
  
}

module.exports.logRequestInterceptor = {
  process(handlerInput) {
      console.log(`REQUEST: ${JSON.stringify(handlerInput.requestEnvelope, null, 2)}`);
  }
};

module.exports.logResponseInterceptor = {
  process(handlerInput, response) {
      console.log(`RESPONSE: ${JSON.stringify(response)}`);
  }
};

module.exports.SessionEndedRequestHandler = {
  canHandle(handlerInput) {
      return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
      console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

      return handlerInput.responseBuilder.getResponse();
  }
};


module.exports.randomString = (array) => {
  console.log("in randomString");
  //check that the given item is not a string, otherwise simply return the string
  var type = typeof array;
  if (type == "string") {
      console.log("the string literal in random phrase");
      return array;
  }

  var i = 0;
  if (array) { //array is not empty
      if (array.length) {
          i = Math.floor(Math.random() * array.length); //random i
          console.log("phrase is: " + array[i]);
          return (array[i]); //return random item from array
      }
  }
  return "";
}