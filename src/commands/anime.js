const request = require('request')
const cheerio = require('cheerio')
const path = require('path')
const upper = require('upper-case')
const NodeCache = require('node-cache')
const nodeCache = new NodeCache()
const logger = require(path.join(__dirname, '../logger.js'))

module.exports = function anime(msg, args) {
	//if user is asking to sort anime instead of querying a specific anime
	if (/sort=/.test(args[0])) {
		var sortType = upper(args[0].split('sort=')[1])
		switch (sortType) {
			case 'TOP':
				animeSortQuery(msg, 'TOP', 'maltopcached')
				break
			case 'POPULARITY':
				animeSortQuery(msg, 'POPULARITY', 'malpopcached')
				break
			case 'AIRING':
				animeSortQuery(msg, 'AIRING', 'malairingcached')
				break
			case 'UPCOMING':
				animeSortQuery(msg, 'UPCOMING', 'malupcached')
				break
			case 'TV':
				animeSortQuery(msg, 'TV', 'maltvcached')
				break
			case 'MOVIE':
				animeSortQuery(msg, 'MOVIE', 'malmoviecached')
				break
			case 'OVA':
				animeSortQuery(msg, 'OVA', 'malovacached')
				break
			case 'SPECIAL':
				animeSortQuery(msg, 'SPECIAL', 'malspeccached')
				break
			case 'FAVORITE':
				animeSortQuery(msg, 'FAVORITE', 'malfavcached')
				break
		}
	}
}

function animeSortQuery(msg, sortType, cacheKey) {
	switch (sortType) {
		case 'TOP':
			var malpageurl = 'https://myanimelist.net/topanime.php'
			break
		case 'POPULARITY':
			var malpageurl = 'https://myanimelist.net/topanime.php?type=bypopularity'
			break
		case 'AIRING':
			var malpageurl = 'https://myanimelist.net/topanime.php?type=airing'
			break
		case 'UPCOMING':
			var malpageurl = 'https://myanimelist.net/topanime.php?type=upcoming'
			break
		case 'TV':
			var malpageurl = 'https://myanimelist.net/topanime.php?type=tv'
			break
		case 'MOVIE':
			var malpageurl = 'https://myanimelist.net/topanime.php?type=movie'
			break
		case 'OVA':
			var malpageurl = 'https://myanimelist.net/topanime.php?type=ova'
			break
		case 'SPECIAL':
			var malpageurl = 'https://myanimelist.net/topanime.php?type=special'
			break
		case 'FAVORITE':
			var malpageurl = 'https://myanimelist.net/topanime.php?type=favorite'
			break
	}
	var topAnime = []

	var cachedata = nodeCache.get(cacheKey)

	if (cachedata == undefined) {
		logger.err('missing', 'cant find mal data in cache, going to request from mal')
		request.get(malpageurl, (err, res, body) => {
			if (err) logger.err('mal top req err', err)
			var malhtml = cheerio.load(body)
			malhtml('.hoverinfo_trigger.fl-l.fs14.fw-b').each((i, el) => {
				topAnime.push(`#${i + 1} - ${el.children[0].data}`)
			})
			var resEmbed = {
				title: `Top 50 Anime - sort type: ${sortType}`,
				description: `${topAnime.join('\n')}`,
				color: 6815222
			}
			msg.channel.send({ embed: resEmbed })
			nodeCache.set(cacheKey, topAnime)
			logger.info('timer end', 'mal timer req end')
		})
	} else {
		logger.info('timer start', 'cache begin')
		topAnime = cachedata
		var resEmbed = {
			title: `Top 50 Anime - sort type: ${sortType}`,
			description: `${topAnime.join('\n')}`,
			color: 6815222
		}
		msg.channel.send({ embed: resEmbed })
		logger.info('timer end', 'used cached data')
	}
}
