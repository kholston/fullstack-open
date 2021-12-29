interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

const calculateRating = (exerciseAverageTime: number, exerciseTargetTime: number): number => {
  const targetHalved = (exerciseTargetTime / 2)
  if(exerciseAverageTime < targetHalved){
    return 1
  } else if (exerciseAverageTime > targetHalved && exerciseAverageTime < exerciseTargetTime) {
    return 2
  } else if (exerciseAverageTime >= exerciseTargetTime) {
    return 3
  } else {
    return 0
  }
}

const calculateExercises = (exerciseHours: number[], exerciseTarget: number): Result => {
  const exerciseDays = exerciseHours.length
  const trainingDays = exerciseHours.filter(d => d > 0).length
  const originalTarget = exerciseTarget
  const exerciseAvgTime = (exerciseHours.reduce((previous, current) => previous + current))/ exerciseHours.length
  const wasTargetReached = exerciseAvgTime === originalTarget

  const hoursRating = calculateRating(exerciseAvgTime, exerciseTarget)

  let explanation;
  switch(hoursRating){
    case 1:
      explanation = 'Good Start! Try to be more consistent increase your rating'
      break
    case 2:
      explanation = 'Almost There! You\'re close to your target keep it up'
      break
    case 3:
      explanation = 'Great Job! You reached your target!'
      break
    default: 
      explanation = 'Something went wrong with the rating try again'
  }


  let result = {
    periodLength: exerciseDays,
    trainingDays,
    success: wasTargetReached,
    rating: hoursRating,
    ratingDescription: explanation,
    target: originalTarget,
    average: exerciseAvgTime,
  }

  return result
}

const dailyExerciseHours = [3,0,2,4.5,0,3,1]
console.log('Exercise Hours:', dailyExerciseHours, 'Target:', 2)
console.log('Exercise Info:', calculateExercises(dailyExerciseHours, 2))