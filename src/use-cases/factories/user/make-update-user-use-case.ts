import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUserUseCase } from '../../user/update-user/update-user'

export function makeUpdateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new UpdateUserUseCase(usersRepository)

  return registerUseCase
}
