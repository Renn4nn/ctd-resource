import { PrismaPg } from '@prisma/adapter-pg'
import { transformDatabaseUrl } from '@repo/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { seedDocuments } from '../src/lib/seed/data'
import { embedding } from '../src/lib/utils'

const connectionString = transformDatabaseUrl.parse(process.env)
const schema = process.env.POSTGRES_DB_SCHEMA
const adapter = new PrismaPg({ connectionString }, { schema })
const prisma = new PrismaClient({ adapter })

async function main() {
	try {
		const embededDocuments = await Promise.all(
			seedDocuments.map(async (doc) => {
				const contentEmbeded = await embedding(doc.content)
				return { ...doc, embedding: contentEmbeded }
			})
		)

		const transactions = embededDocuments.map(
			(doc) => prisma.$executeRaw`
		INSERT INTO "Document" (id, title, content, "updatedAt", embedding)
		VALUES (
			gen_random_uuid(), 
			${doc.title}, 
			${doc.content},	 
			now(), 
			${doc.embedding}::vector
		)
	`
		)

		const result = await prisma.$transaction(transactions)
		console.info(
			`✅ Database seeded successfully! ${result.length} records processed.`
		)
	} catch (error) {
		console.error('❌ Error seeding database:', error)
		throw error
	}
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
