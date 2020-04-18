//var Discord = require('discord.io');
var config = require('./config.json');

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('Pong!');
  }
  if (msg.content === 'test') {
    msg.reply('Pong!');
  }
});

client.login('token');

client.login(config.token);
