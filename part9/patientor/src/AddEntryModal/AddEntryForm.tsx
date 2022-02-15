import { Field, Form, Formik } from 'formik';
import React from 'react';
import { Button, Grid, Header, Icon } from 'semantic-ui-react';
import { DiagnosisSelection, NumberField, TextField } from '../AddPatientModal/FormField';
import { useStateValue } from '../state';
import { Entry } from '../types';


type UnionOmit<T,K extends string| number | symbol> = T extends unknown ? Omit<T,K>: never;
export type EntryFormValues = UnionOmit<Entry, 'id'>;

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}


export const AddEntryForm = ({onSubmit, onCancel}: Props) => {
  const [{diagnoses}] = useStateValue();
  return(
    <Formik
      initialValues={{
        type:'HealthCheck',
        description: '',
        date:'',
        specialist: '',
        diagnosisCodes: [''],
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
    >
    {({isValid, dirty, values, setFieldValue, setFieldTouched}) => {
      return(
        <Form className='form ui'>
          <Grid centered>
            <Grid.Column>
              <Button
                type="button"
                onClick={() => {setFieldValue('type','HealthCheck');}}
                color={values.type === 'HealthCheck' ? 'green': 'grey'}
                icon
                labelPosition='right'
              >
                Health Check
                <Icon name='doctor'/>
              </Button>
            </Grid.Column>
          </Grid>
          <Header  textAlign='center'>{values.type} Entry</Header>
          <Field
            label='Description'
            placeholder='Entry Description'
            name='description'
            component={TextField}
          />
          <Field
            label='Date'
            placeholder='YYYY-MM-DD'
            name='date'
            component={TextField}
          />
          <Field
            label='Specialist'
            placeholder='Entry Specialist'
            name='specialist'
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnoses)}
          />
          <Field
            label='Health Check Rating (0 = Healthy, 3 = Critical Risk)'
            min={0}
            max={3}
            name='healthCheckRating'
            component={NumberField}
          />
          <Grid>
            <Grid.Column floated='left' width={5}>
              <Button type="button" onClick={onCancel} color="red">
                Cancel
              </Button>
            </Grid.Column>
            <Grid.Column floated='right' width={5}>
              <Button
                type="submit"
                floated='right'
                color='green'
                disabled={!dirty || !isValid}
              >
                Add
              </Button>
            </Grid.Column>
          </Grid>
        </Form>
      );
    }}
    </Formik>
  );
};

export default AddEntryForm;