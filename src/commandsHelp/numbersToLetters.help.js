module.exports = function numbersToLettersHelp(msg) {
	var helpEmbed = {
		title: `y/ntl <numbers separated by a space>`,
		description:
			"converts the given string of numbers to letters based on each letter's position in the alphabet \n currently supported keys: `[0-26]`",
		fields: [
			{
				name: 'example',
				value: '`y/ntl 25 21 25 21 //yuyu`'
			},
			{
				name: 'note',
				value: 'a 0 will convert into a space'
			}
		],
		color: 6815222
	}
	msg.channel.send({ embed: helpEmbed })
}
