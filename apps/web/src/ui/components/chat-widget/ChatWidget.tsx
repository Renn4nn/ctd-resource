import { useEffect, useRef, useState } from 'react'
import styles from './chat-widget.module.css'
import {
	ChatWidgetBody,
	ChatWidgetFooter,
	ChatWidgetHeader
} from './components'
import { ChatBubbleSvg } from './components/svgs'
import type { ChatWidgetMessageProps, ChatWidgetProps } from './types'

export default function ChatWidget({
	title,
	attachFile = false,
	initialMessage,
	chatWindowClassName = '',
	toggleClassName = '',
	togglePosition = {
		bottom: '1rem',
		right: '1rem'
	},
	chatWindowPosition = {
		bottom: '1rem',
		right: '1rem'
	},
	...props
}: ChatWidgetProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const [messages, setMessages] = useState<ChatWidgetMessageProps[]>(
		initialMessage
			? [
					{
						key: 'first-message',
						sender: 'bot',
						children: initialMessage
					}
				]
			: []
	)

	const bodyRef = useRef<HTMLDivElement>(null)

	//biome-ignore lint/correctness/useExhaustiveDependencies: "messages" is required to logic work
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

	const chatToggler = () => setIsOpen((isOpen) => !isOpen)

	return (
		<>
			<div
				className={`${chatWindowClassName} ${styles.popup} ${isOpen ? styles.opened : ''}`}
				style={chatWindowPosition}
			>
				<ChatWidgetHeader title={title} chatToggler={chatToggler} />
				<ChatWidgetBody bodyRef={bodyRef} messages={messages} />
				<ChatWidgetFooter
					attachFile={attachFile}
					addMessage={addMessage}
					{...props}
				/>
			</div>
			<button
				type="button"
				title="Abrir chat"
				className={`${styles.toggler} ${toggleClassName}`}
				onClick={chatToggler}
				style={togglePosition}
			>
				<ChatBubbleSvg />
			</button>
		</>
	)
}
