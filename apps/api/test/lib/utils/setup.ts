import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import {
	cleanDatabase,
	ExtendedPrismaClient,
	seedDatabase,
	seedDocuments,
	seedUsers
} from '@repo/database'
import { AppModule } from 'src/app.module'
import {
	PrismaClientExceptionFilter,
	ZodSerializationExceptionFilter,
	ZodValidationExceptionFilter
} from 'src/lib/filters'
import { CustomPrismaClient } from 'src/lib/types/prisma'

export async function createApp(): Promise<INestApplication> {
	const moduleRef = await Test.createTestingModule({
		imports: [AppModule]
	}).compile()

	const app = moduleRef.createNestApplication()

	app.enableShutdownHooks()

	const { httpAdapter } = app.get(HttpAdapterHost)
	app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter))

	app.useGlobalFilters(new ZodSerializationExceptionFilter())

	app.useGlobalFilters(new ZodValidationExceptionFilter())

	await app.init()

	return app
}

async function setupDatabase(prisma: ExtendedPrismaClient): Promise<void> {
	await seedDatabase({
		prisma,
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
		log: false
	})
}

export async function setupTestEnvironment(): Promise<INestApplication> {
	const app = await createApp()
	const schema = app.get(ConfigService).getOrThrow('POSTGRES_DB_SCHEMA')

	const prismaService = app.get<CustomPrismaClient>('PrismaService')
	const prisma = prismaService.client

	await cleanDatabase(prisma, schema, false)
	await setupDatabase(prisma)

	return app
}
