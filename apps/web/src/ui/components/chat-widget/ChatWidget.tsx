import { useState } from 'react'
import styles from './chat-widget.module.css'
import type { ChatWidgetFooterProps, ChatWidgetMessage } from './components'
import {
	ChatWidgetBody,
	ChatWidgetFooter,
	ChatWidgetHeader
} from './components'

type ChatWidgetProps = Omit<ChatWidgetFooterProps, 'handleOnClick'> & {
	className?: string
}

export default function ChatWidget({
	className = '',
	...props
}: ChatWidgetProps) {
	const [messages, setMessages] = useState<ChatWidgetMessage[]>([
		{
			key: Date.now(),
			sender: 'bot',
			children: (
				<>
					Olá! <br /> Como posso te ajudar hoje?
				</>
			)
		}
	])

	const addMessage = (newMessage: ChatWidgetMessage) => {
		setMessages((messages) => [...messages, newMessage])
	}

	return (
		<div className={`${styles.popup} ${className}`}>
			<ChatWidgetHeader />
			<ChatWidgetBody messages={messages} />
			<ChatWidgetFooter handleOnClick={addMessage} {...props} />
		</div>
	)
}
