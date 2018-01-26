module.exports = function stickerslistHelp(msg) {
	var helpEmbed = {
		title: `y/stickerslist`,
		description: 'lists all available stickers',
		fields: [
			{
				name: 'example',
				value: '`y/stickerslist`'
			}
		],
		color: 6815222
	}
	msg.channel.send({ embed: helpEmbed })
}
