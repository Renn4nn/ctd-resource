import { useRef } from 'react'
import styles from '../chat-widget.module.css'
import useAddUserMessageFactory from '../hooks/useAddUserMessageFactory'
import type { ChatWidgetFooterProps, ChatWidgetMessageProps } from '../types'
import { AttachFileSvg, SendSvg } from './svgs'

export function ChatWidgetFooter({
	addMessage,
	formAction,
	successMessage
}: ChatWidgetFooterProps) {
	const input = useRef<HTMLTextAreaElement>(null)
	const actionWithMsg = formAction.bind(null, successMessage)

	const addUserMessage = useAddUserMessageFactory(input, addMessage)

	const handleAction = async (formData: FormData) => {
		if (input.current) input.current.value = ''

		const res = await actionWithMsg(formData)

		const message: ChatWidgetMessageProps = {
			key: Date.now(),
			sender: 'bot',
			children: <></>
		}

		if (res.data) {
			message.children = res.data.text
		} else {
			message.children = res.message
		}

		addMessage(message)
	}

	return (
		<div className={styles.footer}>
			<form action={handleAction} className={styles.form}>
				<textarea
					ref={input}
					required
					name="input_value"
					id="input_value"
					placeholder="Message..."
					className={styles.input}
					onKeyDown={(e) => {
						if (e.code === 'Enter' && !e.shiftKey) {
							e.preventDefault()
							addUserMessage()
							e.currentTarget.form?.requestSubmit()
						}
					}}
				></textarea>
				<div className={styles.controls}>
					<button type="button" title="Anexar arquivo">
						<AttachFileSvg />
					</button>
					<button
						type="submit"
						title="Enviar"
						className={styles['submit-btn']}
						onClick={addUserMessage}
					>
						<SendSvg />
					</button>
				</div>
			</form>
		</div>
	)
}
