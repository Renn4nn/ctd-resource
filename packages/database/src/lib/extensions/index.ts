import { PrismaPg } from '@prisma/adapter-pg'
import { Prisma, PrismaClient } from '../../generated/prisma/client.js'
import { type EmbeddingParams, embedding } from '../utils.js'

export type CreateWithEmbeddingParams = {
	data: Pick<Prisma.DocumentModel, 'title' | 'content'>
	embeddingParams: Omit<EmbeddingParams, 'prompt'>
}

export type UpdateWithEmbeddingParams = {
	where: Prisma.DocumentWhereUniqueInput
	data: Prisma.DocumentUpdateInput
	embeddingParams: Omit<EmbeddingParams, 'prompt'>
}

export const documentExtension = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'documentWithEmbedding',
		model: {
			document: {
				/**
				 * Cria um documento já gerando e salvando o vetor automaticamente
				 */
				async createWithEmbedding({
					data,
					embeddingParams
				}: CreateWithEmbeddingParams): Promise<Prisma.DocumentModel> {
					const vectorString = await embedding({
						...embeddingParams,
						prompt: `${data.title}: ${data.content}`
					})
					const result = await client.$queryRaw<Prisma.DocumentModel[]>`
                        INSERT INTO "Document"
                        (id, title, content, embedding, "createdAt", "updatedAt")
                        VALUES (
                            gen_random_uuid(),
                            ${data.title},
                            ${data.content},
                            ${vectorString}::vector,
                            now(),
                            now()
                        )
                        RETURNING id, title, content, "createdAt", "updatedAt";
                     `
					// biome-ignore lint/style/noNonNullAssertion: Se o insert acima falhar ele lançará uma execeção
					return result[0]!
				},

				/**
				 * Cria um documento já gerando e salvando o vetor automaticamente ou retorna-o se já existente
				 */
				async safeCreateWithEmbedding({
					data,
					embeddingParams
				}: CreateWithEmbeddingParams): Promise<Prisma.DocumentModel> {
					const context = Prisma.getExtensionContext(this)
					const alreadyCreatedDoc = await context.findUnique({
						where: { title: data.title }
					})
					if (alreadyCreatedDoc) {
						return alreadyCreatedDoc
					} else {
						return context.createWithEmbedding({ data, embeddingParams })
					}
				},

				/**
				 * Atualiza um documento e recalcula o embedding
				 */
				async updateWithEmbedding({
					where,
					data,
					embeddingParams
				}: UpdateWithEmbeddingParams): Promise<Prisma.DocumentModel> {
					const context = Prisma.getExtensionContext(this)

					const current = await context.findUniqueOrThrow({ where })

					const newTitle = data.title ?? current.title
					const newContent = data.content ?? current.content

					const vectorString = await embedding({
						...embeddingParams,
						prompt: `${newTitle}: ${newContent}`
					})

					const result = await client.$queryRaw<Prisma.DocumentModel[]>`
                        UPDATE "Document"
                        SET 
                            title = ${newTitle},
                            content = ${newContent},
                            embedding = ${vectorString}::vector,
                            "updatedAt" = now()
                        WHERE id = ${current.id}
                        RETURNING id, title, content, "createdAt", "updatedAt";
                    `
					// biome-ignore lint/style/noNonNullAssertion: Se o insert acima falhar ele lançará uma execeção
					return result[0]!
				}
			}
		}
	})
})

export function extendPrismaClientFactory(connectionString: string) {
	const adapter = new PrismaPg({ connectionString })
	return new PrismaClient({ adapter }).$extends(documentExtension)
}

export type ExtendedPrismaClient = ReturnType<typeof extendPrismaClientFactory>
