const fs = require('fs')
const utils = require('../utils.js')
const logger = require('../logger.js')
const previewDataPath = './src/stickers/previewData.json'

module.exports = function stickerspreview(msg, args) {
	logger.info('called', 'trying to call genStickersPreview()')
	//store number of stickers in previewInfo.json then check with stickers folder if there is a differing number of stickers
	var stickersInFolder = fs.readdirSync('./src/stickers/stickerImgs').length
	fs.readFile(previewDataPath, (err, data) => {
		var previewData = JSON.parse(data)
		if (!previewData.stickerCount || previewData.stickerCount != stickersInFolder) {
			utils.genStickersPreview('./src/stickers/preview.jpg', async (err, file, count) => {
				previewData['stickerCount'] = count //update json file
				previewData['previewFile'] = file
				logger.success('sending', 'sending new preview')
				await msg.channel.send({ files: [file] })
				fs.writeFile(previewDataPath, JSON.stringify(previewData))
			})
		} else if (previewData.stickerCount == stickersInFolder) {
			//if stickerCount exists and is the same as number of files
			logger.success('sending', 'sending unchanged preview!!')
			msg.channel.send({ files: [previewData.previewFile] })
		} else {
			logger.err('huh', 'uhmmmmm')
		}
	})
}
