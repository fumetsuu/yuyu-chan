module.exports = function lettersToNumbersHelp(msg) {
	var helpEmbed = {
		title: `y/ltn <string>`,
		description: "converts the given string to numbers based on each letter's position in the alphabet \n currently supported keys: `[a-z ]`",
		fields: [
			{
				name: 'example',
				value: '`y/ltn yuyu //25 21 25 21`'
			},
			{
				name: 'note',
				value: 'a space will convert into a 0'
			}
		],
		color: 6815222
	}
	msg.channel.send({ embed: helpEmbed })
}
