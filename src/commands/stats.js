const path = require('path')
const logger = require(path.join(__dirname, '../logger.js'))

module.exports = function stats(msg, args) {
	msg.channel.fetchMessages({ limit: 100 }).then(messages => {
		var msgsArray = messages.array()
		msgsArray.forEach(el => {
			logger.data('msg author', el.author.username)
		})
	})
}
//not sure what to do with this atm
