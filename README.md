# Alexa Bot to read-out mortgage rates

## Design

* Use https://github.com/vkhazin/mortgage-rates-service service to fetch mortgage rates
* Respond to an intent triggered by: 'Hey Alexa, what are today's mortgage rates!'
* Read out the lowest mortgage rate in each category, not to exceed 5 (parameter stored in lambda environment variable)
* Ask whether to read all rates for a provider: 'Would you like to hear all quotes for a specific provider?' If so, please say: "Yes, for" and the provider name'
* If user has answered: 'Yes, ${provider-name}'
* Read out all rates for the selected provider
* Otherwise, end the interaction
 
## Development

* Node.Js AWS Lambda hosted function to process the voice interactions
* Automated script executable on Amazon Linux EC2 to deploy the function
* Unit and Integration test for the function
* Markdown documentation to setup Alexa skill on developer.amazon.com portal

## Hot to contribute

1. Fork the repo
2. Make changes and commit to your own repository
3. Submit a pull request back into this repository
