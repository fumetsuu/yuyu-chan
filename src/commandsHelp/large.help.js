module.exports = function largeHelp(msg) {
	var helpEmbed = {
		title: `y/large <string>`,
		description: 'converts the given string into large letters (as emoji) \n currently available letters: `[A-Z0-9!?#]',
		fields: [
			{
				name: 'example',
				value: '`y/large yuyu` =>  `(username)` 🇾 🇺 🇾 🇺'
			}
		],
		color: 6815222
	}
	msg.channel.send({ embed: helpEmbed })
}
