import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'

export interface DeleteUserUseCaseRequest {
  id: string
}

interface DeleteUserUseCaseResponse {
  user: User
}

export class DeleteUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    id,
  }: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> {
    const user = await this.usersRepository.delete({ id })

    return {
      user,
    }
  }
}
