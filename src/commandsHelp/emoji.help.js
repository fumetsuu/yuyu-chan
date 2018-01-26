const jsonfile = require('jsonfile')
const emojidata = jsonfile.readFileSync('./src/data/emojidata.json')
const categories = emojidata.categories
const MAX_EMOJI = 200
const argsRegex = /\w+\s\d+/
const argsRegex2 = /^\w+/

module.exports = function emoji(msg) {
	var category = categories[Math.floor(Math.random() * categories.length)]
	var emojiCount = 1
	var argstring = msg.content.split('/')[1]
	//set defaults ^
	if (/^y\//.test(msg.content)) {
		argstring = msg.content
			.split(' ')
			.slice(1)
			.join(' ')
	}
	if (argstring) {
		//if has args
		if (argsRegex.test(argstring)) {
			//if passes format for specific number of emoji
			if (categories.includes(argstring.split(' ')[0]) && !isNaN(parseInt(argstring.split(' ')[1]))) {
				var category = argstring.split(' ')[0]
				var ectemp = parseInt(argstring.split(' ')[1])
				if (ectemp > 0 && ectemp <= MAX_EMOJI) {
					var emojiCount = ectemp
				} else {
					var emojiCount = MAX_EMOJI
				}
			} else {
				sendInvalid(msg)
				return
			}
		} else if (argsRegex2.test(argstring.split(' ')[0])) {
			if (categories.includes(argstring.split(' ')[0])) {
				var category = argstring.split(' ')[0]
				var emojiCount = 1
			} else if (!isNaN(parseInt(argstring.split(' ')[0]))) {
				var emojiCount = parseInt(argstring.split(' ')[0])
			} else {
				sendInvalid(msg)
				return
			}
		}
	}
	if (emojiCount == 1) {
		var randomEmoji = emojidata[category][Math.floor(Math.random() * emojidata[category].length)]
		msg.channel.send(randomEmoji)
		msg.delete()
	} else {
		var randomEmojis = ''
		for (var i = 0; i < emojiCount; i++) {
			var randomEmoji = emojidata[category][Math.floor(Math.random() * emojidata[category].length)]
			randomEmojis += randomEmoji
		}
		msg.channel.send(randomEmojis)
		msg.delete()
	}
}

function sendInvalid(msg) {
	var invalidEmbed = {
		title: 'Invalid emoji category',
		description:
			'try `e/category number` with `category` as one of `people` `nature` `food` `activity` `places` `objects` `symbols` `flags` or leave it blank for a random emoji from all categories, number should be `<=200`',
		color: 6815222,
		timestamp: `${new Date().toISOString()}`,
		footer: {
			icon_url: `${msg.author.avatarURL}`,
			text: `invalid emoji category by ${msg.author.username}`
		}
	}
	msg.channel.send({ embed: invalidEmbed })
}
