import { makeDeleteUserUseCase } from '@/use-cases/factories/user/make-delete-user-use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

export const deleteUserBodySchema = z.object({
  id: z.string().uuid(),
})

export async function deleteUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id } = deleteUserBodySchema.parse(request.body)

  const deleteUserUseCase = makeDeleteUserUseCase()

  const data = await deleteUserUseCase.execute({ id })

  return reply.status(200).send(data.user)
}
