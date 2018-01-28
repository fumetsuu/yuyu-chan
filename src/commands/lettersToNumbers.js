const path = require('path')
const jsonfile = require('jsonfile')
const lettersnum = jsonfile.readFileSync(path.join(__dirname, '../data/lettersnum.json'))
const letters = Object.keys(lettersnum)

module.exports = function lettersToNumbers(msg, args) {
	console.log(args)
	var lettersString = args.join(' ')
	var numbersString = ''
	for (var i = 0; i < lettersString.length; i++) {
		if (letters.includes(lettersString[i])) {
			numbersString += `${lettersnum[lettersString[i]]} `
		} else {
			numbersString += '🤠 '
		}
	}
	msg.channel.send(` \`\`\`ltn(${lettersString}) => ${numbersString}\`\`\` `)
}
