const jsonfile = require('jsonfile')
const upper = require('upper-case')
const largeData = jsonfile.readFileSync('./src/data/reacts.json') //uses large emoji which is the same for reactions
const availableKeys = Object.keys(largeData)
const logger = require('../logger.js')

module.exports = function large(msg, args) {
	//takes the entire string (with spaces included) to output largified
	var stringToEnlargen = upper(args.join(' '))
	var largeString = ''
	for (var i = 0; i < stringToEnlargen.length; i++) {
		if (availableKeys.includes(stringToEnlargen[i])) {
			largeString += `${largeData[stringToEnlargen[i]]} `
		}
	}
	if (largeString === '') {
		var invalidEmbed = {
			title: 'invalid 🙁',
			description: `i can't understand **${stringToEnlargen}**`,
			color: 6815222,
			timestamp: `${new Date().toISOString()}`,
			footer: {
				icon_url: `${msg.author.avatarURL}`,
				text: `invalid string by ${msg.author.username}`
			}
		}
		msg.channel.send({ embed: invalidEmbed })
		return
	}
	msg.delete()
	msg.channel.send(`\`${msg.author.username}\` ${largeString}`)
}
