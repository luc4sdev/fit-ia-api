import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetAllUsersUseCase } from '../../user/get-all-users/get-all-users'

export function makeGetAllUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()

  const useCase = new GetAllUsersUseCase(usersRepository)

  return useCase
}
