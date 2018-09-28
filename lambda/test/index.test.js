// include the testing framework
const alexaTest 	= require('alexa-skill-test-framework');
const timeOut		= 5000;

// initialize the testing framework
alexaTest.initialize(
	require('../index.js'),
	"amzn1.ask.skill.00000000-0000-0000-0000-000000000000",
	"amzn1.ask.account.VOID");

describe("Invocation", function () {
	
	describe("LaunchRequest", function () {
		alexaTest.test([{
			request: alexaTest.getLaunchRequest(),
			saysLike: "Welcome to mortgage rates skill.",
			repromptsNothing: false,
			shouldEndSession: false
		}]);
	}).timeout(timeOut);

	describe("Help intent", function () {
		alexaTest.test([{
			request: alexaTest.getIntentRequest("AMAZON.HelpIntent"),
			repromptsNothing: false,
			shouldEndSession: false
		}]);
	}).timeout(timeOut);

	describe("session ended request", function () {
		alexaTest.test([{
			request: alexaTest.getSessionEndedRequest("test reason"),
			repromptsNothing: true,
			shouldEndSession: true
		}]);
	}).timeout(timeOut);

	describe("cancel", function () {
		alexaTest.test([{
			request: alexaTest.getIntentRequest("AMAZON.CancelIntent"),
			says: "Goodbye!",
			repromptsNothing: true,
			shouldEndSession: true
		}]);
	}).timeout(timeOut);

	describe("stop", function () {
		alexaTest.test([{
			request: alexaTest.getIntentRequest("AMAZON.StopIntent"),
			says: "Goodbye!",
			repromptsNothing: true,
			shouldEndSession: true
		}]);
	}).timeout(timeOut);
	
	// describe('ReadProviderIntent success match', function () {
	// 	const slot = {
	// 		'providerName': 'Yes, for Royal Bank'
	// 	};

	// 	const requestWithEntityResolution = alexaTest.addEntityResolutionToRequest(
	// 		alexaTest.getIntentRequest('ReadProviderIntent', slot),
	// 		'providerName',
	// 		'Providers',
	// 		'Canadian Lender',
	// 		'0'
	// 	);

	// 	alexaTest.test([{
	// 		request: requestWithEntityResolution,
	// 		saysLike: "here are the rates for",
	// 		shouldEndSession: true,
	// 		repromptsNothing: true
	// 	}]);
	// }).timeout(timeOut);


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
	}).timeout(timeOut);
});