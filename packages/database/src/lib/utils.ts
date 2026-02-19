import { type EmbeddingResponse, embeddingEnvSchema } from '@repo/config'
import type { Prisma } from '../generated/prisma/client.js'
import type { ExtendedPrismaClient } from './extensions/index.js'

type SeedDatabaseParams = {
	prisma: ExtendedPrismaClient
	models: {
		[key: string]: {
			data: unknown[]
			whereCb: (item: unknown) => unknown
		}
	}
	log?: boolean
}

export async function seedDatabase({
	prisma,
	models,
	log = true
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
				for (const doc of document.data as Pick<
					Prisma.DocumentModel,
					'title' | 'content'
				>[]) {
					const created = await prisma.document.safeCreateWithEmbedding({
						...doc
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
	schema: string,
	log: boolean = true
): Promise<void> {
	const models = await prisma.$queryRaw<Array<{ tablename: string }>>`
	SELECT tablename FROM pg_tables
	WHERE schemaname = ${schema}
	AND tablename != '_prisma_migrations';
  `

	if (models.length === 0) {
		console.warn(`⚠️ Aviso: Nenhuma tabela encontrada no schema "${schema}".`)
		return
	}

	const requests = models.map((row) =>
		prisma.$executeRawUnsafe(
			`TRUNCATE TABLE "${schema}"."${row.tablename}" RESTART IDENTITY CASCADE;`
		)
	)

	try {
		await prisma.$transaction(requests)
		if (log) console.info(`Schema ${schema} cleaned successfully!`)
	} catch (error) {
		console.error(`❌ Error found when cleaning ${schema} schema:`, error)
	}
}

export async function embedding(prompt: string): Promise<string> {
	const { EMBEDDING_URL, EMBEDDING_MODEL_NAME, EMBEDDING_DIMENSIONS } =
		embeddingEnvSchema.parse(process.env)

	const res = await fetch(EMBEDDING_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			model: EMBEDDING_MODEL_NAME,
			prompt
		})
	})

	const resJson = (await res.json()) as EmbeddingResponse
	const vetor = resJson.embedding

	if (vetor.length !== EMBEDDING_DIMENSIONS)
		throw new Error(
			`EMBEDDING_DIMENSIONS incompatível: esperado
				${EMBEDDING_DIMENSIONS} recebido ${vetor.length}`
		)

	return `[${vetor.join(',')}]`
}
