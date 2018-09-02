/*
Mocha tests for the Alexa skill "Hello World" example (https://github.com/alexa/skill-sample-nodejs-hello-world).
Using the Alexa Skill Test Framework (https://github.com/BrianMacIntosh/alexa-skill-test-framework).
Run with 'mocha examples/skill-sample-nodejs-hello-world/helloworld-tests.js'.
*/

// include the testing framework
//const alexaTest = require('alexa-skill-test-framework');
const alexaTest = require('alexa-skill-test-framework');

// initialize the testing framework
alexaTest.initialize(
	require('../index.js'),
	"amzn1.ask.skill.00000000-0000-0000-0000-000000000000",
	"amzn1.ask.account.VOID");

describe("Hello World Skill", function () {
	// tests the behavior of the skill's LaunchRequest
	describe("LaunchRequest", function () {
		alexaTest.test([{
			request: alexaTest.getLaunchRequest(),
			saysLike: "Welcome to mortgage rates skill.",
			repromptsNothing: false,
			shouldEndSession: false
		}]);
	});

	// tests the behavior of the skill's CityFactIntent
	describe('ReadProviderIntent sucess match', function () {
		const slot = {
			'providerName': 'Canadian Lender'
		};

		const requestWithEntityResolution = alexaTest.addEntityResolutionToRequest(
			alexaTest.getIntentRequest('ReadProviderIntent', slot),
			'providerName',
			'Providers',
			'Canadian Lender',
			'0'
		);

		alexaTest.test([{
			request: requestWithEntityResolution,
			saysLike: "here are the rates for",
			shouldEndSession: true,
			repromptsNothing: true
		}]);
	});

	// tests the behavior of the skill's CityFactIntent
	describe('ReadProviderIntent no match', function () {
		const requestWithEntityResolution = alexaTest.addEntityResolutionNoMatchToRequest(
			alexaTest.getIntentRequest('ReadProviderIntent'),
			'providerName',
			'Providers',
			'Large Trails'
		);

		alexaTest.test([{
			request: requestWithEntityResolution,
			says: "Sorry but i did not understand the provider name please tell it again.",
			shouldEndSession: true,
			repromptsNothing: true
		}]);
	});

	// // tests the behavior of the skill's HelloWorldIntent
	// describe("ReadProviderIntent", function () {
	// 	alexaTest.test([
	// 		{
	// 			request: alexaTest.getIntentRequest("ReadProviderIntent"),
	// 			saysLike: "*", repromptsNothing: true, shouldEndSession: true,
	// 			hasAttributes: {
	// 				foo: 'bar'
	// 			}
	// 		}
	// 	]);
	// });

	// // tests the behavior of the skill's HelloWorldIntent with like operator
	// describe("HelloWorldIntent like", function () {
	// 	alexaTest.test([
	// 		{
	// 			request: alexaTest.getIntentRequest("HelloWorldIntent"),
	// 			saysLike: "World", repromptsNothing: true, shouldEndSession: true
	// 		}
	// 	]);
	// });
});