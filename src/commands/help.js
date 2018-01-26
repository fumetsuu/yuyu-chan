const path = require('path')
const commands = require('./../commands.js')
const commandsList = Object.keys(commands)
const commandsHelp = require('../commandsHelp.js')
const logger = require('../logger.js')

module.exports = function help(msg, args) {
	if (!args[0]) {
		commandsList.unshift('help')
		var availableCommands = '`' + commandsList.join('` `') + '`'
		var helpEmbed = {
			title: 'hi im yuyu',
			description: 'prefix is y/ for regular commands and s/ to use a sticker',
			color: 6815222,
			fields: [
				{
					name: 'Commands',
					value: `currently available commands: ${availableCommands}`
				},
				{
					name: 'example:',
					value: '`y/addsticker umaru http://anime.com/umaru.png` then `s/umaru`'
				},
				{
					name: 'specific command help',
					value: 'get more info about a specific command: `y/help <commandname>`'
				}
			]
		}
		msg.channel.send({ embed: helpEmbed })
		return
	}
	if (commandsList.includes(args[0]) && args[0] != 'help') {
		logger.info('extra help', 'getting more help for command' + args[0])
		commandsHelp[args[0]](msg)
	} else if (args[0] == 'help') {
		msg.channel.send('meta')
		return
	} else {
		var invalidEmbed = {
			title: `invalid command`,
			description: "that command doesn't exist so you can't get help for it ...",
			color: 6815222
		}
		msg.channel.send({ embed: invalidEmbed })
		return
	}
}
