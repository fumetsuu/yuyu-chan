const chalk = require('chalk')
const log = console.log

const logger = {
	log: logContent => {
		log(
			chalk.white(
				`${new Date().toLocaleTimeString()} - log |:    ${logContent}`
			)
		)
	},
	info: (logTag, logContent) => {
		log(
			chalk.bgCyan.black(
				`${new Date().toLocaleTimeString()} - info | ${logTag}`
			),
			chalk.white(`:   ${logContent}`)
		)
	},
	warn: (logTag, logContent) => {
		log(
			chalk.bgYellow.black(
				`${new Date().toLocaleTimeString()} - warning | ${logTag}`
			),
			chalk.white(`:    ${logContent}`)
		)
	},
	err: (logTag, logContent) => {
		log(
			chalk.bgRed(
				`${new Date().toLocaleTimeString()} - ERROR | ${logTag}`
			),
			chalk.red(`:    ${logContent}`)
		)
	},
	success: (logTag, logContent) => {
		log(
			chalk.bgGreen.black(
				`${new Date().toLocaleTimeString()} - success | ${logTag}`
			),
			chalk.white(`:    ${logContent}`)
		)
	},
	data: (logTag, logContent) => {
		log(
			chalk.bgMagenta(
				`${new Date().toLocaleTimeString()} - data | ${logTag}`
			),
			chalk.white(`:    ${logContent}`)
		)
	}
}

module.exports = logger
