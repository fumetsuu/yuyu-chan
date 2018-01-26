module.exports = function reactionsHelp(msg) {
	var helpEmbed = {
		title: `y/react <string>`,
		description: 'reacts to the most recently sent message with the letters in the given string \n currently available react keys: `[A-Z0-9#!?]`',
		fields: [
			{
				name: 'example',
				value: 'y/react abc123'
			},
			{
				name: 'note',
				value: 'each key can only be used once in a reaction (i.e. `y/react aab` only reacts with 🇦 🇧'
			}
		],
		color: 6815222
	}
	msg.channel.send({ embed: helpEmbed })
}
