import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'
import { ApiController } from './controllers/api/api'
import { createUser, createUserBodySchema } from './controllers/user/create-user/create-user'
import { deleteUser } from './controllers/user/delete-user/delete-user'
import { updateUser, updateUserBodySchema } from './controllers/user/update-user/update-user'
import { getUser } from './controllers/user/get-user/get-user'
import { getAllUsers } from './controllers/user/get-all-users/get-all-users'

export async function appRoutes(app: FastifyInstance) {

  app.withTypeProvider<ZodTypeProvider>().post(
    '/authenticate',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Authenticate',
        body: z.object({
          email: z.string().email(),
          password: z.string(),
        }),
        response: {
          200: z.object({
            token: z.string(),
            user: z.object({
              id: z.string(),
              name: z.string(),
              email: z.string().email(),
              password: z.string(),
              createdAt: z.date(),
              updatedAt: z.date(),
            }),
          }),
        },
      },
    },
    ApiController.authenticate,
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/validate-token',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Validate Token',
        body: z.object({
          token: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
          }),
        },
      },
    },
    ApiController.validateToken,
  )

  app.withTypeProvider<ZodTypeProvider>().post(
    '/destroy',
    {
      schema: {
        tags: ['Auth'],
        summary: 'Destroy Token',
        body: z.object({
          token: z.string(),
        }),
      },
    },
    ApiController.destroy,
  )

  // --- User Routes ---
  app.withTypeProvider<ZodTypeProvider>().post(
    '/users',
    {
      schema: {
        tags: ['Users'],
        summary: 'Create a new user',
        body: createUserBodySchema,
        response: {
          201: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            role: z.enum(['ADMIN', 'USER']),
            gender: z.enum(['MALE', 'FEMALE']),
            age: z.number(),
            weight: z.number(),
            height: z.number(),
            goal: z.enum(['HYPERTROPHY', 'WEIGHTLOSS']),
            trainingTime: z.enum(["ZERO_TO_TWO", "TWO_TO_SIX", "SIX_TO_TWELVE", "TWELVE_TO_SEVENTEEN", "SEVENTEEN_PLUS"]),
            weeklyFrequency: z.enum(["TWO_X", "THREE_X", "FOUR_X", "FIVE_PLUS_X"]),
            muscleFocus: z.enum(['GENERAL', 'CHEST', 'ARMS', 'SHOULDERS', 'BACK', 'LOWER', 'QUADRICEPS', 'GLUTES', 'HAMSTRINGS', 'MOBILITY', 'CORRECTION', 'STRENGTHENING']),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          }),
        },
      },
    },
    createUser,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/users',
    {
      schema: {
        tags: ['Users'],
        summary: 'Get all users',
        response: {
          200: z.object({
            data: z.array(
              z.object({
                id: z.string(),
                name: z.string(),
                email: z.string().email(),
                role: z.enum(['ADMIN', 'USER']),
                gender: z.enum(['MALE', 'FEMALE']),
                age: z.number(),
                weight: z.number(),
                height: z.number(),
                goal: z.enum(['HYPERTROPHY', 'WEIGHTLOSS']),
                trainingTime: z.enum(["ZERO_TO_TWO", "TWO_TO_SIX", "SIX_TO_TWELVE", "TWELVE_TO_SEVENTEEN", "SEVENTEEN_PLUS"]),
                weeklyFrequency: z.enum(["TWO_X", "THREE_X", "FOUR_X", "FIVE_PLUS_X"]),
                muscleFocus: z.enum(['GENERAL', 'CHEST', 'ARMS', 'SHOULDERS', 'BACK', 'LOWER', 'QUADRICEPS', 'GLUTES', 'HAMSTRINGS', 'MOBILITY', 'CORRECTION', 'STRENGTHENING']),
                createdAt: z.string().datetime(),
                updatedAt: z.string().datetime(),
              }),
            ),
            total: z.number(),
          }),
        },
      },
    },
    getAllUsers,
  )

  app.withTypeProvider<ZodTypeProvider>().get(
    '/users/:userId',
    {
      schema: {
        tags: ['Users'],
        summary: 'Get a user by ID',
        params: z.object({
          userId: z.string(),
        }),
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            role: z.enum(['ADMIN', 'USER']),
            gender: z.enum(['MALE', 'FEMALE']),
            age: z.number(),
            weight: z.number(),
            height: z.number(),
            goal: z.enum(['HYPERTROPHY', 'WEIGHTLOSS']),
            trainingTime: z.enum(["ZERO_TO_TWO", "TWO_TO_SIX", "SIX_TO_TWELVE", "TWELVE_TO_SEVENTEEN", "SEVENTEEN_PLUS"]),
            weeklyFrequency: z.enum(["TWO_X", "THREE_X", "FOUR_X", "FIVE_PLUS_X"]),
            muscleFocus: z.enum(['GENERAL', 'CHEST', 'ARMS', 'SHOULDERS', 'BACK', 'LOWER', 'QUADRICEPS', 'GLUTES', 'HAMSTRINGS', 'MOBILITY', 'CORRECTION', 'STRENGTHENING']),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          }),
        },
      },
    },
    getUser,
  )

  app.withTypeProvider<ZodTypeProvider>().put(
    '/users/:userId',
    {
      schema: {
        tags: ['Users'],
        summary: 'Update a user',
        params: z.object({
          userId: z.string(),
        }),
        body: updateUserBodySchema,
        response: {
          200: z.object({
            id: z.string(),
            name: z.string(),
            email: z.string().email(),
            role: z.enum(['ADMIN', 'USER']),
            gender: z.enum(['MALE', 'FEMALE']),
            age: z.number(),
            weight: z.number(),
            height: z.number(),
            goal: z.enum(['HYPERTROPHY', 'WEIGHTLOSS']),
            trainingTime: z.enum(["ZERO_TO_TWO", "TWO_TO_SIX", "SIX_TO_TWELVE", "TWELVE_TO_SEVENTEEN", "SEVENTEEN_PLUS"]),
            weeklyFrequency: z.enum(["TWO_X", "THREE_X", "FOUR_X", "FIVE_PLUS_X"]),
            muscleFocus: z.enum(['GENERAL', 'CHEST', 'ARMS', 'SHOULDERS', 'BACK', 'LOWER', 'QUADRICEPS', 'GLUTES', 'HAMSTRINGS', 'MOBILITY', 'CORRECTION', 'STRENGTHENING']),
            createdAt: z.string().datetime(),
            updatedAt: z.string().datetime(),
          }),
        },
      },
    },
    updateUser,
  )

  app.withTypeProvider<ZodTypeProvider>().delete(
    '/users/:userId',
    {
      schema: {
        tags: ['Users'],
        summary: 'Delete a user',
        params: z.object({
          userId: z.string(),
        }),
        response: {
          204: z.null(),
        },
      },
    },
    deleteUser,
  )

  //   // --- Workout Routes ---
  //   app.withTypeProvider<ZodTypeProvider>().post(
  //     '/workouts',
  //     {
  //       schema: {
  //         tags: ['Workouts'],
  //         summary: 'Create a new workout',
  //         body: createWorkoutBodySchema,
  //         response: {
  //           201: z.object({
  //             id: z.string(),
  //             name: z.string(),
  //             workoutType: z.enum(['MALE', 'FEMALE', 'GENERAL']),
  //             difficulty: z.enum(['BEGINNER', 'INTERMEDIATE1', 'INTERMEDIATE2', 'ADVANCED']),
  //             goal: z.enum(['HYPERTROPHY', 'WEIGHTLOSS']),
  //             weeklyFrequency: z.enum(['2x', '3x', '4x', '5x+']),
  //             createdAt: z.string().datetime(),
  //             updatedAt: z.string().datetime(),
  //           }),
  //         },
  //       },
  //     },
  //     createWorkout,
  //   )

  //   app.withTypeProvider<ZodTypeProvider>().get(
  //     '/workouts',
  //     {
  //       schema: {
  //         tags: ['Workouts'],
  //         summary: 'Get all workouts',
  //         response: {
  //           200: z.object({
  //             data: z.array(
  //               z.object({
  //                 id: z.string(),
  //                 name: z.string(),
  //                 workoutType: z.enum(['MALE', 'FEMALE', 'GENERAL']),
  //                 difficulty: z.enum(['BEGINNER', 'INTERMEDIATE1', 'INTERMEDIATE2', 'ADVANCED']),
  //                 goal: z.enum(['HYPERTROPHY', 'WEIGHTLOSS']),
  //                 weeklyFrequency: z.enum(['2x', '3x', '4x', '5x+']),
  //                 createdAt: z.string().datetime(),
  //                 updatedAt: z.string().datetime(),
  //               }),
  //             ),
  //             total: z.number(),
  //           }),
  //         },
  //       },
  //     },
  //     getAllWorkouts,
  //   )

  //   app.withTypeProvider<ZodTypeProvider>().get(
  //     '/workouts/:workoutId',
  //     {
  //       schema: {
  //         tags: ['Workouts'],
  //         summary: 'Get a workout by ID',
  //         params: z.object({
  //           workoutId: z.string(),
  //         }),
  //         response: {
  //           200: z.object({
  //             id: z.string(),
  //             name: z.string(),
  //             workoutType: z.enum(['MALE', 'FEMALE', 'GENERAL']),
  //             difficulty: z.enum(['BEGINNER', 'INTERMEDIATE1', 'INTERMEDIATE2', 'ADVANCED']),
  //             goal: z.enum(['HYPERTROPHY', 'WEIGHTLOSS']),
  //             weeklyFrequency: z.enum(['2x', '3x', '4x', '5x+']),
  //             createdAt: z.string().datetime(),
  //             updatedAt: z.string().datetime(),
  //           }),
  //         },
  //       },
  //     },
  //     getWorkout,
  //   )

  //   app.withTypeProvider<ZodTypeProvider>().put(
  //     '/workouts/:workoutId',
  //     {
  //       schema: {
  //         tags: ['Workouts'],
  //         summary: 'Update a workout',
  //         params: z.object({
  //           workoutId: z.string(),
  //         }),
  //         body: updateWorkoutBodySchema,
  //         response: {
  //           200: z.object({
  //             id: z.string(),
  //             name: z.string(),
  //             workoutType: z.enum(['MALE', 'FEMALE', 'GENERAL']),
  //             difficulty: z.enum(['BEGINNER', 'INTERMEDIATE1', 'INTERMEDIATE2', 'ADVANCED']),
  //             goal: z.enum(['HYPERTROPHY', 'WEIGHTLOSS']),
  //             weeklyFrequency: z.enum(['2x', '3x', '4x', '5x+']),
  //             createdAt: z.string().datetime(),
  //             updatedAt: z.string().datetime(),
  //           }),
  //         },
  //       },
  //     },
  //     updateWorkout,
  //   )

  //   app.withTypeProvider<ZodTypeProvider>().delete(
  //     '/workouts/:workoutId',
  //     {
  //       schema: {
  //         tags: ['Workouts'],
  //         summary: 'Delete a workout',
  //         params: z.object({
  //           workoutId: z.string(),
  //         }),
  //         response: {
  //           204: z.null(),
  //         },
  //       },
  //     },
  //     deleteWorkout,
  //   )

  //   // --- Exercise Routes ---
  //   app.withTypeProvider<ZodTypeProvider>().post(
  //     '/exercises',
  //     {
  //       schema: {
  //         tags: ['Exercises'],
  //         summary: 'Create a new exercise',
  //         body: createExerciseBodySchema,
  //         response: {
  //           201: z.object({
  //             id: z.string(),
  //             name: z.string(),
  //             category: z.enum(['CHEST', 'ARMS', 'SHOULDERS', 'BACK', 'LOWER', 'QUADRICEPS', 'GLUTES', 'HAMSTRINGS', 'MOBILITY', 'CORRECTION', 'STRENGTHENING']),
  //             description: z.string(),
  //             videoUrl: z.string().nullable(),
  //             createdAt: z.string().datetime(),
  //             updatedAt: z.string().datetime(),
  //           }),
  //         },
  //       },
  //     },
  //     createExercise,
  //   )

  //   app.withTypeProvider<ZodTypeProvider>().get(
  //     '/exercises',
  //     {
  //       schema: {
  //         tags: ['Exercises'],
  //         summary: 'Get all exercises',
  //         response: {
  //           200: z.object({
  //             data: z.array(
  //               z.object({
  //                 id: z.string(),
  //                 name: z.string(),
  //                 category: z.enum(['CHEST', 'ARMS', 'SHOULDERS', 'BACK', 'LOWER', 'QUADRICEPS', 'GLUTES', 'HAMSTRINGS', 'MOBILITY', 'CORRECTION', 'STRENGTHENING']),
  //                 description: z.string(),
  //                 videoUrl: z.string().nullable(),
  //                 createdAt: z.string().datetime(),
  //                 updatedAt: z.string().datetime(),
  //               }),
  //             ),
  //             total: z.number(),
  //           }),
  //         },
  //       },
  //     },
  //     getAllExercises,
  //   )

  //   app.withTypeProvider<ZodTypeProvider>().get(
  //     '/exercises/:exerciseId',
  //     {
  //       schema: {
  //         tags: ['Exercises'],
  //         summary: 'Get an exercise by ID',
  //         params: z.object({
  //           exerciseId: z.string(),
  //         }),
  //         response: {
  //           200: z.object({
  //             id: z.string(),
  //             name: z.string(),
  //             category: z.enum(['CHEST', 'ARMS', 'SHOULDERS', 'BACK', 'LOWER', 'QUADRICEPS', 'GLUTES', 'HAMSTRINGS', 'MOBILITY', 'CORRECTION', 'STRENGTHENING']),
  //             description: z.string(),
  //             videoUrl: z.string().nullable(),
  //             createdAt: z.string().datetime(),
  //             updatedAt: z.string().datetime(),
  //           }),
  //         },
  //       },
  //     },
  //     getExercise,
  //   )

  //   app.withTypeProvider<ZodTypeProvider>().put(
  //     '/exercises/:exerciseId',
  //     {
  //       schema: {
  //         tags: ['Exercises'],
  //         summary: 'Update an exercise',
  //         params: z.object({
  //           exerciseId: z.string(),
  //         }),
  //         body: updateExerciseBodySchema,
  //         response: {
  //           200: z.object({
  //             id: z.string(),
  //             name: z.string(),
  //             category: z.enum(['CHEST', 'ARMS', 'SHOULDERS', 'BACK', 'LOWER', 'QUADRICEPS', 'GLUTES', 'HAMSTRINGS', 'MOBILITY', 'CORRECTION', 'STRENGTHENING']),
  //             description: z.string(),
  //             videoUrl: z.string().nullable(),
  //             createdAt: z.string().datetime(),
  //             updatedAt: z.string().datetime(),
  //           }),
  //         },
  //       },
  //     },
  //     updateExercise,
  //   )

  //   app.withTypeProvider<ZodTypeProvider>().delete(
  //     '/exercises/:exerciseId',
  //     {
  //       schema: {
  //         tags: ['Exercises'],
  //         summary: 'Delete an exercise',
  //         params: z.object({
  //           exerciseId: z.string(),
  //         }),
  //         response: {
  //           204: z.null(),
  //         },
  //       },
  //     },
  //     deleteExercise,
  //   )

}
