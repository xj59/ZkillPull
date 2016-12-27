# zkill-to-slack
Post kills from Zkillboard's RedisQ to Slack using AWS Lambda

### To set up your own Lambda:

1. Download the latest release's Lambda.zip.
2. Upload Lambda.zip to your AWS Lambda Function.
3. Set the Lambda Environment variables:
  * emojiIcon: :your_emoji:
  * queueID: A unique identifier for your Zkill RedisQ, so that you do not get duplicate or miss kills.
  * slackHookURL: The URL to your slack for Incoming Webhooks.
  * channel: Your Slack channel
  * watchForCorp: The corporation name for which you would like to be notified of kills.
  * watchForAlliance: The alliance name for which you would like to be notified of kills.
4. Run your Lambda on a schedule (http://docs.aws.amazon.com/AmazonCloudWatch/latest/events/RunLambdaSchedule.html). 5 minutes should work and cost only a few cents per month.

### Donate ISK In-Game to Cope Dogg
