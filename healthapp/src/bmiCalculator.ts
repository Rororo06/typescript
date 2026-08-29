import { isNotNumber } from './utils.ts';

export const calculateBmi = (height: number, weight: number): string => {
  if (height <= 0 || weight <= 0) {
    throw new Error('height and weight must be positive numbers');
  }

  const bmi = weight / (height / 100) ** 2;

  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi < 25) {
    return 'Normal range';
  }
  if (bmi < 30) {
    return 'Overweight';
  }
  return 'Obese';
};

interface BmiArguments {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): BmiArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const [height, weight] = args.slice(2);

  if (isNotNumber(height) || isNotNumber(weight)) {
    throw new Error('Provided values were not numbers!');
  }

  return { height: Number(height), weight: Number(weight) };
};

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'unknown error';
    console.log('Error:', message);
  }
}
