import { app } from './app'
import { env } from './env'
import { prisma } from './lib/prisma'
import bcrypt from 'bcrypt'

async function createUser() {
  (await prisma.user.findMany()).length === 0
    ? await prisma.user.create({
      data: {
        name: 'Admin',
        email: 'admin@email.com',
        password: await bcrypt.hash('admin123', 10),
        role: 'ADMIN',
        gender: 'MALE',
        age: 22,
        weight: 70,
        height: 175,
        goal: 'HYPERTROPHY',
        trainingTime: 'SEVENTEEN_PLUS',
        weeklyFrequency: 'FIVE_PLUS_X',
        muscleFocus: 'GENERAL',
      },
    })
    : () => { }
}
createUser()

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP Server Running!')
  })
