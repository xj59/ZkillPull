const Discord = module.require("discord.js");
var request = require('request');

let WebhookID = "your webhook ID";
let WebhookToken = "your webhook token";

killmailsWebhook = new Discord.WebhookClient(WebhookID, WebhookToken)

var monitorZkill = function (finishingCallback) {
  console.log('Initiating zKill redisQ');

  var headers = {
      'accept-encoding': 'null',
      'Accept': 'application/json',
      'authority': 'redisq.zkillboard.com',
      'Content-Type': 'application/json'
  };

  var options = {
      url: 'https://redisq.zkillboard.com/listen.php?ttw=1&queueID=' + process.env.queueID,
      headers: headers
  };

  function callback(error, response, body) {
      if (!error && response.statusCode == 200 && JSON.parse(body).package) {
          killInfo = JSON.parse(body).package;
          //console.log('Found Kill:  ' + JSON.stringify(killInfo));

          var pushToDiscord = false;
          var orbitYourDrones = false;
          var slackMessageText = '`Kill`'

          killInfo.killmail.attackers.forEach(function (attacker) {
            if (attacker.corporation_id == process.env.corpID) {
              pushToDiscord = true;
              slackMessageText = '`Corp Kill`'
              console.log('Kill matches (Corp): ' + JSON.stringify(killInfo));
            }
            if (attacker.alliance_id == process.env.allianceID) {
              pushToDiscord = true;
              slackMessageText = '`Alliance Kill`'
              console.log('Kill matches (Alliance): ' + JSON.stringify(killInfo));
            }
          });

          if (killInfo.killmail.victim.corporation_id == process.env.corpID) {
            pushToDiscord = true;
            slackMessageText = '`Corp Loss`'
            console.log('Loss matches (Corp): ' + JSON.stringify(killInfo));
          }
          if (killInfo.killmail.victim.alliance_id == process.env.allianceID) {
            pushToDiscord = true;
            slackMessageText = '`Alliance Loss`'
            console.log('Loss matches (Alliance): ' + JSON.stringify(killInfo));
          }

          if (pushToDiscord) {
            killmailsWebhook.send(
              slackMessageText + ' ' + 'https://zkillboard.com/kill/' + killInfo.killID,
            ).then(request(options, callback)).catch(console.error);
          } else {
            request(options, callback);
            //console.log(''); 
          }
      } else {
        console.log('No more matches')
        finishingCallback(null, 'Finished');
      }
  }
  request(options, callback);
  console.log('Requesting kills...'); 
}
  
module.exports = monitorZkill;
