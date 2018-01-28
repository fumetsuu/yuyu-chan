const path = require('path')
const jsonfile = require('jsonfile')

module.exports = function stickerslist(msg) {
	var stickerMap = jsonfile.readFileSync(path.join(__dirname, '../stickers/stickerMap.json'))
	var stickerNames = Object.keys(stickerMap)
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
