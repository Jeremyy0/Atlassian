//var Discord = require('discord.io');
var config = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.substring(0, 1) == prefix) {
    var args = msg.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);
  }

  var prefix = '!';
  if (msg.content === prefix+'ping') {
    msg.reply('Pong!');
  }
  if (msg.content === prefix+'test') {
    if(msg.member.hasPermission("ADMINISTRATOR")) {
      msg.channel.send('Success!');

    }
  }

  //Search resource tile locations
  if(msg === prefix+'find' || msg === prefix+'whereis') {
    var found = false;
    con.query("select tiles from (SELECT resource, GROUP_CONCAT(distinct tile separator ', ') as tiles from locations group by resource) as T where resource=\""+[args[0].toLowerCase()]+"\"", function (err, result, fields) {
      if (err) msg.channel.send("\`\`\`Ahoy! Thar\'s an error with yer command fix yer syntax and try again.\`\`\`");;
        if (result[0]) {
          msg.channel.send("\`\`\`"+args[0]+" can be found in the following tiles: " + result[0].tiles+"\`\`\`");
          found = true;
        }
      });
      con.query("select tiles from (SELECT animal, GROUP_CONCAT(distinct tile separator ', ') as tiles from animals group by animal) as T where animal=\""+[args[0].toLowerCase()]+"\"", function (err, result, fields) {
        if (err) msg.channel.send("\`\`\`Ahoy! Thar\'s an error with yer command fix yer syntax and try again.\`\`\`");;
          if (result[0]) {
            msg.channel.send({"\`\`\`"+args[0]+" can be found in the following tiles: " + result[0].tiles+"\`\`\`");
          } else {
            if (!(found)) {
              msg.channel.send({"\`\`\`"+args[0]+"\'s locations are not known to me.\`\`\`");;
            }
          }
      });
  }

});

client.login('token');

client.login(config.token);
