var Discord = require('discord.io');
var logger = require('winston');
var config = require('./config.json');

//const DiscordJS = require('discord.js');
//const commando = require('discord.js-commando');

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Database
var mysql = require('mysql');

var con = mysql.createConnection(config.db);
con.connect(function(err) {
  if (err) throw err;
  console.log("DB Connected!");
});


// Initialize Discord Bot
var bot = new Discord.Client({
   token: config.token,
   autorun: true
});

//Stuff for !Darius
function choose(choices) {
  var index = Math.floor(Math.random() * choices.length);
  return choices[index];
}



bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
  bot.sendMessage({to: channelID,message: " " + user " " + userID + " " + message});
  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);
  }
  if(cmd === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    bot.sendMessage({to: channelID,message: 'Pong!'});
  }

  if(cmd === "testing") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    if(message.member.hasPermission("ADMINISTRATOR")) {
      bot.sendMessage({to: channelID,message: 'Testing!'});
    }
  }

  //Search resource tile locations
  if(cmd === "find" || cmd === "whereis") {
    var found = false;
    con.query("select tiles from (SELECT resource, GROUP_CONCAT(distinct tile separator ', ') as tiles from locations group by resource) as T where resource=\""+[args[0].toLowerCase()]+"\"", function (err, result, fields) {
      if (err) bot.sendMessage({to: channelID,message: "\`\`\`Ahoy! Thar\'s an error with yer command fix yer syntax and try again.\`\`\`"});;
        if (result[0]) {
          bot.sendMessage({to: channelID,message: "\`\`\`"+args[0]+" can be found in the following tiles: " + result[0].tiles+"\`\`\`"});
          found = true;
        }
      });
      con.query("select tiles from (SELECT animal, GROUP_CONCAT(distinct tile separator ', ') as tiles from animals group by animal) as T where animal=\""+[args[0].toLowerCase()]+"\"", function (err, result, fields) {
        if (err) bot.sendMessage({to: channelID,message: "\`\`\`Ahoy! Thar\'s an error with yer command fix yer syntax and try again.\`\`\`"});;
          if (result[0]) {
            bot.sendMessage({to: channelID,message: "\`\`\`"+args[0]+" can be found in the following tiles: " + result[0].tiles+"\`\`\`"});
          } else {
            if (!(found)) {
              bot.sendMessage({to: channelID,message: "\`\`\`"+args[0]+"\'s locations are not known to me.\`\`\`"});;
            }
          }
      });
  }

  //List resources within a tile
  if(cmd === "whatson") {
    con.query("select GROUP_CONCAT(distinct '   ', locations.resource, ' (',type,')' separator '\n') as res from locations left join (resources) on locations.resource = resources.resource where tile =\""+[args[0].toLowerCase()]+"\"", function (err, result, fields) {
    if (err) bot.sendMessage({to: channelID,message: "\`\`\`Ahoy! Thar's an error with yer command fix yer syntax and try again.\`\`\`"});;
       if (result[0]) { bot.sendMessage({to: channelID,message: "\`\`\`"+args[0]+" contains the following: \n" + result[0].res+"\`\`\`"});  } else { bot.sendMessage({to: channelID,message: "\`\`\`I don\'t know what resources are in "+args[0]+"\`\`\`"});; }
    });
  }

  //List animals within a tile
  if(cmd === "animals") {
    con.query("select GROUP_CONCAT(distinct '   ', animals.animal, ' (',stance,')' separator '\n') as res from animals left join (animaltypes) on animals.animal = animaltypes.animal where tile =\""+[args[0].toLowerCase()]+"\"", function (err, result, fields) {
    if (err) bot.sendMessage({to: channelID,message: "\`\`\`Ahoy! Thar's an error with yer command fix yer syntax and try again.\`\`\`"});;
       if (result[0]) { bot.sendMessage({to: channelID,message: "\`\`\`"+args[0]+" contains the following: \n" + result[0].res+"\`\`\`"});  } else { bot.sendMessage({to: channelID,message: "\`\`\`I don\'t know what resources are in "+args[0]+"\`\`\`"});; }
    });
  }

  //List islands within a tile
  if(cmd === "islands") {
    con.query("select GROUP_CONCAT('   ', islands.name separator '\n') as res from islands where tile =\""+[args[0].toLowerCase()]+"\"", function (err, result, fields) {
    if (err) bot.sendMessage({to: channelID,message: "\`\`\`Ahoy! Thar's an error with yer command fix yer syntax and try again.\`\`\`"});;
       if (result[0]) { bot.sendMessage({to: channelID,message: "\`\`\`The following islands are in "+args[0]+": \n" + result[0].res+"\`\`\`"});  } else { bot.sendMessage({to: channelID,message: "\`\`\`I don\'t know what islands are in "+args[0]+"\`\`\`"});; }
    });
  }

  //add tile resources
  if(cmd === "add") {
    if (!args[0] || ! args[1]) {
      bot.sendMessage({to: channelID,message: "\`\`\`excel\n \'Well shave me belly with a rusty razor! Ye did not provide enough arguments. Stop failing so hard.\'\`\`\`"});;
      return false;
    }
    let addRes = args[1].split(',');
    let tile = args[0].toLowerCase();
    for(var resrc of addRes) {
      con.query("INSERT INTO \`locations\` (tile, resource) VALUES (\'"+[args[0].toLowerCase()]+"\', \'"+resrc.toLowerCase()+"\')", function (err, result) {
        if (err) bot.sendMessage({to: channelID,message: "\`\`\`No quarter! Thar was an error adding "+resrc.toLowerCase()+" to "+args[0].toLowerCase()+". Try again or contact yar admin.\`\`\`"});;
      });
    }
  }



  //del tile resource
  if(cmd === "del") {
    if (!args[0] || ! args[1]) {
      bot.sendMessage({to: channelID,message: "\`\`\`Well shave me belly with a rusty razor! Ye didn\'t provide enough arguments. Stop failing so hard.\`\`\`"});;
      return false;
    }
    let delRes = args[1].split(',');
    let tile = args[0].toLowerCase();
    for(var resrc of delRes) {
      con.query("delete from \`locations\` where (resource=\'"+[resrc.toLowerCase()]+"\' and tile=\'"+tile+"\')", function (err, result) {
        if (err) bot.sendMessage({to: channelID,message: "\`\`\`No quarter! Thar was an error removing "+resrc.toLowerCase()+" from "+args[0].toLowerCase()+". Try again or contact yar admin.\`\`\`"});;
      });
    }
  }

//show a tile map
  if(cmd === "map") {
    if (!args[0]) {
      bot.sendMessage({to: channelID,message: "\`\`\`Well shave me belly with a rusty razor! Ye didn\'t provide enough arguments. Stop failing so hard.\`\`\`"});;
      return false;
    }
  bot.sendMessage({to: channelID,message: "https://game-maps.com/ATLAS/img/big/Atlas-Region-"+args[0].toUpperCase()+".jpg"});;
  }

//New Command Development
  if(cmd === "trigger") {
    if (message.user.hasPermission("ADMINISTRATOR")) {
      bot.sendMessage({to: channelID,message: "yeet"});;
    }
  }
//Darius
  if(cmd === "darius") {
    var myArray = [
      "https://giphy.com/gifs/fallontonight-tonight-show-nbc-ew-l41Ye7i203TfEADYs",
      "https://media.giphy.com/media/l0Exx1DQOB1h6r5Is/giphy.gif",
      "https://media.giphy.com/media/3ohfFm8e0JRnh4hdwQ/giphy.gif",
      "https://media.giphy.com/media/xUA7aNDWnBLyTpbCW4/giphy.gif",
      "https://media.giphy.com/media/gMDKyrWInxOhO/giphy.gif",
      "https://media.giphy.com/media/UWkDLtPkMKr9m/giphy.gif",
      "https://media.giphy.com/media/3o7TKs8b6ZIDchmUDe/giphy.gif",
      "https://media.giphy.com/media/o8VXwSvuLXhM4/giphy.gif",
      "https://media.giphy.com/media/5ts17yNB2tCdINe2Fi/giphy.gif",
      "https://media.giphy.com/media/3oriOiN0eR08su5G4E/giphy.gif",
      "https://media.giphy.com/media/fR7Svnbu3vb45fUblN/giphy.gif",
      "https://media.giphy.com/media/3o72F7JZvhCdCi6iyc/giphy.gif",
      "https://media.giphy.com/media/10C72XRaX76CLC/giphy.gif",
      "https://media.giphy.com/media/TUCGmddm9Kbny/giphy.gif",
      "https://media.giphy.com/media/3osxY5RChafe441XdS/giphy.gif",
      "https://media.giphy.com/media/dGZTqlyq5OHZe/giphy.gif",
      "https://media.giphy.com/media/zHrM1scRpH2JKzGGx3/giphy.gif",
      "https://media.giphy.com/media/3oriOiFKqCdsS0NxKw/giphy.gif",
      "https://media.giphy.com/media/RQty5ZP6uM2JO/giphy.gif",
      "https://media.giphy.com/media/4JXQBIracPVrKRmmiM/giphy.gif",
      "https://media.giphy.com/media/fvYo7xfecKr3a/giphy.gif",
      "https://media.giphy.com/media/iM3umKBc0DKbm/giphy.gif",
      "https://media.giphy.com/media/rPRlB39BwtNRK/giphy.gif",
      "https://media.giphy.com/media/Azde2TIzaNiak/giphy.gif",
      "https://media.giphy.com/media/JeK6Ws9Vukv8Q/giphy.gif",
      "https://media.giphy.com/media/J1A22IC0jYu2Y/giphy.gif",
      "https://media.giphy.com/media/k2A4gzRxDL4GI/giphy.gif",
      "https://media.giphy.com/media/xT39De8hjUtdP50Ffa/giphy.gif",
      "https://media.giphy.com/media/xT1R9yFzscIXMWxpOE/giphy.gif",
      "https://media.giphy.com/media/3o8dFEVMFacI1HP9ok/giphy.gif",
      "https://media.giphy.com/media/cIQWVGPe7QAmF7xDCs/giphy.gif",
      "https://media.giphy.com/media/TgKDmGO9NrNqg37bgE/giphy.gif",
      "https://media.giphy.com/media/3o752kCyOEX5b4y1CU/giphy.gif",
      "https://media.giphy.com/media/xUPOqaH1nPckVhWVVK/giphy.gif",
      "https://media.giphy.com/media/ulJqb38U1W0jhU80sD/giphy.gif",
      "https://media.giphy.com/media/1XddNncHsnyPwN8sV2/giphy.gif",
      "https://media.giphy.com/media/q0BjM8Fy5xM40/giphy.gif",
      "https://media.giphy.com/media/1jl9H9c0MQBsWHJkf9/giphy.gif",
      "https://media.giphy.com/media/lSnCBkPpilDIUOaTai/giphy.gif",
      "https://media.giphy.com/media/7IQ8GdOt4MXM6glceZ/giphy.gif",
      "https://media.giphy.com/media/vcnV29vDVl8U6KJuiR/giphy.gif",
      "https://media.giphy.com/media/Q4MdccKUcLIY/giphy.gif",
      "https://media.giphy.com/media/L7RNWv8TYz5DO/giphy.gif"
    ];

    var randomItem = myArray[Math.floor(Math.random()*myArray.length)];
     bot.sendMessage({to: channelID,message: randomItem});;
  }


})
