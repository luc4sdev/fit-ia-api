import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function seed() {
  await prisma.client.deleteMany()
  await prisma.user.deleteMany()

  await prisma.user.create({
    data: {
      name: 'Admin',
      email: 'admin@email.com',
      password: await bcrypt.hash('admin123', 10),
    },
  })
}

seed().then(() => {
  console.log('Database seeded!')
})
