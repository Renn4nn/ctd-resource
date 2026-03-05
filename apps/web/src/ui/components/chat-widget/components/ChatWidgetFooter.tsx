import { useRef } from 'react'
import styles from '../chat-widget.module.css'
import type { ChatWidgetMessage } from './ChatWidgetBody'
import { AttachFileSvg, SendSvg } from './svgs'

export type ChatWidgetFooterProps = {
	formAction: (successMessage: string, formData: FormData) => Promise<void>
	handleOnClick: (newMessage: ChatWidgetMessage) => void
	successMessage: string
}

export function ChatWidgetFooter({
	handleOnClick,
	formAction,
	successMessage
}: ChatWidgetFooterProps) {
	const actionWithMsg = formAction.bind(null, successMessage)

	const input = useRef<HTMLTextAreaElement>(null)

	return (
		<div className={styles.footer}>
			<form action={actionWithMsg} className={styles.form}>
				<textarea
					ref={input}
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
					<button
						type="submit"
						title="Enviar"
						className={styles['submit-btn']}
						onClick={() =>
							handleOnClick({
								key: Date.now(),
								sender: 'user',
								children: <>{input.current?.value || ''}</>
							})
						}
					>
						<SendSvg />
					</button>
				</div>
			</form>
		</div>
	)
}
