import type {
	CSSProperties,
	Dispatch,
	ReactNode,
	RefObject,
	SetStateAction,
	SVGProps
} from 'react'
import type {
	LangFlowActionParams,
	LangFlowActionReturn
} from '@/lib/types/action'

export type { SVGProps }

export type SVGWrapperProps = SVGProps<SVGSVGElement> & {
	title: string
	children: SVGProps<SVGPathElement>
}

export type ChatWidgetMessageProps = {
	key: string | number
	sender: 'bot' | 'user'
	children: ReactNode
}

export type ChatWidgetHeaderProps = {
	title?: string
	chatToggler: () => void
}

export type ChatWidgetBodyProps = {
	messages: ChatWidgetMessageProps[]
	bodyRef: RefObject<HTMLDivElement | null>
	isPending: boolean
}

export type ChatWidgetFooterProps = {
	attachFile?: boolean
	formAction: (
		initialState: LangFlowActionParams['initialState'],
		formData: LangFlowActionParams['formData']
	) => Promise<LangFlowActionReturn>
	addMessage: (newMessage: ChatWidgetMessageProps) => void
	setIsPending: Dispatch<SetStateAction<boolean>>
	successMessage: string
}

type CSSPosition = {
	top?: CSSProperties['top']
	right?: CSSProperties['right']
	bottom?: CSSProperties['bottom']
	left?: CSSProperties['left']
}
export type ChatWidgetProps = Omit<
	ChatWidgetFooterProps,
	'addMessage' | 'setIsPending'
> & {
	title?: ChatWidgetHeaderProps['title']
	attachFile?: boolean
	initialMessage?: ChatWidgetMessageProps['children']
	chatWindowClassName?: string
	chatWindowPosition?: CSSPosition
	toggleClassName?: string
	togglePosition?: CSSPosition
}
