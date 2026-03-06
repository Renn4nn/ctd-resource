import type { LangFlowActionReturn } from '@/lib/types/action'
import type { SVGProps } from 'react'

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
