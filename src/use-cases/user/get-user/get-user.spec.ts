import { expect, describe, it } from 'vitest'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetClientUseCase } from './get-user'

let clientsRepository: InMemoryClientsRepository
let sut: GetClientUseCase

describe('Get Client Use Case', () => {
  clientsRepository = new InMemoryClientsRepository()
  sut = new GetClientUseCase(clientsRepository)

  it('should be able to get client', async () => {
    const createdClient = await clientsRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      phone: '(99) 99999-9999',
      image: 'image.png',
    })

    const client = await sut.execute({ clientId: createdClient.id })

    expect(client.name).toEqual('John Doe')
  })
})
