import {v1 as uuid} from 'uuid';
import patients from '../data/patients';
import { NonSensitivePatient, Patient , NewPatient} from '../types';



const getPatients = (): Patient[] => {
  return patients;
};

const getNonSensitivePatients = (): NonSensitivePatient[] =>{
  return patients.map(({id, name, dateOfBirth, gender,occupation, entries}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };
  patients.push(newPatient);
  return newPatient;
};

const getPatient = (patientId: string): (Patient | undefined) => {
  return patients.find(patient => patient.id === patientId);
};

export default {
  getPatients,
  getNonSensitivePatients,
  addPatient,
  getPatient
};