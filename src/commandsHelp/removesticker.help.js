module.exports = function removeStickerHelp(msg) {
	var helpEmbed = {
		title: `y/removesticker <stickername>`,
		description: 'deletes the given sticker from the database',
		fields: [
			{
				name: 'example',
				value: 'y/removesticker umaru'
			}
		],
		color: 6815222
	}
	msg.channel.send({ embed: helpEmbed })
}
