export type Diagnose = {
  code: string;
  name: string;
  latin?:string;
};

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type SickLeave = {
  startDate: string;
  endDate: string;
};

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave; 
}

export type Discharge ={
  date: string;
  criteria: string;
};
interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge?: Discharge;
}

export type Entry = 
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type Patient = {
  name: string;
  ssn: string;
  occupation: string;
  dateOfBirth: string;
  gender: Gender;
  entries: Entry[]
  id: string;
};

export type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export type BaseEntryFields = {
  description: unknown;
  date: unknown;
  specialist: unknown;
};


export type EntryFields = {
  type: unknown;
  description: unknown;
  date: unknown;
  specialist: unknown;
  diagnosisCodes?: unknown;
  healthCheckRating?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  discharge?: unknown;
};


export type  NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type PublicPatient = Omit<Patient, 'ssn' | 'entries'>;

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>;
export type BaseEntryWithoutId = Omit<BaseEntry, 'id'>;
