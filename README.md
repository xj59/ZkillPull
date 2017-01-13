# zkill-to-slack
Post kills from Zkillboard's RedisQ to Slack

### Setup using your own AWS Lambda:

1. Download the latest release's Lambda.zip.
2. Upload Lambda.zip to your AWS Lambda Function.
3. Set the Lambda Environment variables (see [Config and Environment Variables](#config-and-environment-variables)).
4. Run your Lambda on a schedule (http://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html). 5 minutes should work and cost only a few cents per month.

### Setup using your own server or computer:

1. Checkout the code `git clone https://github.com/MattCopenhaver/zkill-to-slack`.
2. Navigate into the cloned directory `cd zkill-to-slack`.
3. `npm install`.
4. Update the configuration file specific to your needs (see [Config and Environment Variables](#config-and-environment-variables)).
5. `node node/index.js` This will run infinitely until it is stopped or fails.  
  * There are very rarely failures due malformed or irregular Zkill data, so if you are running this on a server indefinitely, consider running this using a node process manager such as pm2.

### Config and Environment Variables:
* queueID: A unique identifier for your Zkill RedisQ, so that you do not get duplicate or miss kills.
* slackHookURL: The URL to your slack for Incoming Webhooks.
* channel: Your Slack channel
* watchForCorp: The corporation name for which you would like to be notified of kills.
* watchForAlliance: The alliance name for which you would like to be notified of kills.

### Donations Accepted using in-game ISK to Cope Bank
