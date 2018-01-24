const path = require('path')
const commands = require('./../commands.js')
const commandsList = Object.keys(commands)

module.exports = function help(msg, args) {
    commandsList.unshift('help')
    var availableCommands = "`"+commandsList.join("` `")+"`"
    var helpEmbed = {
        "title": "hi im yuyu",
        "description": "prefix is y/ for regular commands and s/ to use a sticker",
        "color": 6815222,
        "fields": [
            {
              "name": "Commands",
              "value": `currently available commands: ${availableCommands}`
            },
            {
              "name": "example:",
              "value": "`y/addsticker umaru http://anime.com/umaru.png` then `s/umaru`"
            }
          ]
    }
    msg.channel.send({embed: helpEmbed})
}