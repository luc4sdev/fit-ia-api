import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { Gender, Goal, MuscleFocus, TrainingTime, User, WeeklyFrequency } from '@prisma/client'


export interface CreateUserUseCaseRequest {
  name: string;
  email: string;
  password: string;
  gender: Gender;
  age: number;
  weight: number;
  height: number;
  goal: Goal;
  trainingTime: TrainingTime;
  weeklyFrequency: WeeklyFrequency;
  muscleFocus: MuscleFocus;
}

interface CreateUserUseCaseResponse {
  user: User
}

export class CreateUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
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
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameDocument =
      await this.usersRepository.findByEmail(email)

    if (userWithSameDocument) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
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

    return {
      user,
    }
  }
}
