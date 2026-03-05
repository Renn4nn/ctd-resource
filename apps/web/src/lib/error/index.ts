import type { ApiErrorResponse, ApiResponse, DataType } from '@repo/schemas'
import axios, { type AxiosResponse } from 'axios'
import type { LangflowResponse } from '@/lib/types/axios'

export async function asyncApiTryCatch<T extends DataType>(
	promise: Promise<AxiosResponse<ApiResponse<T>>>
): Promise<ApiResponse<T>> {
	try {
		return (await promise).data
	} catch (err) {
		return handleApiError(err)
	}
}

function handleApiError(err: unknown): ApiErrorResponse {
	const defaultErr: ApiErrorResponse = {
		error: {
			type: 'API_ERROR',
			message: 'Erro da api não tratado, vejo o log para mais detalhes',
			details: 'Erro interno ou de rede, vejo o log para mais detalhes'
		}
	}

	if (axios.isAxiosError(err)) {
		if (err.response) {
			return err.response.data
		}
	}

	console.error('handleApiError:', err)
	return defaultErr
}

export async function asyncLangflowTryCatch(
	promise: Promise<AxiosResponse<LangflowResponse>>
): Promise<ApiResponse<LangflowResponse>> {
	try {
		return { data: (await promise).data }
	} catch (err) {
		return handleLangflowError(err)
	}
}

function handleLangflowError(err: unknown): ApiErrorResponse {
	const defaultErr: ApiErrorResponse = {
		error: {
			type: 'LANGFLOW_ERROR',
			message:
				'Erro do servidor langflow não tratado, vejo o log para mais detalhes',
			details: 'Erro do servidor langflow, vejo o log para mais detalhes'
		}
	}

	if (axios.isAxiosError(err)) {
		defaultErr.error.message = err.message
	}

	console.error('handleLangflowError:', err)
	return defaultErr
}
