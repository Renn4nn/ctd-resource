import styles from '../chat-widget.module.css'
import { ArrowDownSvg, Robot2Svg } from './svgs'

export function ChatWidgetHeader() {
	return (
		<div className={styles.header}>
			<div className={styles.info}>
				<Robot2Svg className={styles.logo} />
				<h2 className={styles.text}>ChatWidget</h2>
			</div>
			<button type="button" title="Fechar" className={styles['close-btn']}>
				<ArrowDownSvg width="2.2rem" height="2.2rem" fill="#fff" />
			</button>
		</div>
	)
}
