const fs = require('fs')
const request = require('request')
const path = require('path')

module.exports = function addsticker(msg, args) {
	var stickerName = args[0],
		stickerURL = args[1]
	if (/(?![A-Za-z0-9\_\-])./g.test(stickerName) || /.svg$/.test(stickerURL)) {
		sendInvalid(msg)
		return
	}

	request
		.get(stickerURL, (err, response, content) => {
			if (err) {
				console.log('something went wrong with the addsticker command, sending error embed...')
				sendInvalid(msg)
				return
			}
		})
		.on('response', res => {
			if (/\.(gif)$/.test(stickerURL)) {
				var newStickerFile = fs.createWriteStream(`./src/stickers/${stickerName}.gif`)
				var filext = 'gif'
			} else {
				var newStickerFile = fs.createWriteStream(`./src/stickers/${stickerName}.jpg`)
				var filext = 'jpg'
			}
			res.pipe(newStickerFile)
			newStickerFile.on('finish', () => {
				fs.readFile('./src/stickers/stickerMap.json', async (err, data) => {
					var stickermapjson = JSON.parse(data)
					stickermapjson[stickerName] = `${stickerName}.${filext}`
					var successEmbed = {
						title: 'New Sticker Added!',
						description: `added sticker **${stickerName}**, it should now be available with **s/${stickerName}**`,
						color: 6815222,
						timestamp: `${new Date().toISOString()}`,
						footer: {
							icon_url: `${msg.author.avatarURL}`,
							text: `Sticker added by ${msg.author.username}`
						},
						thumbnail: {
							url: `${stickerURL}`
						}
					}
					await msg.channel.send({ embed: successEmbed })
					fs.writeFile('./src/stickers/stickerMap.json', JSON.stringify(stickermapjson), err => {
						if (err) throw err
					})
				})
			})
		})
}

function sendInvalid(msg) {
	var errorEmbed = {
		title: "Couldn't add sticker",
		description:
			"yuyu chan couldn't add the sticker for some reason... \n make sure that the image is a valid url and that the addsticker command is in the form: ```y/addsticker stickername imageurl``` \n and that the sticker name is valid",
		color: 6815222,
		timestamp: '2018-01-23T22:31:44.056Z',
		footer: {
			icon_url: `${msg.author.avatarURL}`,
			text: `addsticker failed by ${msg.author.username}`
		},
		thumbnail: {
			url: 'http://i.imgur.com/FpKId7M.png'
		}
	}
	msg.channel.send({ embed: errorEmbed })
}
