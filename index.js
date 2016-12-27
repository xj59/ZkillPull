var request = require('request');
var Slack = require('slack-node');
var commaIt = require('comma-it');

slack = new Slack();
slack.setWebhook(process.env.slackHookURL);

exports.handler = (event, context, callback) => {
  var headers = {
      'accept-encoding': 'null',
      'Accept': 'application/json',
      'authority': 'redisq.zkillboard.com',
      'Content-Type': 'application/json'
  };

  var options = {
      url: 'https://redisq.zkillboard.com/listen.php?queueID=' + process.env.queueID,
      headers: headers
  };

  function callback(error, response, body) {
      if (!error && response.statusCode == 200 && !body.package) {
          killInfo = JSON.parse(body).package;

          var killingPilot = 'Unknown';
          var corpPilots = [];
          var pushToSlack = false;
          var color = 'good';

          killInfo.killmail.attackers.forEach(function (attacker) {
            if (attacker.finalBlow) {
              if (attacker.character) {
                killingPilot = attacker.character.name + ' (' + attacker.corporation.name + ')';
              } else if (attacker.shipType) {
                killingPilot = attacker.shipType.name;
              }
            }
            if ((attacker.corporation && attacker.corporation.name === process.env.watchForCorp) || (attacker.alliance && process.env.watchForAlliance && attacker.alliance.name === process.env.watchForAlliance)) {
              pushToSlack = true;
              corpPilots.push(attacker.character.name);
            }
          });

          if ((killInfo.killmail.victim.corporation && killInfo.killmail.victim.corporation.name === process.env.watchForCorp) || (killInfo.killmail.victim.alliance && process.env.watchForAlliance && killInfo.killmail.victim.alliance.name === process.env.watchForAlliance)) {
            color = 'danger';
            pushToSlack = true;
          }

          if (pushToSlack) {
            var formattedKillInfo = {
              fields:[
                {
                  'title': 'Ship',
                  'value': killInfo.killmail.victim.shipType.name,
                  'short': true
                },
                {
                  'title': 'System',
                  'value': killInfo.killmail.solarSystem.name,
                  'short': true
                },
                {
                  'title': 'Total Damage',
                  'value': killInfo.killmail.victim.damageTaken,
                  'short': true
                },
                {
                  'title': 'Pilots Involved',
                  'value': killInfo.killmail.attackerCount,
                  'short': true
                },
                {
                  'title': 'Value',
                  'value': commaIt(killInfo.zkb.totalValue, {addPrecision:true, thousandSeperator : ',', decimalSeperator : '.'}) + ' ISK',
                  'short': true
                },
                {
                  'title': 'Zkill Points',
                  'value': killInfo.zkb.points,
                  'short': true
                }
              ],
              title: killingPilot + ' killed ' + killInfo.killmail.victim.character.name + ' (' + killInfo.killmail.victim.corporation.name + ')',
              title_link: 'https://zkillboard.com/kill/' + killInfo.killID,
              thumb_url: 'https://imageserver.eveonline.com/Render/' + killInfo.killmail.victim.shipType.id + '_128.png',
              fallback: 'test',
              "color": color,
              "footer": 'Zkill-to-Slack - https://github.com/MattCopenhaver/zkill-to-slack',
              "footer_icon": "https://imageserver.eveonline.com/Character/92626933_128.jpg"
            }

            if (corpPilots.length > 1) {
              formattedKillInfo.fields.push({
                'title': 'Friendly Pilots Involved' ,
                'value': corpPilots.join(', '),
                'short': false
              });
            }

            attachments = []
            attachments.push(formattedKillInfo);

            slack.webhook(
              {
                channel: process.env.channel,
                username: "ZkillBot",
                attachments: attachments,
                icon_emoji: process.env.emojiIcon
              }, function (error, response, body) {
              console.log(error, response, body);
              request(options, callback);
              }
            );
          } else {
            request(options, callback);
          }
      } else {
        context.done(null, 'Finished');
      }
  }
  request(options, callback);
}
