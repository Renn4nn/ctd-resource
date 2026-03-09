'use client'

import type { ApiResponse, DocumentSchema } from '@repo/schemas'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { langflowAction } from '@/lib/actions'
import ChatWidget from '@/ui/components/chat-widget/ChatWidget'
import DocumentNav from '@/ui/components/document/DocumentNav'
import Header from '@/ui/layout/Header'
import Main from '@/ui/layout/Main'
import SideNav from '@/ui/layout/SideNav'

type DocumentLayoutPageProps = {
	children: React.ReactNode
	documentsPromise: Promise<ApiResponse<DocumentSchema[]>>
}

const inter = Inter({ subsets: ['latin'] })

export default function DocumentLayoutPage({
	children,
	documentsPromise
}: DocumentLayoutPageProps) {
	const [open, setIsOpen] = useState(false)

	return (
		<>
			<Header setIsOpen={setIsOpen} />
			<SideNav
				className={`bg-gradient-to-b from-ctd-azul-01 to-ctd-azul-02 border-e-[1] border-white/50 ${open ? 'open' : ''}`}
			>
				<DocumentNav documentsPromise={documentsPromise} />
			</SideNav>
			<Main>
				<ChatWidget
					title="Assistente Virtual"
					togglePosition={{ bottom: '5.5rem', right: '2rem' }}
					chatWindowPosition={{ bottom: '5.5rem', right: '2rem' }}
					chatWindowClassName={inter.className}
					formAction={langflowAction}
					successMessage="Deu certo!"
					initialMessage={
						<>
							Olá! <br /> Como posso te ajudar hoje?
						</>
					}
				/>
				{children}
			</Main>
		</>
	)
}
