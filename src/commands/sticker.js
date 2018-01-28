const path = require('path')
const jsonfile = require('jsonfile')

module.exports = function sticker(msg) {
	var stickerMap = jsonfile.readFileSync(path.join(__dirname, '../stickers/stickerMap.json'))
	var stickersList = Object.keys(stickerMap)
	var stickerName = msg.content.split('/')[1]
	if (/^y\//.test(msg.content)) {
		stickerName = msg.content.split(' ')[1]
	}
	if (stickersList.includes(stickerName)) {
		var stickerFile = stickerMap[stickerName]
		if (/^https?:\/\//.test(stickerFile)) {
			//redundant
			if (!/\.(png|jpe?g|gif)$/.test(stickerFile)) {
				stickerFile = stickerFile + '.jpg'
			}
		} else {
			stickerFile = path.join(__dirname, `../stickers/stickerImgs/${stickerFile}`)
		}
	} else if (stickerName == '') {
		var stickerFile = path.join(__dirname, `../stickers/stickerImgs/${stickerMap[stickersList[Math.floor(Math.random() * stickersList.length)]]}`)
	} else {
		var invalidEmbed = {
			title: "Sticker doesn't exist...",
			description: `**${stickerName}** is not a valid sticker!`,
			color: 6815222,
			timestamp: `${new Date().toISOString()}`,
			footer: {
				icon_url: `${msg.author.avatarURL}`,
				text: `invalid sticker request by ${msg.author.username}`
			}
		}
		msg.channel.send({ embed: invalidEmbed })
		return
	}
	console.log(`sending ${stickerFile}...`)
	msg.channel.send('', {
		files: [stickerFile]
	})
}
