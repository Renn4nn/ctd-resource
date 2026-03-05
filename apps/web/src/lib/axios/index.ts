import type { DataType } from '@repo/schemas'
import type { AxiosResponse } from 'axios'
import { cacheTag } from 'next/cache'
import { asyncApiTryCatch, asyncLangflowTryCatch } from '@/lib/error'
import type {
	ApiRequestParams,
	ApiRequestReturn,
	AxiosRequestParams,
	AxiosRequestReturn,
	CachedApiRequestParams,
	LangflowRequestParams,
	LangflowRequestReturn
} from '@/lib/types/axios'
import { api, langflow } from './config'

export async function axiosRequest<
	T extends DataType,
	D extends DataType = never
>({
	instance,
	method,
	url = '',
	data
}: AxiosRequestParams<D>): AxiosRequestReturn<T> {
	return instance[method]<T, AxiosResponse<T>, D>(url, data)
}

export async function langflowRequest({
	input_value
}: LangflowRequestParams): LangflowRequestReturn {
	const data = {
		input_value,
		output_type: 'chat',
		input_type: 'chat'
	}
	return asyncLangflowTryCatch(
		axiosRequest({ instance: langflow, method: 'post', data })
	)
}

export async function apiRequest<
	T extends DataType,
	D extends DataType = never
>(params: ApiRequestParams<D>): ApiRequestReturn<T> {
	return asyncApiTryCatch(axiosRequest({ instance: api, ...params }))
}

export async function cachedApiRequest<T extends DataType>({
	url,
	tagsToCache
}: CachedApiRequestParams): ApiRequestReturn<T> {
	'use cache'
	cacheTag(...tagsToCache)
	return apiRequest({ method: 'get', url })
}
