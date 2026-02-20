import { z } from '../zod/index.js'

const nodeEnv = z.literal(['development', 'production', 'test'])
export type NodeEnv = z.infer<typeof nodeEnv>

export const transformDatabaseUrl = z
	.object({
		POSTGRES_HOST: z.string(),
		POSTGRES_USER: z.string(),
		POSTGRES_PASSWORD: z.string(),
		POSTGRES_PORT: z.coerce.number(),
		POSTGRES_DB: z.string()
	})
	.transform((props) => {
		const {
			POSTGRES_DB,
			POSTGRES_HOST,
			POSTGRES_PASSWORD,
			POSTGRES_USER,
			POSTGRES_PORT
		} = props
		return `postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}?schema=public`
	})

export type GenerateDatabaseUrlInput = z.input<typeof transformDatabaseUrl>
export type GenerateDatabaseUrlOutput = z.output<typeof transformDatabaseUrl>

export const embeddingEnvSchema = z.object({
	EMBEDDING_URL: z.string(),
	EMBEDDING_MODEL_NAME: z.string(),
	EMBEDDING_DIMENSIONS: z.coerce.number().min(1)
})

export type EmbeddingEnv = z.infer<typeof embeddingEnvSchema>

export const apiEnvSchema = z.object({
	NODE_ENV: nodeEnv,
	API_PORT: z.coerce.number(),
	DATABASE_URL: z.string(),
	...embeddingEnvSchema.shape
})

export type ApiEnvDtoInput = z.input<typeof apiEnvSchema>
export type ApiEnvDtoOutput = z.output<typeof apiEnvSchema>
