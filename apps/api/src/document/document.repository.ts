import { Inject, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { EmbeddingParams, type Prisma } from '@repo/database'
import { CreateDocumentDto } from 'src/lib/types/dto/document.dto'
import type {
	GetDocumentsParams,
	IDocumentRepository,
	UpdateDocumentParams
} from 'src/lib/types/interfaces/document.inteface'
import type { CustomPrismaClient } from 'src/lib/types/prisma'

@Injectable()
export class DocumentRepository implements IDocumentRepository {
	constructor(
		@Inject('PrismaService')
		private readonly prisma: CustomPrismaClient,
		private readonly config: ConfigService
	) {}

	document(
		where: Prisma.DocumentWhereUniqueInput
	): Promise<Prisma.DocumentModel> {
		return this.prisma.client.document.findUniqueOrThrow({
			where
		})
	}

	documents(params: GetDocumentsParams) {
		return this.prisma.client.document.findMany({ ...params })
	}

	createDocument(data: CreateDocumentDto) {
		const embeddingParams: Omit<EmbeddingParams, 'prompt'> = {
			url: this.config.getOrThrow('EMBEDDING_URL'),
			dimensions: this.config.getOrThrow<number>('EMBEDDING_DIMENSIONS'),
			model: this.config.getOrThrow('EMBEDDING_MODEL_NAME')
		}

		return this.prisma.client.document.createWithEmbedding({
			data,
			embeddingParams
		})
	}

	updateDocument(params: UpdateDocumentParams) {
		const embeddingParams: Omit<EmbeddingParams, 'prompt'> = {
			url: this.config.getOrThrow('EMBEDDING_URL'),
			dimensions: this.config.getOrThrow<number>('EMBEDDING_DIMENSIONS'),
			model: this.config.getOrThrow('EMBEDDING_MODEL_NAME')
		}
		return this.prisma.client.document.updateWithEmbedding({
			...params,
			embeddingParams
		})
	}

	deleteDocument(where: Prisma.DocumentWhereUniqueInput) {
		return this.prisma.client.document.delete({ where })
	}
}
