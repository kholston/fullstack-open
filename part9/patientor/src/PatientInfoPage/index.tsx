import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {Button, Container, Icon, SemanticICONS} from 'semantic-ui-react';

import { apiBaseUrl } from '../constants';
import { Patient, Gender } from '../types';
import { setCurrentPatient, updatePatient, useStateValue } from '../state';
import EntryDetails from '../components/EntryDetails';

import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import AddEntryModal from '../AddEntryModal';
import { Entry } from '../types';

const PatientInfoPage = () => {
  const {id} = useParams<{id: string}>();
  const [{patient}, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] =  React.useState<string|undefined>();

  const openModal = () : void => setModalOpen(true);
  
  const closeModal = () : void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try{
      const {data: newEntry} = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      if(patient && patient.entries){
        patient.entries = patient.entries.concat(newEntry);
        dispatch(updatePatient(patient));
        closeModal();
      }
    } catch (error) {
      let errorMessage = 'Something went wrong.';
      if(axios.isAxiosError(error) && error.response) {
        console.error(error.response.data);
        errorMessage = error.response.data.error as string;
      }
      setError(errorMessage);
    }
  };

  const setPatient =  async () => {
    try {
      const {data: requestedPatient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
      dispatch(setCurrentPatient(requestedPatient));
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
        return 'other gender';
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

        {patient.entries.length > 0 && <h4>entries</h4>}
        {
          patient.entries.map(entry => {
            return(
              <EntryDetails  key={entry.id} entry={entry}/>
            );
          })
        }
        <AddEntryModal
          modalOpen={modalOpen}
          onSubmit={submitNewEntry}
          error={error}
          onClose={closeModal}
        />
        <Button onClick={() => openModal()}>Add New Entry</Button>
      </Container>
    </div>
  );
};

export default PatientInfoPage;
