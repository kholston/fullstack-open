  /* 
  BMI body mass / height in meters ** 2  kg/m**2
  underweight under 18.5kg 
  normal weight 18.5 to 24.9
  over weight 25 to 29.9
  obese 30 or more
  */

const calculateBmi = (height: number, weight: number) : string => {
  if (height <= 0 || weight <= 0){
    return 'Provided values must be greater than zero'
  }

  const meters = height / 100

  const result = (weight / meters ** 2);

  if (result < 18.5) {
    return 'Underweight'
  } else if (result >= 18.5 && result <= 24.9) {
    return 'Normal (healthy weight)'
  } else if (result >= 25 && result <= 29.9) {
    return 'Overweight'
  } else if (result > 30) {
    return 'Obese'
  } else {
    return 'Something bad happened.'
  }
}

console.log('Height: 180cm  Weight: 74kg')
console.log(calculateBmi(180,74));