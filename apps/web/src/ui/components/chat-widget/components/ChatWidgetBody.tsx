import styles from '../chat-widget.module.css'
import { Robot2Svg } from './svgs'

export function ChatWidgetBody() {
	return (
		<div className={styles.body}>
			<ChatWidgetMessage sender="bot">
				Hey there! <br /> How can I help you today?
			</ChatWidgetMessage>
			<ChatWidgetMessage sender="user">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit...
			</ChatWidgetMessage>
			<ChatWidgetMessage sender="bot">
				<ThinkingIndicator />
			</ChatWidgetMessage>
		</div>
	)
}

type ChatWidgetMessage = {
	sender: 'bot' | 'user'
	children: React.ReactNode
}

function ChatWidgetMessage({ children, sender }: ChatWidgetMessage) {
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
