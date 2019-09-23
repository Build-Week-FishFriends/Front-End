import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const BasicSignupForm= ({ values, errors, touched, status })=>{
    const [peopleInfo, setInfo]= useState([])
    useEffect(() => {
        if (status) {
          setInfo([...peopleInfo, status]);
        }
      }, [status]);
    return(
        <div>
            <Form className='Form'>
                <TextField className='Fields' type='text' name='firstname' placeholder='First Name'/>
                {touched.name && errors.name && (
                <p>{errors.name}</p>
                )}
                <TextField className='Fields' type='text' name='lastname' placeholder='Last Name'/>
                {touched.name && errors.name && (
                <p>{errors.name}</p>
                )}
                <TextField className='Fields' type='text' name='username' placeholder='Username'/>
                {touched.name && errors.name && (
                <p>{errors.name}</p>
                )}
                <TextField className='Fields' type='text' name='email' placeholder='Email'/>
                {touched.name && errors.name && (
                <p>{errors.name}</p>
                )}
                <TextField className='Fields' type='text' name='pass' placeholder='Password'/>
                {touched.pass && errors.pass && (
                <p>{errors.pass}</p>
                )}<TextField className='Fields' type='text' name='passconf' placeholder='Confirm Password'/>
                {touched.name && errors.name && (
                <p>{errors.name}</p>
                )}
                <div>
                    <Button variant="contained" color="primary">
                        Sign Up
                    </Button>
                </div>
            </Form>
            {peopleInfo.map(person => (
              <div className='List'>
                <ul key={person.id}>
                  <li>Name: {person.name}</li>
                  <li>Password: {person.pass}</li>
                </ul>
              </div>
              ))}
        </div>
    )
}

const SignupForm= withFormik({
    mapPropsToValues({ firstname, lastname, username, email, pass, confpass}) {
        return {
          firstname: firstname || '',
          lastname: lastname || '',
          username: username || '',
          email: email || '',
          pass: pass || '',
          confpass: confpass || ''
        };
      },
    validationSchema: Yup.object().shape({
    firstname: Yup.string()
    .required('First name is required'),
    lastname: Yup.string()
    .required('Last name is required'),
    username: Yup.string()
    .required('Username is required'),
    email: Yup.string()
    .required('Email is required'),
    pass: Yup.string()
    .min(5, 'Password must be more than 5 characters')
    .max(15, 'Password cannot exceed 15 characters')
    .required('A password is required'),
    passconf: Yup.string()
    .required('Please validate your password')
    .test('',  'Passwords do not match', function(value){
        return this.parent.pass === value
    })
    }),
    handleSubmit(values, { setStatus }) {
        axios
          .post('', values)
          .then(response => {
            console.log(response.data)
            setStatus(response.data);
          })
          .catch(error => console.log('Error'));
      }
})(BasicSignupForm)
export default SignupForm