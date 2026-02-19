import { Inject, Injectable } from '@nestjs/common'
import type { Prisma } from '@repo/database'
import type {
	GetUsersParams,
	IUserRepository,
	UpdateUserParams
} from 'src/lib/types/interfaces/user.interface'
import type { CustomPrismaClient } from 'src/lib/types/prisma'

@Injectable()
export class UsersRepository implements IUserRepository {
	constructor(
		@Inject('PrismaService')
		private readonly prisma: CustomPrismaClient
	) {}

	user(
		userWhereUniqueInput: Prisma.UserWhereUniqueInput
	): Promise<Prisma.UserModel> {
		return this.prisma.client.user.findUniqueOrThrow({
			where: userWhereUniqueInput
		})
	}

	users(params: GetUsersParams) {
		return this.prisma.client.user.findMany({ ...params })
	}

	createUser(data: Prisma.UserCreateInput) {
		return this.prisma.client.user.create({ data })
	}

	updateUser(params: UpdateUserParams) {
		return this.prisma.client.user.update({ ...params })
	}

	deleteUser(where: Prisma.UserWhereUniqueInput) {
		return this.prisma.client.user.delete({ where })
	}
}
