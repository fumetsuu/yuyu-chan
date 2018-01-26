const unique = require('array-unique')
const upper = require('upper-case')
const jsonfile = require('jsonfile')
const reactsData = jsonfile.readFileSync('./src/data/reacts.json')
const emojiKeys = Object.keys(reactsData)

module.exports = function reactions(msg, args) {
	//for now, the first arg is just a string of reacts, no spaces allowed
	var reactString = upper(args[0])
	var reactEmojis = []
	for (var i = 0; i < reactString.length; i++) {
		if (emojiKeys.includes(reactString[i])) {
			reactEmojis.push(reactsData[reactString[i]])
		}
	}
	unique(reactEmojis)
	msg.channel
		.fetchMessages({ limit: 2 })
		.then(messages => {
			var msgtoreactto = messages.array()[1]
			var i = 0
			reactSync(msgtoreactto, reactEmojis, i)
		})
		.catch(console.error)
}

function reactSync(msg, reactemojiArray, i) {
	if (reactemojiArray[i]) {
		msg.react(reactemojiArray[i]).then(msgReaction => {
			if (msgReaction.me) {
				i++
				reactSync(msg, reactemojiArray, i)
			}
		})
	}
}
