module.exports = function addstickerHelp(msg) {
	var helpEmbed = {
		title: `y/addsticker <stickername> <img link>`,
		description:
			'adds a sticker to the database, which is then available with `s/stickername` \n valid stickername: `[A-Za-z0-9_-]` \n valid image formats: `png` `jpeg` `jpg` `gif`',
		fields: [
			{
				name: 'example',
				value: '`y/addsticker umaru http://anime.com/umaru.png`'
			}
		],
		color: 6815222
	}
	msg.channel.send({ embed: helpEmbed })
}
