const fs = require('fs')
const path = require('path')
const Jimp = require('jimp')
const sizeOf = require('image-size')
const logger = require('./logger.js')

module.exports = utils = {
	genStickersPreview: function() {
		const stickerFolderPath = path.join(__dirname, './stickers')
		fs.readdir(stickerFolderPath, (err, files) => {
			var start = new Date().getTime()
			files = files.filter(f => !/(.gitignore|stickerMap.json)/.test(f))
			//want to set the width to 50px for each file, max width of template 30px padding 15 images
			var templateWidth = 1250
			var templateHeight = 0
			files.forEach(file => {
				var dimensions = sizeOf(path.join(stickerFolderPath, file))
				templateHeight += 30 + dimensions.height / dimensions.width * 50
				console.log(dimensions.height / dimensions.width * 50)
			})
			console.log(templateHeight)
			logger.info('end', new Date().getTime() - start + ' ms')
		})
	}
}
