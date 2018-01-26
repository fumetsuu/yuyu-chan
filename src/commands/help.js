const path = require('path')
const commands = require('./../commands.js')
const commandsList = Object.keys(commands)
const commandsHelp = require('../commandsHelp.js')
const logger = require('../logger.js')

module.exports = function help(msg, args) {
	//further commands help
	if (commandsList.includes(args[0])) {
		logger.info('extra help', 'getting more help for command' + args[0])
		commandsHelp[args[0]](msg)
	} else {
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
				}
			]
		}
		msg.channel.send({ embed: helpEmbed })
	}
}
