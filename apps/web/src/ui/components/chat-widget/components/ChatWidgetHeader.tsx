import styles from '../chat-widget.module.css'
import type { ChatWidgetHeaderProps } from '../types'
import { ArrowDownSvg, Robot2Svg } from './svgs'

export function ChatWidgetHeader({ chatToggler }: ChatWidgetHeaderProps) {
	return (
		<div className={styles.header}>
			<div className={styles.info}>
				<Robot2Svg className={styles.logo} />
				<h2 className={styles.text}>ChatWidget</h2>
			</div>
			<button
				type="button"
				title="Fechar"
				className={styles['close-btn']}
				onClick={chatToggler}
			>
				<ArrowDownSvg width="2.2rem" height="2.2rem" fill="#fff" />
			</button>
		</div>
	)
}
