var environmentVariables = require('./environmentVariables.json')

var setEnvironmentVariables = function () {
  process.env.queueID = environmentVariables.queueID;
  process.env.discordHookID = environmentVariables.discordHookID;
  process.env.discordHookToken = environmentVariables.discordHookToken;
  process.env.corpID = environmentVariables.corpID;
  process.env.allianceID = environmentVariables.allianceID;
}

module.exports = setEnvironmentVariables;
