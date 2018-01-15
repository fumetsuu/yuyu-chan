const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const jsonfile = require('jsonfile')

const cmdPrefix = /^yuyu\s/;

client.on('ready', () => {
    console.log('準備OK!');
});

client.on('message', (msg) => {

    if(cmdPrefix.test(msg.content)) {
        var command = msg.content.split(" ")[1];
        var args = msg.content.split(" ").slice(2);
        console.log(`cmd: ${command}, args: ${args}`);
    }

});

client.login(jsonfile.readFileSync('auth.json').token);