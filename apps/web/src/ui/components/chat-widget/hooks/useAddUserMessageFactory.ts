import type { RefObject } from 'react'
import type { ChatWidgetFooterProps } from '../types'

export default function useAddUserMessageFactory(
	input: RefObject<HTMLTextAreaElement | null>,
	addMessage: ChatWidgetFooterProps['addMessage']
) {
	return () =>
		addMessage({
			key: Date.now(),
			sender: 'user',
			children: input.current?.value || ''
		})
}
