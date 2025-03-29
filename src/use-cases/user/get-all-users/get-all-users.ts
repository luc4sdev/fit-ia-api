import { UsersRepository } from '../../../repositories/users-repository'
import { User } from '@prisma/client'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'

type GetAllUsersUseCaseResponse = { data: User[]; total: number }

export interface GetAllUsersUseCaseRequest {
  query?: string | null
  pageIndex: number
}

export class GetAllUsersUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    query,
    pageIndex,
  }: GetAllUsersUseCaseRequest): Promise<GetAllUsersUseCaseResponse> {
    const users = await this.usersRepository.findMany({ query, pageIndex })

    if (!users?.data) {
      throw new ResourceNotFoundError()
    }

    return users
  }
}
