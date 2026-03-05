import styles from './chat-widget.module.css'
import type { ChatWidgetFooterProps } from './components'
import {
	ChatWidgetBody,
	ChatWidgetFooter,
	ChatWidgetHeader
} from './components'

type ChatWidgetProps = ChatWidgetFooterProps & {
	className?: string
}

export default function ChatWidget({
	className = '',
	...props
}: ChatWidgetProps) {
	return (
		<div className={`${styles.popup} ${className}`}>
			<ChatWidgetHeader />
			<ChatWidgetBody />
			<ChatWidgetFooter {...props} />
		</div>
	)
}
