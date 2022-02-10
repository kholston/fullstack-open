import React from 'react';
import { Entry, HealthCheckEntry, HealthCheckRating, HospitalEntry, OccupationalHealthcareEntry } from '../types';
import { assertNever } from '../utils';
import { Icon, Segment} from 'semantic-ui-react';


const HealthCheckEntryDetail: React.FC<{entry: HealthCheckEntry}> = ({entry}) => {
  const ratingColor = (healthRating: HealthCheckRating) => {
    switch(healthRating){
      case HealthCheckRating.HEALTHY:
        return 'green';
      case HealthCheckRating.LowRisk:
        return 'yellow';
      case HealthCheckRating.HighRisk:
        return 'orange';
      case HealthCheckRating.CriticalRisk:
        return 'red';
      default:
        assertNever(healthRating);
    }
  };

  return(
    <Segment>
      <h4>{entry.date} <Icon name='doctor' size='big'></Icon></h4>
      <p>{entry.description}</p>
      <Icon name='heart' color={ratingColor(entry.healthCheckRating)}></Icon>
    </Segment>
  );
};

const HospitalEntryDetail: React.FC<{entry: HospitalEntry}> = ({entry}) => {
  return(
    <Segment>
      <h4>{entry.date} <Icon name="doctor" size='big'></Icon></h4>
      <p>{entry.description}</p>
      {entry.discharge && 
        <div>
          <h5>Discharged:</h5>
          <p>Date: {entry.discharge.date} <br/> Criteria: {entry.discharge.criteria}</p>
        </div>
      }
    </Segment>
  );
};

const OccupationalEntryDetail: React.FC<{entry: OccupationalHealthcareEntry}> = ({entry}) => {
  return(
    <Segment>
        <h4>{entry.date} <Icon name='stethoscope' size='big'></Icon> {entry.employerName}</h4>
        <p>{entry.description}</p>
    </Segment>
  );
};





const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch(entry.type) {
    case "Hospital":
      return <HospitalEntryDetail entry={entry}/>;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetail entry={entry}/>;
    case "HealthCheck":
      return <HealthCheckEntryDetail entry={entry}/>;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;