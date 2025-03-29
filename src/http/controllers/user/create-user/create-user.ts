import { FastifyRequest, FastifyReply } from 'fastify'
import { makeCreateUserUseCase } from '@/use-cases/factories/user/make-create-user-use-case'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export const createUserBodySchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  gender: z.enum(["MALE", "FEMALE"]),
  age: z.number().int().min(1, "Idade deve ser positiva"),
  weight: z.number().min(0, "Peso deve ser não-negativo"),
  height: z.number().min(0, "Altura deve ser não-negativa"),
  goal: z.enum(["HYPERTROPHY", "WEIGHTLOSS"]),
  trainingTime: z.enum(["ZERO_TO_TWO", "TWO_TO_SIX", "SIX_TO_TWELVE", "TWELVE_TO_SEVENTEEN", "SEVENTEEN_PLUS"]),
  weeklyFrequency: z.enum(["TWO_X", "THREE_X", "FOUR_X", "FIVE_PLUS_X"]),
  muscleFocus: z.enum([
    "GENERAL",
    "CHEST",
    "ARMS",
    "SHOULDERS",
    "BACK",
    "LOWER",
    "QUADRICEPS",
    "GLUTES",
    "HAMSTRINGS",
    "MOBILITY",
    "CORRECTION",
    "STRENGTHENING",
  ]),
});

export async function createUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { name, email, age, gender, goal, height, muscleFocus, password, trainingTime, weeklyFrequency, weight } = createUserBodySchema.parse(
    request.body,
  )

  try {
    const createUserUseCase = makeCreateUserUseCase()

    const data = await createUserUseCase.execute({
      name,
      email,
      password,
      age,
      gender,
      goal,
      height,
      weight,
      muscleFocus,
      trainingTime,
      weeklyFrequency,
    })

    return reply.status(201).send(data.user)
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }
}
