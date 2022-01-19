export interface ExerciseResult {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export interface ExerciseInput {
  daily_exercises: number[],
  target: number
}

const calculateRating = (exerciseAverageTime: number, exerciseTargetTime: number): number => {
  const targetHalved = (exerciseTargetTime / 2);
  if(exerciseAverageTime < targetHalved){
    return 1;
  } else if (exerciseAverageTime > targetHalved && exerciseAverageTime < exerciseTargetTime) {
    return 2;
  } else if (exerciseAverageTime >= exerciseTargetTime) {
    return 3;
  } else {
    return 0;
  }
};

export const inputIsValid = (input : number[]): boolean => {
  const allNumbers = input.every((currentValue => !isNaN(Number(currentValue))));
  return allNumbers;
};

export const calculateExercises = (exerciseInput: ExerciseInput): ExerciseResult => {
  const {target, daily_exercises} = exerciseInput;

  const exerciseDays = daily_exercises.length;
  const trainingDays = daily_exercises.filter(d => d > 0).length;
  const originalTarget = target;
  const exerciseAvgTime = (daily_exercises.reduce((previous, current) => previous + current))/ daily_exercises.length;
  const wasTargetReached = exerciseAvgTime >= originalTarget;

  const hoursRating = calculateRating(exerciseAvgTime, target);

  let explanation;
  switch(hoursRating){
    case 1:
      explanation = 'Good Start! Try to be more consistent increase your rating';
      break;
    case 2:
      explanation = 'Almost There! You\'re close to your target keep it up';
      break;
    case 3:
      explanation = 'Great Job! You reached your target!';
      break;
    default: 
      explanation = 'Something went wrong with the rating try again';
  }


  const result = {
    periodLength: exerciseDays,
    trainingDays,
    success: wasTargetReached,
    rating: hoursRating,
    ratingDescription: explanation,
    target: originalTarget,
    average: exerciseAvgTime,
  };

  return result;
};
