# Alexa Bot to read-out mortgage rates

## Overview

A mortgage alexa skill to fetch current Canadian mortgage rates.

## Pre-requisites

To deploy the skill user need to install:
 - Node.js;
 - AWS CLI;
 - ASK CLI;
 - Yarn;

## Instalation on Amazon Linux

**Clone the repository**
```bash
git clone https://github.com/vkhazin/mortgage-rates-alexa-bot.git && \
  cd ./mortgage-rates-alexa-bot
```

**Install required version of Node.js:**
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.0/install.sh | bash && \
  nvm install 8.11 && \
  nvm use 8.11 && \
  nvm alias default 8.11
```

**Install [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html):**
```bash
npm install -g ask-cli
```

**Install [Yarn](https://yarnpkg.com/):**
```bash
sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O "/etc/yum.repos.d/yarn.repo" && \
  sudo yum install -y yarn && \
  yarn --version
```

**Environment Variables for [AWS CLI](https://aws.amazon.com/cli/):**
```
export AWS_ACCESS_KEY_ID='your-key' && \
export AWS_SECRET_ACCESS_KEY='your-secret' && \
export AWS_DEFAULT_REGION='us-east-2'
```

**Initialize [ASK CLI](https://developer.amazon.com/docs/smapi/quick-start-alexa-skills-kit-command-line-interface.html):**
```
ask init --no-browser
```
Select option with environment variables


## Skill Deployment

**Deploy skill to a non-production environment**
```
cd ./lambda/custom && \
  yarn install && \
  yarn test && \
  cd ../../ && \
  ask deploy
```

**Deploy skill to a production environment**  

Replace `yarn install` with `yarn install --production --flat`

**Deploy Lambda function only**
```
cd ./mortgage-rates-alexa-bot
cd ./lambda/custom
yarn install --production --flat
ask lambda upload -f ask-custom-mortgage-rates-alexa-bot-default -s ./
```

## Skill Removal

1. Login to [Alexa Developer Console](https://developer.amazon.com/alexa/console/ask)
2. Select 'View Skill Id'
3. Execute from a terminal: `ask api delete-skill --skill-id **replace with skill id**`


## Hot to contribute

1. Fork the repo
2. Make changes and commit to your own repository
3. Submit a pull request back into this repository
