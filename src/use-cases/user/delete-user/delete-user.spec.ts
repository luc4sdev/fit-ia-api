import { expect, describe, it } from 'vitest'
import { InMemoryClientsRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { DeleteClientUseCase } from './delete-user'
import { randomUUID } from 'crypto'

let clientsRepository: InMemoryClientsRepository
let sut: DeleteClientUseCase

describe('Delete Client Use Case', () => {
  clientsRepository = new InMemoryClientsRepository()
  sut = new DeleteClientUseCase(clientsRepository)

  it('should be able to delete client', async () => {
    const { client } = await sut.execute({ id: randomUUID() })

    expect(client.deleted).toEqual(true)
  })
})
