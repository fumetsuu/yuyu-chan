const fs = require('fs')
const request = require('request')
const path = require('path')
const Jimp = require('jimp')
const logger = require('../logger.js')

export default function addsticker(msg, args) {
	var stickerName = args[0]

	var stickerURL
	if (msg.attachments.findKey(val => val.url)) {
		stickerURL = msg.attachments.array()[0].url
	} else {
		stickerURL = args[1]
	}

	var resizedWidthTemp, resizedWidth
	for (var i = 1; i < args.length; i++) {
		if (/^w=/.test(args[i])) {
			resizedWidthTemp = args[i].split('=')[1]
		}
	}
	if (!resizedWidthTemp) {
		resizedWidth = false
	} else if (Number(resizedWidthTemp) && Number(resizedWidthTemp) <= 800) {
		resizedWidth = Number(resizedWidthTemp)
	} else {
		logger.err('width', 'width error')
		sendInvalid(msg)
		return
	}

	if (/(?![A-Za-z0-9\_\-])./g.test(stickerName) || /.svg$/.test(stickerURL)) {
		logger.err('name', 'name/url err')
		sendInvalid(msg)
		return
	}

	if (/\.(gif)$/.test(stickerURL)) {
		//Jimp doesn't support gif :( this is fallback
		request
			.get(stickerURL, (err, response, content) => {
				if (err) {
					console.log('something went wrong with the addsticker command, sending error embed...')
					sendInvalid(msg)
					return
				}
			})
			.on('response', res => {
				var newStickerFile = fs.createWriteStream(path.join(__dirname, `../stickers/stickerImgs/${stickerName}.gif`))
				var filext = 'gif'
				res.pipe(newStickerFile)
				newStickerFile.on('finish', () => {
					writeAndSuccess(stickerName, msg, stickerURL, filext)
				})
			})
	} else {
		Jimp.read(stickerURL)
			.then(stickerImage => {
				var newStickerFile = path.join(__dirname, `../stickers/stickerImgs/${stickerName}.${stickerImage.getExtension()}`)
				var filext = stickerImage.getExtension()
				if (resizedWidth) {
					stickerImage.resize(resizedWidth, Jimp.AUTO, () => {
						stickerImage.write(newStickerFile, err => {
							if (err) logger.err('error?', err)
							writeAndSuccess(stickerName, msg, stickerURL, filext)
						})
					})
				} else {
					stickerImage.write(newStickerFile, err => {
						if (err) logger.err('error no resize', err)
						writeAndSuccess(stickerName, msg, stickerURL, filext)
					})
				}
			})
			.catch(err => {
				logger.err('add sticker error', err)
				sendInvalid(msg)
				return
			})
	}
}

function sendInvalid(msg) {
	var errorEmbed = {
		title: "Couldn't add sticker",
		description:
			"yuyu chan couldn't add the sticker for some reason... \n make sure that the image is a valid url and that the addsticker command is in the form: ```y/addsticker stickername <imageurl>? <width>?``` \n and that the sticker name is valid \n w=<number> <number> must be a number <= 800",
		color: 6815222,
		timestamp: new Date().toISOString(),
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

function writeAndSuccess(stickerName, msg, stickerURL, filext) {
	fs.readFile(path.join(__dirname, '../stickers/stickerMap.json'), (err, data) => {
		var stickermapjson = JSON.parse(data)
		stickermapjson[stickerName] = `${stickerName}.${filext}`
		var successEmbed = {
			title: 'New Sticker Added!',
			description: `added sticker **${stickerName}**, it should now be available with **s/${stickerName}** \n note gifs won't be resized`,
			color: 6815222,
			timestamp: new Date().toISOString(),
			footer: {
				icon_url: `${msg.author.avatarURL}`,
				text: `Sticker added by ${msg.author.username}`
			},
			thumbnail: {
				url: `${stickerURL}`
			}
		}
		msg.channel.send({ embed: successEmbed }).then(msg => {
			fs.writeFile(path.join(__dirname, '../stickers/stickerMap.json'), JSON.stringify(stickermapjson), err => {
				if (err) throw err
			})
		})
	})
}
