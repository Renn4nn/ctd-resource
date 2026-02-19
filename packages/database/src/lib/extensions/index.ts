import { PrismaPg } from '@prisma/adapter-pg'
import { Prisma, PrismaClient } from '../../generated/prisma/client.js'
import { embedding } from '../utils.js'

export const documentExtension = Prisma.defineExtension((client) => {
	return client.$extends({
		name: 'documentWithEmbedding',
		model: {
			document: {
				/**
				 * Cria um documento já gerando e salvando o vetor automaticamente
				 */
				async createWithEmbedding(data: {
					title: string
					content: string
				}): Promise<Prisma.DocumentModel> {
					const vectorString = await embedding(data.content)
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
				async safeCreateWithEmbedding(data: {
					title: string
					content: string
				}): Promise<Prisma.DocumentModel> {
					const context = Prisma.getExtensionContext(this)
					const alreadyCreatedDoc = await context.findUnique({
						where: { title: data.title }
					})
					if (alreadyCreatedDoc) {
						return alreadyCreatedDoc
					} else {
						return context.createWithEmbedding(data)
					}
				}
			}
		}
	})
})

export function extendPrismaClientFactory(
	connectionString: string,
	schema: string
) {
	const adapter = new PrismaPg({ connectionString }, { schema })
	return new PrismaClient({ adapter }).$extends(documentExtension)
}

export type ExtendedPrismaClient = ReturnType<typeof extendPrismaClientFactory>
