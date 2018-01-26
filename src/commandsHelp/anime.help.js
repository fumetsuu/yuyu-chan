module.exports = function animeHelp(msg) {
	var helpEmbed = {
		title: `y/anime sort=<sorttype>`,
		description:
			'fetches top 50 anime from MyAnimeList \n sorttype can be one of: `top` `popularity` `airing` `upcoming` `tv` `movie` `ova` `special` `favorite`',
		fields: [
			{
				name: 'example',
				value: '`y/anime sort=airing //lists top 50 airing anime`'
			}
		],
		color: 6815222
	}
	msg.channel.send({ embed: helpEmbed })
}
