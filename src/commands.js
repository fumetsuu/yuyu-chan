const sticker = require('./commands/sticker.js')
const addsticker = require('./commands/addsticker.js')
const removesticker = require('./commands/removesticker.js')
const stickerslist = require('./commands/stickerslist.js')
const emoji = require('./commands/emoji.js')
const numbersToLetters = require('./commands/numbersToLetters.js')
const lettersToNumbers = require('./commands/lettersToNumbers.js')
const yt = require('./commands/yt.js')
const reactions = require('./commands/reactions.js')
const stats = require('./commands/stats.js')
const large = require('./commands/large.js')
const anime = require('./commands/anime.js')

const commands = {
	sticker: sticker,
	addsticker: addsticker,
	removesticker: removesticker,
	stickerslist: stickerslist,
	'e/': emoji,
	ntl: numbersToLetters,
	ltn: lettersToNumbers,
	yt: yt,
	react: reactions,
	stats: stats,
	large: large,
	anime: anime
}

module.exports = commands
