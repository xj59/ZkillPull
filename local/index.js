var monitorZkill = require('../src/monitorZkill');
var setEnvironmentVariables = require('./setEnvironmentVariables');

setEnvironmentVariables();

monitorZkill(console.log);
