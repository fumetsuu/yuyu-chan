const request = require('request')

module.exports = function(msg, args) {
	request(
		'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet%2CcontentDetails&maxResults=25&playlistId=UUAaGaynFpku5cAx6OOSrW-w&key=AIzaSyDB8rFWkcqhkdSTlkZr7_tILN-6nmrAKJs',
		(err, response, body) => {
			var resultsJSON = JSON.parse(body)
			var items = resultsJSON.items
			var vids = []
			items.forEach(item => {
				console.log(item.contentDetails.videoId)
				vids.push(
					`${item.snippet.title} - ${item.contentDetails.videoId}`
				)
			})
			msg.channel.send(vids.join('\n'))
		}
	)
}
