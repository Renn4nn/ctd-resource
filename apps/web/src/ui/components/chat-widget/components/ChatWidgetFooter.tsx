import styles from '../chat-widget.module.css'
import { AttachFileSvg, SendSvg } from './svgs'

export type ChatWidgetFooterProps = {
	formAction: (successMessage: string, formData: FormData) => Promise<void>
	successMessage: string
}

export function ChatWidgetFooter({
	formAction,
	successMessage
}: ChatWidgetFooterProps) {
	const actionWithMsg = formAction.bind(null, successMessage)

	return (
		<div className={styles.footer}>
			<form action={actionWithMsg} className={styles.form}>
				<textarea
					required
					name="input_value"
					id="input_value"
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
