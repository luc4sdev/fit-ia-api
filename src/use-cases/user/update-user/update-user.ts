import { UsersRepository } from '@/repositories/users-repository'
import { Gender, Goal, MuscleFocus, TrainingTime, User, WeeklyFrequency } from '@prisma/client'

export interface UpdateUserUseCaseRequest {
  id: string
  name?: string;
  email?: string;
  password?: string;
  gender?: Gender;
  age?: number;
  weight?: number;
  height?: number;
  goal?: Goal;
  trainingTime?: TrainingTime;
  weeklyFrequency?: WeeklyFrequency;
  muscleFocus?: MuscleFocus;
}

interface UpdateUserUseCaseResponse {
  user: User
}

export class UpdateUserUseCase {
  constructor(private usersRepository: UsersRepository) { }

  async execute({
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
  }: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> {
    const user = await this.usersRepository.update({
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

    return {
      user,
    }
  }
}
