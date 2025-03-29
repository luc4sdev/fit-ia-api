import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateUserUseCase } from '@/use-cases/factories/user/make-update-user-use-case'

export const updateUserBodySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "Nome é obrigatório").optional(),
  email: z.string().email("Email inválido").optional(),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres").optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  age: z.number().int().min(1, "Idade deve ser positiva").optional(),
  weight: z.number().min(0, "Peso deve ser não-negativo").optional(),
  height: z.number().min(0, "Altura deve ser não-negativa").optional(),
  goal: z.enum(["HYPERTROPHY", "WEIGHTLOSS"]).optional(),
  trainingTime: z.enum(["ZERO_TO_TWO", "TWO_TO_SIX", "SIX_TO_TWELVE", "TWELVE_TO_SEVENTEEN", "SEVENTEEN_PLUS"]).optional(),
  weeklyFrequency: z.enum(["TWO_X", "THREE_X", "FOUR_X", "FIVE_PLUS_X"]).optional(),
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
  ]).optional(),
})

export async function updateUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const { id, name, email, age, gender, goal, height, muscleFocus, password, trainingTime, weeklyFrequency, weight } = updateUserBodySchema.parse(
    request.body,
  )

  try {
    const updateUserUseCase = makeUpdateUserUseCase()

    const data = await updateUserUseCase.execute({
      id,
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

    return reply.status(200).send(data.user)
  } catch (err) {
    throw err
  }
}
