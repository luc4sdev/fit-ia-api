import { prisma } from '@/lib/prisma'
import { User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { CreateUserUseCaseRequest } from '@/use-cases/user/create-user/create-user'
import { UpdateUserUseCaseRequest } from '@/use-cases/user/update-user/update-user'
import { DeleteUserUseCaseRequest } from '@/use-cases/user/delete-user/delete-user'
import { GetAllUsersUseCaseRequest } from '@/use-cases/user/get-all-users/get-all-users'

export class PrismaUsersRepository implements UsersRepository {
  async findMany({ query, pageIndex }: GetAllUsersUseCaseRequest): Promise<{
    data: User[]
    total: number
  } | null> {
    const users = await prisma.user.findMany({
      where: query
        ? {
          OR: [
            {
              name: {
                contains: query,
              },
            },
            {
              email: {
                contains: query,
              },
            },
          ],
        }
        : {},
      take: 10,
      skip: pageIndex * 10,
      orderBy: {
        createdAt: 'desc',
      },
    })

    const total = await prisma.user.count({
      where: query
        ? {
          OR: [
            {
              name: {
                contains: query,
              },
            },
            {
              email: {
                contains: query,
              },
            },
          ],
        }
        : {},
    })

    return { data: users, total }
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email
      },
    })

    return user
  }

  async create(userToBeCreated: CreateUserUseCaseRequest): Promise<User> {
    const user = await prisma.user.create({
      data: { ...userToBeCreated, role: 'USER' },
    })

    return user
  }

  async update(userToBeUpdated: UpdateUserUseCaseRequest): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: userToBeUpdated.id,
      },
      data: userToBeUpdated,
    })

    return user
  }

  async delete({ id }: DeleteUserUseCaseRequest): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (!user) {
      throw new Error('User not found')
    }

    await prisma.user.delete({ where: { id } })

    return user
  }
}
