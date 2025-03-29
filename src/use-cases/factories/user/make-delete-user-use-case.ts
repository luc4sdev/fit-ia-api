import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { DeleteUserUseCase } from '../../user/delete-user/delete-user'

export function makeDeleteUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new DeleteUserUseCase(usersRepository)

  return registerUseCase
}
