import React, { useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axiosWithAuth from './WithAuth';

const BasicLoginForm = ({ values, errors, touched, status, history, handleUserObject }) => {
  useEffect(() => {
    status && handleUserObject(status.userObject);
    status && history.push('/');
  });
  return (
    <div className='background'>
      <div className='FormContainer'>
        <Form className='Form'>
          <Field value={values.username} className='Fields' type='text' name='username' placeholder='Username/Email' />
          {touched.username && errors.username && <p>{errors.username}</p>}
          <Field value={values.pass} className='Fields' type='text' name='pass' placeholder='Password' />
          {touched.pass && errors.pass && <p>{errors.pass}</p>}
          <div className='buttoncontainer'>
            <button type='submit' value='Submit'>
              Login
            </button>
            <p>Or</p>
            <button>Sign Up</button>
          </div>
        </Form>
      </div>
    </div>
  );
};

const LoginForm = withFormik({
  mapPropsToValues({ username, pass }) {
    return {
      username: username || '',
      pass: pass || '',
    };
  },
  validationSchema: Yup.object().shape({
    username: Yup.string().required('Name is required'),
    pass: Yup.string().required('Password is required'),
  }),
  handleSubmit(values, { setStatus }) {
    const { username, pass } = values;
    const postValues = { username, password: pass };
    console.log(postValues);
    axiosWithAuth()
      .post('/auth/login', postValues)
      .then(response => {
        console.log(response);
        setStatus(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userObject));
      })
      .catch(error => console.log('Error'));
  },
})(BasicLoginForm);
export default LoginForm;
