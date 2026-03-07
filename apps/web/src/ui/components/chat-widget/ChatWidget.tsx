import { useEffect, useRef, useState } from 'react'
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
			key: 'welcome-message',
			sender: 'bot',
			children: (
				<>
					Olá! <br /> Como posso te ajudar hoje?
				</>
			)
		}
	])

	const bodyRef = useRef<HTMLDivElement>(null)

	//biome-ignore lint/correctness/useExhaustiveDependencies: Just ignore by now
	useEffect(() => {
		if (bodyRef.current) {
			bodyRef.current.scrollTo({
				top: bodyRef.current.scrollHeight,
				behavior: 'smooth'
			})
		}
	}, [messages])

	const addMessage = (newMessage: ChatWidgetMessageProps) => {
		setMessages((messages) => [...messages, newMessage])
	}

	return (
		<div className={`${styles.popup} ${className}`}>
			<ChatWidgetHeader />
			<ChatWidgetBody bodyRef={bodyRef} messages={messages} />
			<ChatWidgetFooter addMessage={addMessage} {...props} />
		</div>
	)
}
