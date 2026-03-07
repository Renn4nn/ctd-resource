import type { RefObject, SVGProps } from 'react'
import type { LangFlowActionReturn } from '@/lib/types/action'

export type { SVGProps }

export type SVGWrapperProps = SVGProps<SVGSVGElement> & {
	title: string
	children: SVGProps<SVGPathElement>
}

export type ChatWidgetMessageProps = {
	key: string | number
	sender: 'bot' | 'user'
	children: React.ReactNode
}

export type ChatWidgetBodyProps = {
	messages: ChatWidgetMessageProps[]
	bodyRef: RefObject<HTMLDivElement | null>
}

export type ChatWidgetFooterProps = {
	formAction: (
		successMessage: string,
		formData: FormData
	) => Promise<LangFlowActionReturn>
	addMessage: (newMessage: ChatWidgetMessageProps) => void
	successMessage: string
}

export type ChatWidgetProps = Omit<ChatWidgetFooterProps, 'addMessage'> & {
	className?: string
}
