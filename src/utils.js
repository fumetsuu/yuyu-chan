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
			//want to set 50x50 for each file,  30px padding 15 images each row
			const scaledDimensions = 90
			const margin = 40
			const stickersPerRow = 12
			var templateWidth = (scaledDimensions + margin) * stickersPerRow + margin //extra margin for right
			var templateHeight = Math.ceil(files.length / stickersPerRow) * (scaledDimensions + margin) + margin //extra margin for bottom
			var previewTemplate = new Jimp(templateWidth, templateHeight, (err, template) => {
				template.background(0xf5f5f3ff)
				var imgPosCounter = 0 //basically act as the index since Jimp.read is async
				for (var i = 0; i < files.length; i++) {
					var filePath = path.join(stickerFolderPath, files[i])
					Jimp.read(filePath, (err, img) => {
						img.contain(scaledDimensions, scaledDimensions, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
						var withMargin = margin + scaledDimensions
						var xPos = imgPosCounter % stickersPerRow
						var yPos = Math.floor(imgPosCounter / stickersPerRow)
						var xPixels = margin + withMargin * xPos
						var yPixels = margin + withMargin * yPos //yPos+1 for space on top
						Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(font => {
							template.print(font, xPixels + 5, yPixels + scaledDimensions + 2, files[imgPosCounter], 40)
						})
						template.composite(img, xPixels, yPixels)
						console.log(files[imgPosCounter], imgPosCounter, xPixels, yPixels)
						imgPosCounter++
						if (imgPosCounter == files.length) {
							previewTemplate.write('./ohhhh.jpg', (err, success) => {
								console.log(err, success)
							})
						}
					})
				}
			})
		})
	}
}
