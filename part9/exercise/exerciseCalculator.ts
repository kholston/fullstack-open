interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ExerciseInput {
  exerciseTarget: number,
  exerciseHours: number[]
}

const parseInput = (args: Array<string> ): ExerciseInput => {
  if(args.length < 4) throw new Error('Not Enough Arguments')

  const input = args.slice(2)

  const allNumbers = input.every((currentValue) => !isNaN(Number(currentValue)))

  if(allNumbers){
    return {
      exerciseTarget: Number(input[0]),
      exerciseHours: input.slice(1).map(i => Number(i))
    }
  } else {
    throw new Error('Invalid Input. please input all numbers')
  }

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
  const wasTargetReached = exerciseAvgTime >= originalTarget

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

try {
  const {exerciseTarget, exerciseHours} = parseInput(process.argv)
  console.log(calculateExercises(exerciseHours, exerciseTarget))
} catch (error) {
  let errorMessage = 'Something bad happened'
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message
  }
  console.log(errorMessage)
}