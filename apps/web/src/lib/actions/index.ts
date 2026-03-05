'use server'

import type { DataType } from '@repo/schemas'
import { updateTag } from 'next/cache'
import { apiRequest } from '@/lib/axios'
import type { ApiActionParams, ApiActionReturn } from '@/lib/types/action'

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
