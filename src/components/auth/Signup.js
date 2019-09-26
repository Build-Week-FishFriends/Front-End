import React, { useEffect, useState } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axiosWithAuth from './WithAuth';
import './Signup.css';
import { Label } from 'semantic-ui-react';

const BasicSignupForm = ({ values, errors, touched, status, history, handleUserObject }) => {
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
            <Field value={values.firstName} className='Fields' type='text' name='firstName' placeholder='First Name' />
            {touched.firstname && errors.firstname && <p>{errors.firstname}</p>}
            <Field value={values.lastName} className='Fields' type='text' name='lastName' placeholder='Last Name' />
            {touched.lastname && errors.lastname && <p>{errors.lastname}</p>}
            <Field value={values.username} className='Fields' type='text' name='username' placeholder='Username' />
            {touched.username && errors.username && <p>{errors.username}</p>}
            <Field value={values.email} className='Fields' type='text' name='email' placeholder='Email' />
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field value={values.pass} className='Fields' type={inputType} name='pass' placeholder='Password' />
            {touched.pass && errors.pass && <p>{errors.pass}</p>}
            <Field
              value={values.passconf}
              className='Fields'
              type={inputType}
              name='passconf'
              placeholder='Confirm Password'
            />
            {touched.passconf && errors.passconf && <p>{errors.passconf}</p>}
            <Label>
              <Field type='checkbox' name='showPass' onClick={() => hidePass()} />
              Show Password
            </Label>
            <div>
              <button type='submit' value='Submit'>
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

const SignupForm = withFormik({
  mapPropsToValues({ firstName, lastName, username, email, pass, passconf }) {
    return {
      firstName: firstName || '',
      lastName: lastName || '',
      username: username || '',
      email: email || '',
      pass: pass || '',
      passconf: passconf || '',
    };
  },
  validationSchema: Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().required('Email is required'),
    pass: Yup.string()
      .min(5, 'Password must be at least 5 characters')
      .max(15, 'Password cannot exceed 15 characters')
      .required('A password is required'),
    passconf: Yup.string()
      .required('Please validate your password')
      .test('', 'Passwords do not match', function(value) {
        return this.parent.pass === value;
      }),
  }),
  handleSubmit(values, { setStatus }) {
    const { firstName, lastName, username, email, pass } = values;
    const postValues = { firstName, lastName, username, email, password: pass };

    axiosWithAuth()
      .post('/auth/register', postValues)
      .then(response => {
        console.log(response.data);
        setStatus(response.data);
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.userObject));
      })
      .catch(error => console.log('Error'));
  },
})(BasicSignupForm);

// function Signup() {
//   const [credentials, setCredentials] = useState({username: '', password: ''})

//   const login = e => {
//       e.preventDefault();
//       axios
//           .post('https://soupkitchen-buildweek.herokuapp.com/api/register', credentials)
//           .then(res => {
//               console.log(res)
//               // localStorage.setItem('token', res.data.token)
//           })
//           .catch(err => {
//               console.log(err)
//           })
//   }

//   const handleChange = e => {
//       console.log(credentials)
//       setCredentials({...credentials, [e.target.name]: e.target.value})
//   }

//   return (

//           <Label>Username</Label>
//               <Input
//                   type='text'
//                   name='username'
//                   value={credentials.username}
//                   onChange={handleChange}
//               />
//               <Label>Password</Label>
//               <Input
//                   type='password'
//                   name='password'
//                   value={credentials.password}
//                   onChange={handleChange}
//               />
//               <Button>Submit!</Button>

export default SignupForm;
