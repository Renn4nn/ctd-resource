import { INestApplication } from '@nestjs/common'
import { cleanDatabase } from '@repo/database'
import { CustomPrismaClient } from 'src/lib/types/prisma'

export async function teardownTestEnvironment(
	app: INestApplication
): Promise<void> {
	try {
		const prismaService = app.get<CustomPrismaClient>('PrismaService')
		const prisma = prismaService.client

		await cleanDatabase(prisma, false)
		await app.close()
	} catch (err) {
		console.error(err)
		throw new Error('Failed to teardown test environment:', err)
	}
}
