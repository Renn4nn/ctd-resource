import styles from '../chat-widget.module.css'
import { AttachFileSvg, SendSvg } from './svgs'

export function ChatWidgetFooter() {
	return (
		<div className={styles.footer}>
			<form action="" className={styles.form}>
				<textarea
					name="chat"
					id="chat"
					placeholder="Message..."
					className={styles.input}
				></textarea>
				<div className={styles.controls}>
					<button type="button" title="Anexar arquivo">
						<AttachFileSvg />
					</button>
					<button type="submit" title="Enviar" className={styles['submit-btn']}>
						<SendSvg />
					</button>
				</div>
			</form>
		</div>
	)
}
