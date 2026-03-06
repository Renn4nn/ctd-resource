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
	formAction: (successMessage: string, formData: FormData) => Promise<void>
	handleOnClick: (newMessage: ChatWidgetMessageProps) => void
	successMessage: string
}

export type ChatWidgetProps = Omit<ChatWidgetFooterProps, 'handleOnClick'> & {
	className?: string
}
