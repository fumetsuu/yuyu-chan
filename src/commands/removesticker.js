const path = require('path')
const fs = require('fs')
const jsonfile = require('jsonfile')

module.exports = async function removesticker(msg, args) {
	var stickerMap = jsonfile.readFileSync(path.join(__dirname, '../stickers/stickerMap.json'))
	var stickersList = Object.keys(stickerMap)
	var stickerName = args[0]
	if (stickersList.includes(stickerName)) {
		if (!/^https?:\/\//.test(stickerMap[stickerName])) {
			var stickerFile = path.join(__dirname, `../stickers/stickerImgs/${stickerMap[stickerName]}`)
			var successEmbed = {
				title: 'Sticker Deleted!',
				description: `deleted sticker **${stickerName}**`,
				color: 6815222,
				timestamp: `${new Date().toISOString()}`,
				footer: {
					icon_url: `${msg.author.avatarURL}`,
					text: `Sticker deleted by ${msg.author.username}`
				}
			}
			await msg.channel.send({ embed: successEmbed })
			fs.readFile('./src/stickers/stickerMap.json', (err, data) => {
				var stickermapjson = JSON.parse(data)
				delete stickermapjson[stickerName]
				fs.unlinkSync(stickerFile)
				fs.writeFile(path.join(__dirname, '../stickers/stickerMap.json'), JSON.stringify(stickermapjson), err => {
					if (err) throw err
				})
			})
		}
	} else {
		var invalidEmbed = {
			title: "Sticker doesn't exist...",
			description: `**${stickerName}** could not be deleted because it does not exist!`,
			color: 6815222,
			timestamp: `${new Date().toISOString()}`,
			footer: {
				icon_url: `${msg.author.avatarURL}`,
				text: `invalid sticker delete by ${msg.author.username}`
			}
		}
		msg.channel.send({ embed: invalidEmbed })
	}
}
