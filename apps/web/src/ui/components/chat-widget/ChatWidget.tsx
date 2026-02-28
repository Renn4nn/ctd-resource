import styles from './chat-widget.module.css'

import {
	ChatWidgetBody,
	ChatWidgetFooter,
	ChatWidgetHeader
} from './components'

type ChatWidgetProps = {
	className?: string
}

export default function ChatWidget({ className = '' }: ChatWidgetProps) {
	return (
		<div className={`${styles.popup} ${className}`}>
			<ChatWidgetHeader />
			<ChatWidgetBody />
			<ChatWidgetFooter />
		</div>
	)
}
