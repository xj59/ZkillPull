var monitorZkill = require('../src/monitorZkill');
var setEnvironmentVariables = require('./config/setEnvironmentVariables');

setEnvironmentVariables();

console.log('queueID: ' + process.env.queueID);
console.log('discordHookID: ' + process.env.discordHookID);
console.log('discordHookToken: ' + process.env.discordHookToken);
console.log('corpID: ' + process.env.corpID);
console.log('allianceID: ' + process.env.allianceID);

function watch () {
 setTimeout(function() { monitorZkill(watch) }, 10000);
};

watch();
