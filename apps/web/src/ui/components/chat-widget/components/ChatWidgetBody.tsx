import styles from '../chat-widget.module.css'
import type { ChatWidgetBodyProps, ChatWidgetMessageProps } from '../types'
import { Robot2Svg } from './svgs'

export function ChatWidgetBody({ messages }: ChatWidgetBodyProps) {
	return (
		<div className={styles.body}>
			{messages.map((msg) => (
				<ChatWidgetMessage key={msg.key} sender={msg.sender}>
					{msg.children}
				</ChatWidgetMessage>
			))}

			{/* <ChatWidgetMessage sender="bot">
				Hey there! <br /> How can I help you today?
			</ChatWidgetMessage>
			<ChatWidgetMessage sender="user">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit...
			</ChatWidgetMessage>
			<ChatWidgetMessage sender="bot">
				<ThinkingIndicator />
			</ChatWidgetMessage> */}
		</div>
	)
}

function ChatWidgetMessage({ children, sender }: ChatWidgetMessageProps) {
	return (
		<div className={`${styles.message} ${styles[sender]}`}>
			{sender === 'bot' ? <Robot2Svg className={styles.avatar} /> : null}
			<div className={styles.text}>{children}</div>
		</div>
	)
}

function ThinkingIndicator() {
	return (
		<div className={styles['thinking-indicator']}>
			<div className={styles.dot}></div>
			<div className={styles.dot}></div>
			<div className={styles.dot}></div>
		</div>
	)
}
