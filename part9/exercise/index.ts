import express from 'express';
import { calculateBmi } from './exerciseTools';

const app = express();

const isNumber = (input: any): boolean => {
  return !isNaN(Number(input))
}

app.get('/hello', (_req, res) => [
  res.send('Hello Full Stack!')
])

app.get('/bmi', (req,res) => {
  const {height, weight} = req.query

  if(height && weight && isNumber(height) && isNumber(weight)){
    const bmi = calculateBmi(Number(height), Number(weight))
    res.json({
      weight,
      height,
      bmi
    })
  } else {
    res.json({
      error: 'malformatted parameters',
    })
  }
})

const PORT = 3002

app.listen(PORT, () => {
  console.info(`Server running on port ${PORT}`)
})