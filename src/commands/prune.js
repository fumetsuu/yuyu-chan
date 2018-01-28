const logger = require('../logger.js')

module.exports = function prune(msg, args) {
	var deleteCount
	if (Number(args[0]) && Number(args[0] <= 99)) {
		deleteCount = Number(args[0]) + 1
	} else if (Number(args[0]) > 99) {
		deleteCount = 99
	} else {
		sendInvalid(msg)
		return
	}
	logger.info('pruning', `pruning ${deleteCount} messages!`)
	msg.channel.bulkDelete(deleteCount).then(() => {
		msg.channel.send(`\`deleted ${deleteCount == 99 ? 99 : deleteCount - 1} messages\` `).then(msg => msg.delete(5000))
	})
}
function sendInvalid(msg) {
	msg.channel.send({
		embed: {
			title: 'invalid prune arg',
			description: 'ensure prune is a number <= 99'
		}
	})
}
