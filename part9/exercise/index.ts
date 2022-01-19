import express from 'express';
import { calculateBmi } from './exerciseTools';
import { calculateExercises, ExerciseInput, ExerciseResult, inputIsValid } from './exerciseCalculator';

const app = express();

app.use(express.json());

const isNumber = (input: unknown): boolean => {
  return !isNaN(Number(input));
};

app.get('/hello', (_req, res) => [
  res.send('Hello Full Stack!')
]);

app.get('/bmi', (req,res) => {
  const {height, weight} = req.query;

  if(height && weight && isNumber(height) && isNumber(weight)){
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight,
      height,
      bmi
    });
  } else {
    res.json({
      error: 'malformatted parameters',
    });
  }
});


app.post('/exercises', (req, res) => {
  const {daily_exercises, target} = req.body as ExerciseInput;
  
  if(!daily_exercises|| !target){
    res.json({
      error: 'parameters missing'
    });
  } else if (isNaN(target) || !Array.isArray(daily_exercises) || !inputIsValid(daily_exercises)) {
    res.json({
      error: 'malformatted parameters',
    });
  } else {
    const exerciseResult: ExerciseResult = calculateExercises({target, daily_exercises});
    res.json(exerciseResult);
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`);
});