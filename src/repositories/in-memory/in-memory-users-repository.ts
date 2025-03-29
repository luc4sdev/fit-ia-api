import { Role, User } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { randomUUID } from 'node:crypto'
import { CreateUserUseCaseRequest } from '@/use-cases/user/create-user/create-user'
import { DeleteUserUseCaseRequest } from '@/use-cases/user/delete-user/delete-user'
import { UpdateUserUseCaseRequest } from '@/use-cases/user/update-user/update-user'

export class InMemoryUsersRepository implements UsersRepository {
  public items: User[] = []

  async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findMany(): Promise<{ data: User[]; total: number }> {
    return { data: this.items, total: this.items.length }
  }

  async findByEmail(document: string): Promise<User | null> {
    const user = this.items.find(
      (item) => item.email === document,
    )

    if (!user) {
      return null
    }

    return user
  }

  async create(data: CreateUserUseCaseRequest) {
    const user = {
      id: randomUUID(),
      role: Role.USER,
      name: data.name,
      email: data.email,
      password: data.password,
      gender: data.gender,
      age: data.age,
      weight: data.weight,
      height: data.height,
      muscleFocus: data.muscleFocus,
      goal: data.goal,
      weeklyFrequency: data.weeklyFrequency,
      trainingTime: data.trainingTime,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    this.items.push(user)

    return user
  }

  async update(userToBeUpdated: UpdateUserUseCaseRequest): Promise<User> {
    const index = this.items.findIndex(
      (user) => user.id === userToBeUpdated.id,
    )

    const updatedUser = {
      ...this.items[index],
      ...userToBeUpdated,
      updatedAt: new Date(),
    }
    this.items[index] = updatedUser
    return updatedUser
  }

  async delete({ id }: DeleteUserUseCaseRequest): Promise<User> {
    const index = this.items.findIndex((user) => user.id === id)

    const deletedUser = {
      ...this.items[index],
      deleted: true,
      active: false,
      updatedAt: new Date(),
    }
    this.items[index] = deletedUser
    return deletedUser
  }
}
