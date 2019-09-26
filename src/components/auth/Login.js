import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field, setIn } from 'formik';
import * as Yup from 'yup';
import axiosWithAuth from './WithAuth';
import { Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const BasicLoginForm = ({ values, errors, touched, status, history, handleUserObject }) => {
  const [inputType, setInputType] = useState('password');
  useEffect(() => {
    status && handleUserObject(status.userObject);
    status && history.push('/map');
  });
  function hidePass() {
    if (inputType === 'password') {
      setInputType('text');
    } else {
      setInputType('password');
    }
  }
  return (
    <div className='html'>
      <div className='background'>
        <div className='FormContainer'>
          <Form className='Form'>
            <Field
              value={values.username}
              className='Fields'
              type='text'
              name='username'
              placeholder='Username/Email'
            />
            {touched.username && errors.username && <p>{errors.username}</p>}
            <Field value={values.pass} className='Fields' type={inputType} name='pass' placeholder='Password' />
            {touched.pass && errors.pass && <p>{errors.pass}</p>}
            <Label>
              <Field type='checkbox' name='showPass' onClick={() => hidePass()} />
              Show Password
            </Label>
            <div className='buttoncontainer'>
              <button type='submit' value='Submit'>
                Login
              </button>
              <p>Or</p>
              <Link to='/signup' className='link-button'>
                Sign Up
              </Link>
            </div>
          </Form>
        </div>
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
