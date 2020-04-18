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

    //Print Available commands
    if (cmd === 'commands') {
      msg.channel.send("(Currently not working.) To Remove: !del <tile> <resource1>,<resource2>\n(Currently not working.) To Add: !add <tile> <resource2>,<resource1>\n\nTo query:\n!find <resource>\n!whatson <tile>\n!animals <tile>\n!map <tile>\n!ping - sample/test code found online when I was first making bot..... Left as a reminder to never forget where I began with the bot.');
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
            } else {
              if (!(found)) {
                msg.channel.send("\`\`\`"+args[0]+"\'s locations are not known to me.\`\`\`");
              }
            }
        });
    }

    //List resources within a tile
    if(cmd === "whatson") {
      con.query("select GROUP_CONCAT(distinct '   ', locations.resource, ' (',type,')' separator '\n') as res from locations left join (resources) on locations.resource = resources.resource where tile =\""+[args[0].toLowerCase()]+"\"", function (err, result, fields) {
      if (err) msg.channel.send("\`\`\`Ahoy! Thar's an error with yer command fix yer syntax and try again.\`\`\`");;
         if (result[0]) { msg.channel.send("\`\`\`"+args[0]+" contains the following: \n" + result[0].res+"\`\`\`");  } else { msg.channel.send("\`\`\`I don\'t know what resources are in "+args[0]+"\`\`\`");; }
      });
    }
    //List animals within a tile
    if(cmd === "animals") {
      con.query("select GROUP_CONCAT(distinct '   ', animals.animal, ' (',stance,')' separator '\n') as res from animals left join (animaltypes) on animals.animal = animaltypes.animal where tile =\""+[args[0].toLowerCase()]+"\"", function (err, result, fields) {
      if (err) msg.channel.send("\`\`\`Ahoy! Thar's an error with yer command fix yer syntax and try again.\`\`\`");;
         if (result[0]) { msg.channel.send("\`\`\`"+args[0]+" contains the following: \n" + result[0].res+"\`\`\`");  } else { msg.channel.send("\`\`\`I don\'t know what resources are in "+args[0]+"\`\`\`");; }
      });
    }
    //List islands within a tile
    if(cmd === "islands") {
      con.query("select GROUP_CONCAT('   ', islands.name separator '\n') as res from islands where tile =\""+[args[0].toLowerCase()]+"\"", function (err, result, fields) {
      if (err) msg.channel.send("\`\`\`Ahoy! Thar's an error with yer command fix yer syntax and try again.\`\`\`");;
         if (result[0]) { msg.channel.send("\`\`\`The following islands are in "+args[0]+": \n" + result[0].res+"\`\`\`");  } else { msg.channel.send("\`\`\`I don\'t know what islands are in "+args[0]+"\`\`\`");; }
      });
    }
    //show a tile map
    if(cmd === "map") {
      if (!args[0]) {
        msg.channel.send("\`\`\`Well shave me belly with a rusty razor! Ye didn\'t provide enough arguments. Stop failing so hard.\`\`\`");;
        return false;
      }
    msg.channel.send("https://game-maps.com/ATLAS/img/big/Atlas-Region-"+args[0].toUpperCase()+".jpg");;
    }

    //add tile resources
    if(cmd === "add") {
      if (!args[0] || ! args[1]) {
        msg.channel.send("\`\`\`excel\n \'Well shave me belly with a rusty razor! Ye did not provide enough arguments. Stop failing so hard.\'\`\`\`");;
        return false;
      }
      let addRes = args[1].split(',');
      let tile = args[0].toLowerCase();
      for(var resrc of addRes) {
        con.query("INSERT INTO \`locations\` (tile, resource) VALUES (\'"+[args[0].toLowerCase()]+"\', \'"+resrc.toLowerCase()+"\')", function (err, result) {
          if (err) msg.channel.send("\`\`\`No quarter! Thar was an error adding "+resrc.toLowerCase()+" to "+args[0].toLowerCase()+". Try again or contact yar admin.\`\`\`");;
        });
      }
    }
    //del tile resource
    if(cmd === "del") {
      if (!args[0] || ! args[1]) {
        msg.channel.send("\`\`\`Well shave me belly with a rusty razor! Ye didn\'t provide enough arguments. Stop failing so hard.\`\`\`");;
        return false;
      }
      let delRes = args[1].split(',');
      let tile = args[0].toLowerCase();
      for(var resrc of delRes) {
        con.query("delete from \`locations\` where (resource=\'"+[resrc.toLowerCase()]+"\' and tile=\'"+tile+"\')", function (err, result) {
          if (err) msg.channel.send("\`\`\`No quarter! Thar was an error removing "+resrc.toLowerCase()+" from "+args[0].toLowerCase()+". Try again or contact yar admin.\`\`\`");;
        });
      }
    }

  }
});

client.login(config.token);
