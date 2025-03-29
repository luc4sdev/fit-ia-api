import { TrainingTime, WeeklyFrequency } from "@prisma/client";

export function convertTrainingTimeToEnum(value: string): TrainingTime {
    switch (value) {
        case "0-2":
            return TrainingTime.ZERO_TO_TWO;
        case "2-6":
            return TrainingTime.TWO_TO_SIX;
        case "6-12":
            return TrainingTime.SIX_TO_TWELVE;
        case "12-17":
            return TrainingTime.TWELVE_TO_SEVENTEEN;
        case "17+":
            return TrainingTime.SEVENTEEN_PLUS;
        default:
            return TrainingTime.ZERO_TO_TWO;
    }
}

export function convertWeeklyFrequencyToEnum(value: string): WeeklyFrequency {
    switch (value) {
        case "2x":
            return WeeklyFrequency.TWO_X;
        case "3x":
            return WeeklyFrequency.THREE_X;
        case "4x":
            return WeeklyFrequency.FOUR_X;
        case "5x+":
            return WeeklyFrequency.FIVE_PLUS_X;
        default:
            return WeeklyFrequency.TWO_X;
    }
}