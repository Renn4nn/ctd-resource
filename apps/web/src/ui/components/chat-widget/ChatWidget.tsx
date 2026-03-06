import { useState } from 'react'
import styles from './chat-widget.module.css'
import type {} from './components'
import {
	ChatWidgetBody,
	ChatWidgetFooter,
	ChatWidgetHeader
} from './components'
import type { ChatWidgetMessageProps, ChatWidgetProps } from './types'

export default function ChatWidget({
	className = '',
	...props
}: ChatWidgetProps) {
	const [messages, setMessages] = useState<ChatWidgetMessageProps[]>([
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

	const addMessage = (newMessage: ChatWidgetMessageProps) => {
		setMessages((messages) => [...messages, newMessage])
	}

	return (
		<div className={`${styles.popup} ${className}`}>
			<ChatWidgetHeader />
			<ChatWidgetBody messages={messages} />
			<ChatWidgetFooter addMessage={addMessage} {...props} />
		</div>
	)
}
