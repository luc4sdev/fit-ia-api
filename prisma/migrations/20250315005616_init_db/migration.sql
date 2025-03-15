-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "MuscleFocus" AS ENUM ('GENERAL', 'CHEST', 'ARMS', 'SHOULDERS', 'BACK', 'LOWER', 'QUADRICEPS', 'GLUTES', 'HAMSTRINGS', 'MOBILITY', 'CORRECTION', 'STRENGTHENING');

-- CreateEnum
CREATE TYPE "TrainingTime" AS ENUM ('0-2', '2-6', '6-12', '12-17', '17+');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('CHEST', 'ARMS', 'SHOULDERS', 'BACK', 'LOWER', 'QUADRICEPS', 'GLUTES', 'HAMSTRINGS', 'MOBILITY', 'CORRECTION', 'STRENGTHENING');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('BEGINNER', 'INTERMEDIATE1', 'INTERMEDIATE2', 'ADVANCED');

-- CreateEnum
CREATE TYPE "Goal" AS ENUM ('HYPERTROPHY', 'WEIGHTLOSS');

-- CreateEnum
CREATE TYPE "WeeklyFrequency" AS ENUM ('2x', '3x', '4x', '5x+');

-- CreateEnum
CREATE TYPE "WorkoutType" AS ENUM ('MALE', 'FEMALE', 'GENERAL');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "gender" "Gender" NOT NULL,
    "age" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "height" DOUBLE PRECISION NOT NULL,
    "goal" "Goal" NOT NULL,
    "trainingTime" "TrainingTime" NOT NULL,
    "weeklyFrequency" "WeeklyFrequency" NOT NULL,
    "muscleFocus" "MuscleFocus" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "description" TEXT NOT NULL,
    "videoUrl" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workouts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workoutType" "WorkoutType" NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "goal" "Goal" NOT NULL,
    "weeklyFrequency" "WeeklyFrequency" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_workouts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sub_workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sub_workouts_exercises" (
    "id" TEXT NOT NULL,
    "subWorkoutId" TEXT NOT NULL,
    "sets" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "restTime" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "exerciseId" TEXT NOT NULL,

    CONSTRAINT "sub_workouts_exercises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_workouts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "workoutId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "feedback" TEXT,

    CONSTRAINT "user_workouts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_progress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exerciseId" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "weightLifted" DOUBLE PRECISION,
    "setsCompleted" INTEGER,
    "repsCompleted" INTEGER,
    "perceivedEffort" INTEGER,
    "bodyWeight" DOUBLE PRECISION,

    CONSTRAINT "user_progress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "sub_workouts" ADD CONSTRAINT "sub_workouts_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_workouts_exercises" ADD CONSTRAINT "sub_workouts_exercises_subWorkoutId_fkey" FOREIGN KEY ("subWorkoutId") REFERENCES "sub_workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sub_workouts_exercises" ADD CONSTRAINT "sub_workouts_exercises_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workouts" ADD CONSTRAINT "user_workouts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_workouts" ADD CONSTRAINT "user_workouts_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_progress" ADD CONSTRAINT "user_progress_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercises"("id") ON DELETE SET NULL ON UPDATE CASCADE;
