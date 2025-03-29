import { makeGetUserUseCase } from '@/use-cases/factories/user/make-get-user-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'

interface Request {
  userId: string
}
export async function getUser(request: FastifyRequest, reply: FastifyReply) {
  const req = (await request.params) as Request
  const userId = req.userId

  const getUser = makeGetUserUseCase()

  const user = await getUser.execute({
    userId,
  })

  return reply.status(200).send(user)
}
