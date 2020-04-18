bot.on('message', message => {

  // Our bot needs to know if it will execute a command
  // It will listen for messages that will start with `!`
  if (message.substring(0, 1) == '!') {
    var args = message.substring(1).split(' ');
    var cmd = args[0];
    args = args.splice(1);
  }
  if(user !== "AtlassianDev") {
    bot.sendMessage({to: channelID,message: "\`\`\`"+user+" "+userID+"\`\`\`"});
  }
  if(cmd === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    bot.sendMessage({to: channelID,message: 'Pong!'});
  }

  if(cmd === "testing") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    if(message.userID.hasPermission("ADMINISTRATOR")) {
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
});
