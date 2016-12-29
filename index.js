var monitorZkill = require('./src/monitorZkill');

exports.handler = (event, context, callback) => {
  monitorZkill(callback);
}
