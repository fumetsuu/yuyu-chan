const Discord = require('discord.js')
const client = new Discord.Client()
const fs = require('fs')
const jsonfile = require('jsonfile')
const cmdPrefix = /^y\//

client.on('ready', () => {
    console.log('準備OK!')
})

var config = jsonfile.readFileSync('conf.json')
client.login(config.token)
const helpcommand = require('./src/commands/help.js')
const commands = require('./src/commands.js')
const commandsList = Object.keys(commands)
client.on('message', (msg) => {

    //handle sticker trigger without normal prefix
    if(/^s\//.test(msg.content)) {
        commands['sticker'](msg)
    }

    //handle emoji trigger without normal prefix
    if(/^e\//.test(msg.content)) {
        commands['emoji'](msg)
    }

    if(cmdPrefix.test(msg.content)) {
        var command = msg.content.split("/")[1].split(" ")[0]
        var args = msg.content.split(" ").slice(1)
        console.log(`cmd: ${command}   |    args: ${args}`)
        if(commandsList.includes(command)) {
            commands[command](msg, args)
        } else if(command == 'help') {
            helpcommand(msg, args)
        } else {
            msg.channel.send('Invalid Command desu')
        }

    }
})