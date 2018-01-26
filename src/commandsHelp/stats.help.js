module.exports = function statsHelp(msg) {
	var helpEmbed = {
		title: `y/stats`,
		description: 'nothing yet',
		fields: [
			{
				name: 'example',
				value: 'oh.'
			}
		],
		color: 6815222
	}
	msg.channel.send({ embed: helpEmbed })
}
