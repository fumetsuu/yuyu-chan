const fs = require('fs')
const path = require('path')
const Jimp = require('jimp')
const sizeOf = require('image-size')
const logger = require('./logger.js')
const async = require('async')

module.exports = utils = {
	genStickersPreview: function () {
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
				var stickerNames = []
				var filePath //for scope
				async.until(
					() => imgPosCounter == files.length,
					function (next) { //next is important !! :)
						filePath = path.join(stickerFolderPath, files[imgPosCounter])
						Jimp.read(filePath, (err, img) => {
							// console.log(files[imgPosCounter], img, imgPosCounter, template)
							stickerNames.push(files[imgPosCounter])
							img.contain(scaledDimensions, scaledDimensions, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE)
							var withMargin = margin + scaledDimensions
							var xPos = imgPosCounter % stickersPerRow
							var yPos = Math.floor(imgPosCounter / stickersPerRow)
							var xPixels = margin + withMargin * xPos
							var yPixels = margin + withMargin * yPos
							template.composite(img, xPixels, yPixels)
							//console.log(files[imgPosCounter], imgPosCounter, xPixels, yPixels)
							imgPosCounter++
							next()
						})
					}, (err, results) => {
						console.log('heyyy')
						Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(font => {
							for (var i = 0; i < stickerNames.length; i++) {
								var withMargin = margin + scaledDimensions
								var xPos = i % stickersPerRow
								var yPos = Math.floor(i / stickersPerRow)
								var xPixels = margin + withMargin * xPos
								var yPixels = margin + withMargin * yPos
								template.print(font, xPixels + 5, yPixels + scaledDimensions + 2, stickerNames[i], 40)
							}
							previewTemplate.write('./ohhhh.jpg', (err, success) => {
								logger.success('file written', success + ' time taken : ' + (new Date().getTime() - start) + 'ms')
							})
						})
					}
				)
			})
		})
	}
}