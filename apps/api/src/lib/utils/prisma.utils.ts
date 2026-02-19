import { ConfigService } from '@nestjs/config'
import { extendPrismaClientFactory } from '@repo/database'

export function usePrismaClientFactory(config: ConfigService) {
	const connectionString = config.getOrThrow('DATABASE_URL')
	return extendPrismaClientFactory(connectionString)
}
