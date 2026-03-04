import { cachedApiRequest } from '@/lib/axios'
import '@/styles/globals.css'
import '@/styles/layout.css'
import CustomToaster from '@/ui/components/CustomToaster'
import DocumentLayoutPage from '@/ui/pages/DocumentLayout'
import { RESOURCES } from '@repo/constants'
import type { DocumentSchema } from '@repo/schemas'
import { Suspense } from 'react'

export default function RootLayout({
	children
}: {
	children: React.ReactNode
}) {
	const documentsPromise = cachedApiRequest<DocumentSchema[]>({
		url: RESOURCES.DOCUMENTS,
		tagsToCache: [RESOURCES.DOCUMENTS]
	})

	return (
		<html lang="pt-BR">
			<body>
				<CustomToaster />
				<DocumentLayoutPage documentsPromise={documentsPromise}>
					<Suspense fallback="Carregando página...">{children}</Suspense>
				</DocumentLayoutPage>
			</body>
		</html>
	)
}
