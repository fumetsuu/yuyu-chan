const path = require('path')
const jsonfile = require('jsonfile')
const stickerMap = jsonfile.readFileSync('./src/stickers/stickerMap.json')
const stickersList = Object.keys(stickerMap)

module.exports = function sticker(msg) {
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
			stickerFile = `${__dirname}/../stickers/${stickerFile}`
		}
	} else if (stickerName == '') {
		var stickerFile = `${__dirname}/../stickers/${stickerMap[stickersList[Math.floor(Math.random() * stickersList.length)]]}`
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
