const fs = require('fs')
const path = require('path')
const Jimp = require('jimp')
const sizeOf = require('image-size')
const logger = require(path.join(__dirname, '/logger.js'))
const async = require('async')

module.exports = utils = {
	genStickersPreview: function(outPath, cb) {
		const stickerFolderPath = path.join(__dirname, './stickers/stickerImgs')
		fs.readdir(stickerFolderPath, (err, files) => {
			var start = new Date().getTime()
			const scaledDimensions = 90
			const margin = 60
			const stickersPerRow = 12
			var templateWidth = (scaledDimensions + margin) * stickersPerRow + margin //extra margin for right
			var templateHeight = Math.ceil(files.length / stickersPerRow) * (scaledDimensions + margin) + margin //extra margin for bottom
			// var stickerBorder = new Jimp(scaledDimensions, scaledDimensions, 0xffffff00, (err, border) => {
			// 	const fillBorder = makeIteratorThatFillsWithColor(0x000000aa)
			// 	border.scan(0, 0, scaledDimensions, 1, fillBorder)
			// 	border.scan(0, scaledDimensions - 1, scaledDimensions, 1, fillBorder)
			// 	border.scan(0, 0, 1, scaledDimensions, fillBorder)
			// 	border.scan(scaledDimensions - 1, 0, 1, scaledDimensions, fillBorder)
			// })
			var previewTemplate = new Jimp(templateWidth, templateHeight, (err, template) => {
				template.background(0xffffffff)
				var imgPosCounter = 0 //basically act as the index since Jimp.read is async
				var stickerNames = []
				var filePath //for scope
				async.until(
					() => imgPosCounter == files.length,
					function(next) {
						//next is important !! :)
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
							//maybe add border here (low level) create border as var Jimp above
							template.composite(img, xPixels, yPixels)
							// template.composite(stickerBorder, xPixels, yPixels)
							//console.log(files[imgPosCounter], imgPosCounter, xPixels, yPixels)
							imgPosCounter++
							next()
						})
					},
					(err, results) => {
						Jimp.loadFont(Jimp.FONT_SANS_16_BLACK).then(font => {
							for (var i = 0; i < stickerNames.length; i++) {
								var withMargin = margin + scaledDimensions
								var xPos = i % stickersPerRow
								var yPos = Math.floor(i / stickersPerRow)
								var xPixels = margin + withMargin * xPos
								var yPixels = margin + withMargin * yPos
								template.print(font, xPixels + 5, yPixels + scaledDimensions + 2, stickerNames[i])
							}
							previewTemplate.write(outPath, (err, success) => {
								logger.success('file written', success + ' time taken : ' + (new Date().getTime() - start) + 'ms')
								cb(err, outPath, files.length) //finished processing, calls cb (cb function passed to genStickersPreview())
							})
						})
					}
				)
			})
		})

		function makeIteratorThatFillsWithColor(color) {
			//Jimp #202
			return function(x, y, offset) {
				this.bitmap.data.writeUInt32BE(color, offset, true)
			}
		}
	}
}
