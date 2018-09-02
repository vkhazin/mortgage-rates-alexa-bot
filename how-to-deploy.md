# Preparation

To deploy the skill user need to install:
 - Node.js;
 - AWS CLI;
 - ASK CLI;
 - Yarn

## 1. Instalation

Instalation guide is tested on ubuntu 18.04

**Node.js:**
```bash
sudo apt-get install curl python-software-properties
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs
```

**AWS CLI:**
```bash
pip install awscli --upgrade --user
```

**ASK CLI:**
```
npm install -g ask-cli
```

**Yarn:**
```
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
```

## 2. Configuration

**AWS CLI:**
For general use, the aws configure command is the fastest way to set up your AWS CLI installation. 
```
$ aws configure
AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
Default region name [None]: us-west-2
Default output format [None]: json
```

**ASK CLI:**
```
ask init
```
If you are configuring ask on remote linux machine please use next comand:
```
ask init --no-browser
```
then you need to folow hints.

## 3. Skill Deployment

**Deploy skill to DEV environment**
```
cd $WORK_FOLDER
git clone https://github.com/vkhazin/mortgage-rates-alexa-bot.git
cd mortgage-rates-alexa-bot
cd ./lambda/custom
yarn install
yarn test
cd ../../
ask deploy
```

**Deploy skill to PROD environment**
```
cd $WORK_FOLDER
git clone https://github.com/vkhazin/mortgage-rates-alexa-bot.git
cd mortgage-rates-alexa-bot
cd ./lambda/custom
yarn install --production --flat
cd ../../
ask deploy
```

**Deploy only Lambda function**
```
cd $WORK_FOLDER
git clone https://github.com/vkhazin/mortgage-rates-alexa-bot.git
cd mortgage-rates-alexa-bot
cd ./lambda/custom
yarn install --production --flat
ask lambda upload -f ask-custom-mortgage-rates-alexa-bot-default -s ./
```