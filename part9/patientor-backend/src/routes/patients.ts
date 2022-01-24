import express from 'express';
import patientService from '../services/patientService';
import { Fields } from '../types';
import toNewPatient from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

patientRouter.post('/', (req, res) => {
  try {
    const patient = toNewPatient(req.body as Fields);
    const newPatient = patientService.addPatient(patient);
    res.json(newPatient);
  } catch (error) {
    let errorMessage = 'Something went wrong. ';
    if(error instanceof Error){
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});


export default patientRouter;