const jsonfile = require('jsonfile')
const stickerMap = jsonfile.readFileSync('./src/stickers/stickerMap.json')
const stickerNames = Object.keys(stickerMap)

module.exports = function stickerslist(msg) {
	var stickersList = '`' + stickerNames.join('` `') + '`'
	var listEmbed = {
		title: 'Stickers List',
		description: `${stickersList}`,
		color: 6815222,
		timestamp: `${new Date().toISOString()}`,
		footer: {
			icon_url: `${msg.author.avatarURL}`,
			text: `stickers list requested by ${msg.author.username}`
		}
	}
	msg.channel.send({ embed: listEmbed })
}
