import type { EmbeddingResponse } from '@repo/config'
import type { Prisma } from '../generated/prisma/client.js'
import type { ExtendedPrismaClient } from './extensions/index.js'

export type EmbeddingParams = {
	url: string
	model: string
	prompt: string
	dimensions: number
}

export async function embedding({
	dimensions,
	url,
	model,
	prompt
}: EmbeddingParams): Promise<string> {
	try {
		const res = await fetch(url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				model,
				prompt
			})
		})

		const resJson = (await res.json()) as EmbeddingResponse
		const vetor = resJson.embedding

		if (vetor.length !== dimensions)
			throw new Error(
				`Dimensão de vetor incompatível: esperado
					${dimensions} recebido ${vetor.length}`
			)

		return `[${vetor.join(',')}]`
	} catch (e) {
		throw new Error(`Embedding failed: ${e}`)
	}
}

type SeedDatabaseParams = {
	prisma: ExtendedPrismaClient
	models: {
		[key: string]: {
			data: unknown[]
			whereCb: (item: unknown) => unknown
		}
	}
	log?: boolean
	embeddingParams: Omit<EmbeddingParams, 'prompt'>
}

export async function seedDatabase({
	prisma,
	models,
	log = true,
	embeddingParams
}: SeedDatabaseParams): Promise<void> {
	const { document, ...otherModels } = models
	const transactions: Prisma.PrismaPromise<unknown>[] = Object.entries(
		otherModels
	).flatMap(([key, obj]) => {
		const { data, whereCb } = obj

		return data.map((item) =>
			// biome-ignore lint/suspicious/noExplicitAny: Required
			(prisma as any)[key].upsert({
				where: whereCb(item),
				update: {},
				create: item
			})
		)
	})
	try {
		const docResults: Record<string, unknown>[] = []

		if (document) {
			if (document.data) {
				for (const data of document.data as Pick<
					Prisma.DocumentModel,
					'title' | 'content'
				>[]) {
					const created = await prisma.document.safeCreateWithEmbedding({
						data,
						embeddingParams
					})
					docResults.push(created)
				}
			}
		}

		const tResults = await prisma.$transaction(transactions)

		const insertedRows = tResults.length + docResults.length

		if (log)
			console.info(
				`✅ Database seeded successfully! ${insertedRows} records processed.`
			)
	} catch (error) {
		console.error('❌ Error seeding database:', error)
		throw error
	}
}

export async function cleanDatabase(
	prisma: ExtendedPrismaClient,
	log: boolean = true
): Promise<void> {
	const models = await prisma.$queryRaw<Array<{ tablename: string }>>`
	SELECT tablename FROM pg_tables
	WHERE schemaname = 'public'
	AND tablename != '_prisma_migrations';
  `

	if (models.length === 0) {
		console.warn(`⚠️ Aviso: Nenhuma tabela encontrada".`)
		return
	}

	const requests = models.map((row) =>
		prisma.$executeRawUnsafe(
			`TRUNCATE TABLE "${row.tablename}" RESTART IDENTITY CASCADE;`
		)
	)

	try {
		await prisma.$transaction(requests)
		if (log) console.info('✅ Database cleaned successfully!')
	} catch (error) {
		console.error('❌ Error cleaning database', error)
	}
}
