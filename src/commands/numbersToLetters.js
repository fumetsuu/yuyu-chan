const jsonfile = require('jsonfile')
const numletters = jsonfile.readFileSync('./src/data/numletters.json')
const nums = Object.keys(numletters)

module.exports = function numbersToLetters(msg, args) {
	var numbersArray = args
	var lettersString = ''
	for (var i = 0; i < numbersArray.length; i++) {
		if (nums.includes(numbersArray[i])) {
			lettersString += `${numletters[numbersArray[i]]}`
		} else {
			lettersString += '🤠'
		}
	}
	msg.channel.send(
		` \`\`\`ntl(${numbersArray.join(' ')}) => ${lettersString}\`\`\` `
	)
}
