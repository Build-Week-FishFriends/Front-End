import React, { useState, useEffect } from 'react';
import { Form, Field, withFormik } from 'formik';
import * as Yup from 'yup';

import WithAuth from '../auth/WithAuth';

const LogForm = ({ errors, touched, values, status, history }) => {
  const [newLog, setNewLog] = useState([]);
  useEffect(() => {
    if (status) {
      setNewLog([...newLog, status]);
      history.goBack();
    }
  }, [status]);

  return (
    <div className='LogForm'>
      <h1>User Log</h1>
      <Form className='Formlog'>
        <Field className='fields' value={values.baitType} type='text' name='baitType' placeholder='bait used' />
        {touched.baitType && errors.baitType && <p className='error'>{errors.baitType}</p>}
        <label>
          Fish Name
          <Field className='fields' value={values.fishId} type='text' name='fishId' placeholder='fish' />
          {touched.fishId && errors.fishId && <p className='error'>{errors.fishId}</p>}
        </label>
        <label>
          {' '}
          Fish Count
          <Field className='fields' value={values.fishCount} type='number' name='fishCount' placeholder='00' />
          {touched.fishCount && errors.fishCount && <p className='error'>{errors.fishCount}</p>}
        </label>
        <label>
          Time Spent
          <Field className='fields' value={values.timeSpent} type='number' name='timeSpent' placeholder='hr' />
        </label>
        <label>
          Time of Day
          <Field className='fields' value={values.timeOfDay} type='time' name='timeOfDay' placeholder='00' />
        </label>

        <button className='logbutton' type='submit'>
          Submit!
        </button>
      </Form>
    </div>
  );
};

const FormikLogForm = withFormik({
  mapPropsToValues({ baitType, fishId, fishCount, timeSpent, timeOfDay }) {
    return {
      baitType: baitType || '',
      fishId: fishId || '',
      fishCount: fishCount || '',
      timeSpent: timeSpent || '',
      timeOfDay: timeOfDay || '',
    };
  },

  validationSchema: Yup.object().shape({
    baitType: Yup.string().required('bait used here'),
    fishId: Yup.string().required('what kind fish u caught '),
  }),
  handleSubmit(values, { setStatus, props }) {
    const { id } = props.match.params;
    values.waterBodyId = id;
    WithAuth()
      .post('/logRoute', values)
      .then(res => {
        console.log(res);
        setStatus(res.data);
      })
      .catch(err => console.log(err.response));
  },
})(LogForm);

export default FormikLogForm;
