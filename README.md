# zkill-to-discord
Forked from https://github.com/MattCopenhaver/zkill-to-slack

Post kills from [Zkillboard's RedisQ](https://github.com/zKillboard/RedisQ) to Discord

![example post](https://linktourl.com)

### Setup using your own server or computer:

1. Clone the repo `git clone https://github.com/phoenixbones/zkill-to-discord.git`.
2. Navigate into the cloned directory `cd zkill-to-discord`.
3. `npm install`.
4. Update the configuration file specific to your needs (see [Config and Environment Variables](#config-and-environment-variables)).
5. `node node/index.js` This will run infinitely until it is stopped or fails.  
  * There are very rarely failures due malformed or irregular Zkill data, so if you are running this on a server indefinitely, consider running this using a node process manager such as pm2.

### Config and Environment Variables:
* queueID: A unique identifier for your Zkill RedisQ, so that you do not get duplicate or miss kills.
* discordHookID: The Discord Webhook ID. [Intro to Discord Webhooks](https://support.discordapp.com/hc/en-us/articles/228383668)
* discordHookToken": The Discord Webhook Token.
* corpID: The corporation name for which you would like to be notified of kills.
* allianceID: The alliance name for which you would like to be notified of kills.

### Donations Accepted using in-game ISK to Cope Bank
