import { CreateUserUseCaseRequest } from '@/use-cases/user/create-user/create-user'
import { DeleteUserUseCaseRequest } from '@/use-cases/user/delete-user/delete-user'
import { GetAllUsersUseCaseRequest } from '@/use-cases/user/get-all-users/get-all-users'
import { UpdateUserUseCaseRequest } from '@/use-cases/user/update-user/update-user'
import { User } from '@prisma/client'

export interface UsersRepository {
  findMany({ query, pageIndex }: GetAllUsersUseCaseRequest): Promise<{
    data: User[]
    total: number
  } | null>
  findById(id: string): Promise<User | null>
  findByEmail(document: string): Promise<User | null>
  create(data: CreateUserUseCaseRequest): Promise<User>
  update(data: UpdateUserUseCaseRequest): Promise<User>
  delete(data: DeleteUserUseCaseRequest): Promise<User>
}
