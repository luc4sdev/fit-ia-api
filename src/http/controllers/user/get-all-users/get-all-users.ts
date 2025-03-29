import { makeGetAllUsersUseCase } from '@/use-cases/factories/user/make-get-all-users-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export const getAllUsersParamsSchema = z.object({
  query: z.string().nullish(),
  pageIndex: z.string().nullable().default('0').transform(Number),
})

export async function getAllUsers(req: FastifyRequest, reply: FastifyReply) {
  const { query, pageIndex } = getAllUsersParamsSchema.parse(req.query)

  const getUser = makeGetAllUsersUseCase()

  const users = await getUser.execute({ query, pageIndex })
  return reply.status(200).send(users)
}
