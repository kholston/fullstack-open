  /* 
  BMI body mass / height in meters ** 2  kg/m**2
  underweight under 18.5kg 
  normal weight 18.5 to 24.9
  over weight 25 to 29.9
  obese 30 or more
  */

interface HeightWeight {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>) : HeightWeight => {
  if(args.length < 4) throw new Error('Not Enough Arguments');
  if(args.length > 4) throw new Error('Too many arguments');

  if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Invalid input. input only numbers.');
  }
  
};

export const calculateBmi = (height: number, weight: number) : string => {
  if (height <= 0 || weight <= 0){
    return 'Provided values must be greater than zero';
  }
  console.log(`Height: ${height}cm  Weight: ${weight}kg`);
  
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

  return `BMI Result: ${explanation}`;
};

try {
  const {height, weight} = parseArguments(process.argv);
  calculateBmi(height, weight);
} catch (error) {
  let errorMessage = 'Something bad happened';
  if(error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}