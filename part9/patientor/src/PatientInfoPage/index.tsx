import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Container, Icon, SemanticICONS} from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';
import { useStateValue } from '../state';

const PatientInfoPage = () => {
  const {id} = useParams<{id: string}>();
  const [{patient}, dispatch] = useStateValue();

  const setPatient =  async () => {
    try {
      const {data: requestedPatient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch({type: "SET_PATIENT", payload: requestedPatient});
    } catch (e) {
      console.error(e.response?.data || 'Unknown Error');
    }
  };

  useEffect(() => {
    const updatePatient = async () => {
      await setPatient();
    };

    if(!patient || patient && patient.id !== id){
      updatePatient().catch(e => {
        console.error(e.response?.data || 'Unknown Error');
      });
    }
  }, []);

  const genderIcon = (gender: Gender): SemanticICONS => {
    switch(gender){
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      case 'other':
      default:
        return 'mars';
    }
  };

  if(!patient){
    return(
      <div>
        <h3>Patient not found.</h3>
      </div>
    );
  }

  return (
    <div className='App'>
      <Container textAlign='left'>
        <h3>{patient.name} <Icon name={genderIcon(patient.gender)}></Icon></h3>
        <h5>
            ssn: {patient.ssn} <br/>
            occupation: {patient.occupation} <br/>
            date of birth: {patient.dateOfBirth}
        </h5>
      </Container>
    </div>
  );
};

export default PatientInfoPage;