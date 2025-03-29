import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { CreateUserUseCase } from '../../user/create-user/create-user'

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const registerUseCase = new CreateUserUseCase(usersRepository)

  return registerUseCase
}
