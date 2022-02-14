import { NewPatient, Gender, Diagnose, PatientFields, EntryFields, EntryWithoutId, BaseEntryWithoutId, BaseEntryFields, HealthCheckRating, SickLeave, Discharge} from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled type member: ${JSON.stringify(value)}`
  );
};

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

const parseType = (type: unknown): string => {
  if(!type || !isString(type)){
    throw new Error('Incorrect or missing type:' + type);
  }
  return type;
};

const parseDescription = (description: unknown): string => {
  if(!description || !isString(description)){
    throw new Error('Incorrect or missing description:' + description);
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if(!date || !isString(date) || !isDate(date)){
    throw new Error('Incorrect or missing date:' + date);
  }
  return date;
};

const parseSpecialist = (specialist: unknown): string => {
  if(!specialist || !isString(specialist)){
    throw new Error('Incorrect or missing specialist:' + specialist);
  }
  return specialist;
};

const isDiagnosisCodes = (codes: unknown): codes is Array<Diagnose['code']> => {
  return (Array.isArray(codes)) && codes.every(code => isString(code));
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnose['code']> => {
  if(!diagnosisCodes || !isDiagnosisCodes(diagnosisCodes)){
    throw new Error('Incorrect diagnosis codes:' + diagnosisCodes);
  }
  return diagnosisCodes;
};

const isHealthCheckRating = (rating: unknown): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(rating as number);

};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if(healthCheckRating === undefined  || !isHealthCheckRating(healthCheckRating)){
    throw new Error('Incorrect or missing health check rating:' + healthCheckRating);
  }
  return healthCheckRating;
};

const parseEmployerName = (employerName: unknown): string => {
  if(!employerName || !isString(employerName)){
    throw new Error('Incorrect or missing employer name:'+ employerName);
  }
  return employerName;
};

const isSickLeave = (sickLeave: unknown) : sickLeave is SickLeave => {
  return 'startDate' in (sickLeave as SickLeave) && 'endDate' in (sickLeave as SickLeave);
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if(!sickLeave || !isSickLeave(sickLeave)){
    throw new Error('Incorrect or missing sick leave:'+ sickLeave);
  }
  return sickLeave;
};

const isDischarge = (discharge: unknown): discharge is Discharge => {
  return 'date' in (discharge as Discharge) && 'criteria' in (discharge as Discharge);
};

const parseDischarge = (discharge: unknown) : Discharge => {
  if(!discharge || !isDischarge(discharge)){
    throw new Error('Incorrect or missing discharge:'+ discharge);
  }
  return discharge;
};

const toNewPatient = ({name, dateOfBirth, ssn, gender, occupation}: PatientFields): NewPatient => {
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

const createBaseEntry = ({description, date, specialist}: BaseEntryFields): BaseEntryWithoutId => {
  const newBaseEntry : BaseEntryWithoutId = {
    description: parseDescription(description),
    date: parseDate(date),
    specialist: parseSpecialist(specialist)
  };
  return newBaseEntry;
};

const toNewEntry = ({
  type,
  description,
  date,
  specialist,
  diagnosisCodes,
  healthCheckRating,
  employerName,
  sickLeave,
  discharge
}: EntryFields): EntryWithoutId => {
  const baseEntry: BaseEntryWithoutId = createBaseEntry({description,date,specialist});

  if(diagnosisCodes){
    baseEntry.diagnosisCodes = parseDiagnosisCodes(diagnosisCodes);
  }

  const entryType = parseType(type);
  let entry: EntryWithoutId;
  switch (entryType) {
    case 'HealthCheck':
      entry = {
        ...baseEntry,
        type: entryType, 
        healthCheckRating: parseHealthCheckRating(healthCheckRating)
      };
      return entry;
    case 'OccupationalHealthcare':
      entry = {
        ...baseEntry,
        type: entryType,
        employerName: parseEmployerName(employerName),
      };
      if(sickLeave){
        entry.sickLeave = parseSickLeave(sickLeave);
      }
      return entry;
    case 'Hospital':
      entry = {
        ...baseEntry,
        type: entryType,
      };
      if(discharge){
        entry.discharge = parseDischarge(discharge);
      }
      return entry;
    default:
      return assertNever(entryType as never);
  }
};

export {
  toNewPatient,
  toNewEntry
};