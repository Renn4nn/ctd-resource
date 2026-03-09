import styles from '../chat-widget.module.css'
import type { ChatWidgetHeaderProps } from '../types'
import { ArrowDownSvg, Robot2Svg } from './svgs'

export function ChatWidgetHeader({
	title = 'ChatWidget',
	chatToggler
}: ChatWidgetHeaderProps) {
	return (
		<div className={styles.header}>
			<div className={styles.info}>
				<Robot2Svg className={styles.logo} />
				<h2 className={styles.text}>{title}</h2>
			</div>
			<button
				type="button"
				title="Fechar"
				className={styles['close-btn']}
				onClick={chatToggler}
			>
				<ArrowDownSvg />
			</button>
		</div>
	)
}
