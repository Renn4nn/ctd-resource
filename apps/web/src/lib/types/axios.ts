import type { RESOURCES } from '@repo/constants'
import type { ApiResponse, DataType } from '@repo/schemas'
import type { AxiosInstance, AxiosResponse } from 'axios'

export type API_METHODS = 'get' | 'post' | 'put' | 'patch' | 'delete'

export type AxiosRequestParams<T extends DataType> = {
	instance: AxiosInstance
	method: API_METHODS
	url?: string
	data?: T
}

export type AxiosRequestReturn<T extends DataType> = Promise<AxiosResponse<T>>

export type ApiRequestParams<T extends DataType> = Omit<
	AxiosRequestParams<T>,
	'instance'
>

export type ApiRequestReturn<T extends DataType> = Promise<ApiResponse<T>>

export type CachedApiRequestParams<T extends DataType = never> = {
	url: ApiRequestParams<T>['url']
	tagsToCache: RESOURCES[]
}

type LangflowOutput = {
	results: {
		message: {
			data: {
				timestamp: string
				text: string
			}
		}
	}
}

export type LangflowResponse = {
	session_id: string
	outputs: {
		inputs: {
			input_value: string
		}
		outputs: LangflowOutput[]
	}
}

export type LangflowRequestParams = {
	input_value: string
}

export type LangflowRequestReturn = Promise<AxiosResponse<LangflowResponse>>
