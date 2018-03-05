const path = require('path');
const sticker = require(path.join(__dirname, '/commands/sticker.js'));
const addsticker = require(path.join(__dirname, '/commands/addsticker.js'));
const removesticker = require(path.join(__dirname, '/commands/removesticker.js'));
const stickerslist = require(path.join(__dirname, '/commands/stickerslist.js'));
const emoji = require(path.join(__dirname, '/commands/emoji.js'));
const numbersToLetters = require(path.join(__dirname, '/commands/numbersToLetters.js'));
const lettersToNumbers = require(path.join(__dirname, '/commands/lettersToNumbers.js'));
const yt = require(path.join(__dirname, '/commands/yt.js'));
const reactions = require(path.join(__dirname, '/commands/reactions.js'));
const stats = require(path.join(__dirname, '/commands/stats.js'));
const large = require(path.join(__dirname, '/commands/large.js'));
const anime = require(path.join(__dirname, '/commands/anime.js'));
const stickerspreview = require(path.join(__dirname, '/commands/stickerspreview.js'));
const prune = require(path.join(__dirname, '/commands/prune'));

const commands = {
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
	anime: anime,
	stickerspreview: stickerspreview,
	prune: prune
}

module.exports = commands
