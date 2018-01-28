const path = require('path')
const sticker = require(path.join(__dirname, '/commandsHelp/sticker.help.js'))
const addsticker = require(path.join(__dirname, '/commandsHelp/addsticker.help.js'))
const removesticker = require(path.join(__dirname, '/commandsHelp/removesticker.help.js'))
const stickerslist = require(path.join(__dirname, '/commandsHelp/stickerslist.help.js'))
const emoji = require(path.join(__dirname, '/commandsHelp/emoji.help.js'))
const numbersToLetters = require(path.join(__dirname, '/commandsHelp/numbersToLetters.help.js'))
const lettersToNumbers = require(path.join(__dirname, '/commandsHelp/lettersToNumbers.help.js'))
const yt = require(path.join(__dirname, '/commandsHelp/yt.help.js'))
const reactions = require(path.join(__dirname, '/commandsHelp/reactions.help.js'))
const stats = require(path.join(__dirname, '/commandsHelp/stats.help.js'))
const large = require(path.join(__dirname, '/commandsHelp/large.help.js'))
const anime = require(path.join(__dirname, '/commandsHelp/anime.help.js'))

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
