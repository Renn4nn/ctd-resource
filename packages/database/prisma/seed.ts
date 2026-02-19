import { embeddingEnvSchema, transformDatabaseUrl } from '@repo/config'
import { extendPrismaClientFactory } from '../src/lib/extensions'
import { seedDocuments, seedUsers } from '../src/lib/seed/data'
import { type EmbeddingParams, seedDatabase } from '../src/lib/utils'

const connectionString = transformDatabaseUrl.parse(process.env)
const schema = process.env.POSTGRES_DB_SCHEMA || 'public'
const parseResult = embeddingEnvSchema.parse(process.env)
const embeddingParams: Omit<EmbeddingParams, 'prompt'> = {
	url: parseResult.EMBEDDING_URL,
	model: parseResult.EMBEDDING_MODEL_NAME,
	dimensions: parseResult.EMBEDDING_DIMENSIONS
}

const extendedPrisma = extendPrismaClientFactory(connectionString, schema)

async function main() {
	await seedDatabase({
		prisma: extendedPrisma,
		models: {
			// biome-ignore-start lint/suspicious/noExplicitAny: Required
			user: {
				data: seedUsers,
				whereCb: (item: any) => ({ email: item.email })
			},
			document: {
				data: seedDocuments,
				whereCb: (item: any) => ({ title: item.title })
			}
			// biome-ignore-end lint/suspicious/noExplicitAny: Required
		},
		embeddingParams,
		log: true
	})
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await extendedPrisma.$disconnect()
	})
