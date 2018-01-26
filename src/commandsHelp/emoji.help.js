module.exports = function emojiHelp(msg) {
	var helpEmbed = {
		title: `y/emoji <category>? <number>?`,
		description:
			'shortcut: `e/<category>? <number>?` \n sends one or more random emoji (from the specified category if there is one) \n category can be one of: `people` `nature` `food` `activity` `places` `objects` `symbols` `flags` \n max number of emoji: `200`',
		fields: [
			{
				name: 'example',
				value: '`e/food 50 //sends 50 food emoji`'
			}
		],
		color: 6815222
	}
	msg.channel.send({ embed: helpEmbed })
}
