import 'server-only'

import axios from 'axios'
import axiosRetry from 'axios-retry'

export const api = axios.create({
	baseURL: process.env.API_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	}
})

axiosRetry(api, {
	retries: 5,
	retryDelay: (retryCount) => {
		console.log(`Tentativa de conexão nª ${retryCount}...`)
		return retryCount * 1000
	},
	retryCondition: (error) => {
		return (
			axiosRetry.isNetworkOrIdempotentRequestError(error) ||
			error.code === 'ECONNREFUSED'
		)
	},
	shouldResetTimeout: true
})

export const langflow = axios.create({
	baseURL: process.env.LANGFLOW_CHAT_FLOW_URL,
	headers: {
		'Content-Type': 'application/json',
		'x-api-key': process.env.LANGFLOW_API_KEY
	}
})
