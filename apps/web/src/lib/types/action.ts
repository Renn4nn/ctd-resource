import type { RESOURCES } from '@repo/constants'
import type { DataType } from '@repo/schemas'
import type { ApiRequestParams, LangflowPayload } from './axios'

export type ApiActionParams<T extends DataType> = ApiRequestParams<T> & {
	successMessage: string
	tags?: RESOURCES[]
}

export type ApiActionReturn<T extends DataType> = {
	message: string
	data: T | null
}

export type LangFlowActionParams = {
	successMessage: string
	formData: FormData
}

export type LangFlowActionReturn = {
	message: string
	data: LangflowPayload | null
}
