import type { RESOURCES } from '@repo/constants'
import type { DataType } from '@repo/schemas'
import type { LangflowOutput } from '@/lib/types/axios'
import type { ApiRequestParams } from './axios'

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
	data: LangflowOutput | null
}
