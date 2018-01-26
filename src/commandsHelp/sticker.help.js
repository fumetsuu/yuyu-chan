module.exports = function stickerHelp(msg) {
	var helpEmbed = {
		title: `y/sticker <stickername>?`,
		description: 'shortcut: `s/<stickername>?` \n sends the sticker associated with the given stickername',
		fields: [
			{
				name: 'example',
				value: '`s/umaru`'
			},
			{
				name: 'note',
				value: 'will send a random sticker if `stickername` is not specified'
			}
		],
		color: 6815222
	}
	msg.channel.send({ embed: helpEmbed })
}
