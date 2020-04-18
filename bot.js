//var Discord = require('discord.io');
var config = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

// Initialize Database
var mysql = require('mysql');
var con = mysql.createConnection(config.db);
con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  var prefix = '.';
  if (msg.content.substring(0, 1) == prefix) {
    var args = msg.content.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);

    if (cmd === 'ping') {
      msg.reply('Pong!');
    }
    if (cmd === 'test') {
      if(msg.member.hasPermission("ADMINISTRATOR")) {
        msg.channel.send('Success!');
      }
    }

    //Search resource tile locations
    if(cmd === 'find' || cmd === prefix+'whereis') {
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
              msg.channel.send("\`\`\`"+args[0]+" can be found in the following tiles: " + result[0].tiles+"\`\`\`");
            if (!(found)) {
                msg.channel.send("\`\`\`"+args[0]+"\'s locations are not known to me.\`\`\`");
            }
        });
    }
  }
});

client.login('token');

client.login(config.token);
