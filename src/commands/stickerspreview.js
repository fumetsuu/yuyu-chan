const fs = require('fs')
const utils = require('../utils.js')
const logger = require('../logger.js')

module.exports = function stickerspreview(msg, args) {
	var previewDataPath = './src/stickers/previewData.json'
	logger.info('called', 'trying to call genStickersPreview()')
	var forceUpdate = false
	if (args.includes('force=true')) {
		forceUpdate = true
	}
	//store number of stickers in previewInfo.json then check with stickers folder if there is a differing number of stickers
	var stickersInFolder = fs.readdirSync('./src/stickers/stickerImgs').length
	fs.readFile(previewDataPath, (err, data) => {
		var previewData = JSON.parse(data)
		if (!previewData.stickerCount || previewData.stickerCount != stickersInFolder || forceUpdate) {
			var loadingMsg
			msg.channel
				.send({
					embed: {
						title: 'generating preview image',
						description: 'please wait...'
					}
				})
				.then(message => {
					loadingMsg = message
				})
			utils.genStickersPreview('./src/stickers/preview.jpg', (err, file, count) => {
				previewData['stickerCount'] = count //update json file
				previewData['previewFile'] = file
				logger.success('sending', 'sending new preview')
				msg.channel.send({ files: [file] }).then(msg => {
					loadingMsg.delete()
					logger.info('sent', 'sent new preview')
					fs.writeFileSync(previewDataPath, JSON.stringify(previewData))
				})
			})
		} else if (previewData.stickerCount == stickersInFolder) {
			var loadingMsg
			msg.channel
				.send({
					embed: {
						title: 'sending preview image',
						description: 'please wait...'
					}
				})
				.then(message => {
					loadingMsg = message
				})
			//if stickerCount exists and is the same as number of files
			logger.success('sending', 'sending unchanged preview!!')
			msg.channel.send({ files: [previewData.previewFile] }).then(msg => {
				loadingMsg.delete()
			})
		} else {
			logger.err('huh', 'uhmmmmm')
		}
	})
}
