module.exports = function ytHelp(msg) {
	var helpEmbed = {
		title: `y/yt`,
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
