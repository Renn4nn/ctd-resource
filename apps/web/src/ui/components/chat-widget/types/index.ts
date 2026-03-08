import type { CSSProperties, RefObject, SVGProps } from 'react'
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

export type ChatWidgetHeaderProps = {
	chatToggler: () => void
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
	chatWindowClassName?: string
	toggleClassName?: string
	togglePosition?: {
		top?: CSSProperties['top']
		right?: CSSProperties['right']
		bottom?: CSSProperties['bottom']
		left?: CSSProperties['left']
	}
}
