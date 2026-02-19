import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { CustomPrismaModule } from 'nestjs-prisma/dist/custom'
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod'
import { DocumentModule } from './document/document.module'
import { config, validate } from './lib/config/env'
import { HttpExceptionFilter } from './lib/filters/http.exception.filter'
import { usePrismaClientFactory } from './lib/utils/prisma.utils'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [config],
			validate,
			ignoreEnvFile: process.env.NODE_ENV === 'production'
		}),
		CustomPrismaModule.forRootAsync({
			name: 'PrismaService',
			isGlobal: true,
			useFactory: usePrismaClientFactory,
			inject: [ConfigService]
		}),
		UsersModule,
		DocumentModule
	],
	providers: [
		{
			provide: APP_PIPE,
			useClass: ZodValidationPipe
		},
		{
			provide: APP_INTERCEPTOR,
			useClass: ZodSerializerInterceptor
		},
		{
			provide: APP_FILTER,
			useClass: HttpExceptionFilter
		}
	]
})
export class AppModule {}
