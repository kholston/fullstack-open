import { NewPatient, Gender, Fields} from "./types";


const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name :unknown): string => {
  if(!name || !isString(name)){
    throw new Error('Incorrect or missing name.');
  }
  return name;
};

const parseDateofBirth = ( dateOfBirth :unknown): string => {
  if(!dateOfBirth || !isString(dateOfBirth)|| !isDate){
    throw new Error('Incorrect or missing dateOfBirth: ' + dateOfBirth);
  }
  return dateOfBirth;
};

const parseSSN = (ssn :unknown): string => {
  if(!ssn || !isString(ssn)){
    throw new Error('Incorrect or missing ssn.');
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param as Gender);
};

const parseGender = (gender :unknown): Gender => {
  if(!gender || !isGender(gender)){
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation :unknown): string => {
  if(!occupation || !isString(occupation)){
    throw new Error('Incorrect or missing occupation.');
  }
  return occupation;
};



const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateofBirth(dateOfBirth),
    ssn: parseSSN(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation),
    entries: []
  };
  return newPatient;
};

export default toNewPatient;