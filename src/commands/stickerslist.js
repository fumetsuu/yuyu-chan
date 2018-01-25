const jsonfile = require('jsonfile')
const stickerMap = jsonfile.readFileSync('./src/stickers/stickerMap.json')
const stickerNames = Object.keys(stickerMap)

module.exports = function stickerslist(msg) {
	var stickersList = '`' + stickerNames.join('`\n`') + '`'
	var listEmbed = {
		title: 'Stickers List',
		description: `${stickersList}`,
		color: 6815222,
		timestamp: '2018-01-23T22:31:44.056Z',
		footer: {
			icon_url: `${msg.author.avatarURL}`,
			text: `stickers list requested by ${msg.author.username}`
		}
	}
	msg.channel.send({ embed: listEmbed })
}
