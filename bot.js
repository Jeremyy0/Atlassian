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
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
});

client.login(config.token);
