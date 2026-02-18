import { Inject, Injectable } from '@nestjs/common'
import type { Prisma } from '@repo/database'
import { DocumentSchema } from '@repo/schemas'
import type { CustomPrismaClient } from 'src/lib/extensions/prisma.extension'
import { CreateDocumentDto } from 'src/lib/types/dto/document.dto'
import type {
	GetDocumentsParams,
	IDocumentRepository,
	UpdateDocumentParams
} from 'src/lib/types/interfaces/document.inteface'

@Injectable()
export class DocumentRepository implements IDocumentRepository {
	constructor(
		@Inject('PrismaService')
		private readonly prisma: CustomPrismaClient
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
		return this.prisma.client.document.create({ data })
	}

	updateDocument(params: UpdateDocumentParams) {
		return this.prisma.client.document.update({ ...params })
	}

	deleteDocument(where: Prisma.DocumentWhereUniqueInput) {
		return this.prisma.client.document.delete({ where })
	}
}
