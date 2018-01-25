const sticker = require('./commands/sticker.js')
const addsticker = require('./commands/addsticker.js')
const removesticker = require('./commands/removesticker.js')
const stickerslist = require('./commands/stickerslist.js')
const emoji = require('./commands/emoji.js')

const commands = {
	sticker: sticker,
	addsticker: addsticker,
	removesticker: removesticker,
	stickerslist: stickerslist,
	'e/': emoji
}

module.exports = commands
