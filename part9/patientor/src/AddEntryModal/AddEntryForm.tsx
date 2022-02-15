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
  const [type,setType] =  React.useState<string>('Health Check');
  

  const baseValues = {
    description: '',
    date:'',
    specialist: '',
    diagnosisCodes: [''],
  };

  const HealthCheckInitialValues: EntryFormValues = {
    ...baseValues,
    type: 'HealthCheck',
    healthCheckRating: 0
  };

  let initialValues = HealthCheckInitialValues;

  React.useEffect(()=>{
    if(type === 'Health Check' ){
      initialValues = HealthCheckInitialValues;
    }
  }, [type]);
  
  
  return(
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={values => {
        const errors: {[field:string]: string} = {};
        if(!values.description){
          errors.description = 'Description is required';
        }
        if(!values.date){
          errors.date = 'Date is required';
        }
        if(!values.specialist){
          errors.specialist = 'Specialist name required';
        }
        if(type === 'Health Check'){
          if(values.healthCheckRating > 3 || values.healthCheckRating < 0){
            errors.healthCheckRating = 'Value must between 0 and 3';
          }
        }
        return errors;
      }}
    >
    {({isValid, dirty, setFieldValue, setFieldTouched}) => {
      return(
        <Form className='form ui'>
          <Grid centered>
            <Grid.Column >
              <Button.Group>
                <Button
                  type="button"
                  onClick={() => {
                    setFieldValue('type','HealthCheck');
                    setType('Health Check');
                  }}
                  color={type === 'Health Check' ? 'green': 'grey'}
                  icon
                  labelPosition='right'
                >
                  Health Check
                  <Icon name='doctor'/>
                </Button>
              </Button.Group>
            </Grid.Column>
          </Grid>
          <Header  textAlign='center'>{type} Entry</Header>
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