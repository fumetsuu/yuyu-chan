const utils = require('../utils.js')
const logger = require('../logger.js')

module.exports = function stickerspreview(msg, args) {
	logger.info('called', 'trying to call genStickersPreview()')
	utils.genStickersPreview()
}
