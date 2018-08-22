# Alexa Bot to read-out mortgage rates

## Design

* Use https://github.com/vkhazin/mortgage-rates-service service to fetch mortgage rates
* Respond to intent: 'Hey Alexa, what todays mortgage rates!'
* Read out the lowest mortgage rate in each category
* Ask whether to read all rates for a provider
* If answered: 'Yes, <provider name>'
* Read out all rates for the selected provider
* Otherwise end interaction
 
## Deliverables

* Node.Js AWS Lambda hosted function to process the voice interactions
* Automated script executable on Amazon Linux EC2 to deploy the function
* Unit and Integration test for the function
* Markdown documentation to setup Alexa skill on developer.amazon.com portal
