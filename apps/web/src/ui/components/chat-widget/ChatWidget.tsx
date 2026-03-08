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
	attachFile = false,
	chatWindowClassName = '',
	toggleClassName = '',
	togglePosition = {
		bottom: '1rem',
		right: '1rem'
	},
	...props
}: ChatWidgetProps) {
	const [isOpen, setIsOpen] = useState<boolean>(false)
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
				popover="manual"
			>
				<ChatWidgetHeader chatToggler={chatToggler} />
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
				popoverTarget={styles.popup}
				style={togglePosition}
			>
				<ChatBubbleSvg />
			</button>
		</>
	)
}
