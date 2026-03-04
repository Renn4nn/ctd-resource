import { apiRequest } from '@/lib/axios'
import Document from '@/ui/components/document/Documents'
import { RESOURCES } from '@repo/constants'
import type { DocumentSchema } from '@repo/schemas'
import { Suspense } from 'react'

export default async function DocPage({
	params
}: {
	params: Promise<{ title: string }>
}) {
	const { title } = await params

	const documentPromise = apiRequest<DocumentSchema>({
		method: 'get',
		url: `/${RESOURCES.DOCUMENTS}/title/${decodeURIComponent(title)}`
	})

	return (
		<Suspense fallback="Carregando documento...">
			<Document documentPromise={documentPromise} />
		</Suspense>
	)
}
