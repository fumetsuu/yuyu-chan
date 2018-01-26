const sticker = require('./commandsHelp/sticker.help.js')
const addsticker = require('./commandsHelp/addsticker.help.js')
const removesticker = require('./commandsHelp/removesticker.help.js')
const stickerslist = require('./commandsHelp/stickerslist.help.js')
const emoji = require('./commandsHelp/emoji.help.js')
const numbersToLetters = require('./commandsHelp/numbersToLetters.help.js')
const lettersToNumbers = require('./commandsHelp/lettersToNumbers.help.js')
const yt = require('./commandsHelp/yt.help.js')
const reactions = require('./commandsHelp/reactions.help.js')
const stats = require('./commandsHelp/stats.help.js')
const large = require('./commandsHelp/large.help.js')
const anime = require('./commandsHelp/anime.help.js')

const commandsHelp = {
	sticker: sticker,
	addsticker: addsticker,
	removesticker: removesticker,
	stickerslist: stickerslist,
	emoji: emoji,
	ntl: numbersToLetters,
	ltn: lettersToNumbers,
	yt: yt,
	react: reactions,
	stats: stats,
	large: large,
	anime: anime
}

module.exports = commandsHelp
