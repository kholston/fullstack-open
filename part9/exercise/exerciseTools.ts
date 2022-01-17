export const calculateBmi = (height: number, weight: number) : string => {
  if (height <= 0 || weight <= 0){
    return 'Provided values must be greater than zero';
  }
  
  const meters = height / 100;

  const result = (weight / meters ** 2);
  let explanation;
  if (result < 18.5) {
    explanation = 'Underweight';
  } else if (result >= 18.5 && result <= 24.9) {
    explanation = 'Normal (healthy weight)';
  } else if (result >= 25 && result <= 29.9) {
    explanation = 'Overweight';
  } else if (result > 30) {
    explanation = 'Obese';
  } else {
    explanation = 'Something bad happened.';
  }

  return explanation;
};