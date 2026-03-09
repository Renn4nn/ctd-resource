'use server'

import type { DataType } from '@repo/schemas'
import { updateTag } from 'next/cache'
import { apiRequest, langflowRequest } from '@/lib/axios'
import type {
	ApiActionParams,
	ApiActionReturn,
	LangFlowActionParams,
	LangFlowActionReturn
} from '@/lib/types/action'

export async function apiAction<
	T extends DataType,
	D extends DataType = never
>({
	tags,
	successMessage,
	...apiProps
}: ApiActionParams<D>): Promise<ApiActionReturn<T>> {
	const actionReturn: ApiActionReturn<T> = {
		data: null,
		message: successMessage
	}

	const apiRes = await apiRequest<T, D>(apiProps)

	if ('error' in apiRes) actionReturn.message = apiRes.error.message
	if ('errors' in apiRes)
		// biome-ignore lint/style/noNonNullAssertion: Just ignore Biome here
		actionReturn.message = apiRes.errors[0]!.message

	if ('data' in apiRes) {
		if (tags)
			tags.forEach((t) => {
				updateTag(t)
			})
		actionReturn.data = apiRes.data
	}
	return actionReturn
}

export async function langflowAction(
	initialState: LangFlowActionReturn,
	formData: LangFlowActionParams['formData']
): Promise<LangFlowActionReturn> {
	const actionReturn: LangFlowActionReturn = initialState

	const input_value = formData.get('input_value')?.toString() || ''

	const lfRes = await langflowRequest({ input_value })

	if ('error' in lfRes) actionReturn.message = lfRes.error.message
	if ('errors' in lfRes)
		// biome-ignore lint/style/noNonNullAssertion: Just ignore Biome here
		actionReturn.message = lfRes.errors[0]!.message

	if ('data' in lfRes) {
		actionReturn.data =
			lfRes.data.outputs[0]?.outputs[0]?.results.message.data ?? null
	}

	return actionReturn
}
