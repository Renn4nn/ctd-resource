import { INestApplication } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { HttpAdapterHost } from '@nestjs/core'
import { Test } from '@nestjs/testing'
import {
	cleanDatabase,
	EmbeddingParams,
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

async function setupDatabase(
	prisma: ExtendedPrismaClient,
	embeddingParams: Omit<EmbeddingParams, 'prompt'>
): Promise<void> {
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
		embeddingParams,
		log: false
	})
}

export async function setupTestEnvironment(): Promise<INestApplication> {
	const app = await createApp()

	const configService = app.get(ConfigService)

	const embeddingParams: Omit<EmbeddingParams, 'prompt'> = {
		url: configService.getOrThrow('EMBEDDING_URL'),
		model: configService.getOrThrow('EMBEDDING_MODEL_NAME'),
		dimensions: configService.getOrThrow('EMBEDDING_DIMENSIONS')
	}

	const prismaService = app.get<CustomPrismaClient>('PrismaService')
	const prisma = prismaService.client

	await cleanDatabase(prisma, false)
	await setupDatabase(prisma, embeddingParams)

	return app
}
