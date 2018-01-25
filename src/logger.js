const chalk = require('chalk')
const log = console.log

const logger = {
	log: logContent => {
		log(logContent)
	},
	info: logContent => {
		log(chalk.cyan(logContent))
	}
}

module.exports = logger
