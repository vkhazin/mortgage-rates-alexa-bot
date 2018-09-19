module.exports.getLowestRate = function (items) {
  var id = 0;
  var lowest = items[0].rate;
  var tmp;
  for (var i = 0; i < items.length; i++) {
      tmp = items[i].rate;
      if (tmp < lowest) {
          id = i;
          lowest = tmp;
      }
  }
  return id;
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