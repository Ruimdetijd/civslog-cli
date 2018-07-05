import chalk from "chalk"
import fetch from 'node-fetch'

export const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

export const clearLog = () => {
	if (process.env.NODE_ENV !== 'development') console.log('\x1Bc')
}

export const logError = (title, lines) =>
	console.error(chalk`{red [ERROR][${title}]}\n{gray ${lines.join('\n')}}\n{red [/ERROR]}`)

export const logWarning = (title, lines) =>
	console.log(chalk`{yellow [WARNING][${title}]}\n{gray ${lines.join('\n')}}\n{yellow [/WARNING]}`)

export const logMessage = (message) => {
	if (message == null || !message.trim().length) return
	console.log(chalk`{cyan.bold >>> ${message} <<<\n}`)
}

export const logHeader = (header) => {
	if (header == null || !header.trim().length) return
	console.log(chalk`{yellow.bold [Timeline CLI] ${header}\n}`)
}

export const execFetch = async (url: string, options = {}) => {
	let body = null
	const throwError = (err) => console.log(chalk`{red [execFetch] Fetch execution failed}\n`, chalk`{gray [ERROR]\n${err}\n\n[URL]\n${url}}`)	

	try {
		const response = await fetch(url, options)
		body = await response.json()
		if (body.hasOwnProperty('error')) throwError(JSON.stringify(body.error, null, 2))
	} catch (err) {
		throwError(err)
	}

	return body
}