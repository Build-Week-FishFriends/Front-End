import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const BasicLoginForm= ({ values, errors, touched, status })=>{
    const [peopleInfo, setInfo]= useState([])
    useEffect(() => {
        if (status) {
          setInfo([...peopleInfo, status]);
        }
      }, [status]);
    return(
        <div>
            <Form className='Form'>
                <TextField className='Fields' type='text' name='name' placeholder='Username/Email'/>
                {touched.name && errors.name && (
                <p>{errors.name}</p>
                )}
                <TextField className='Fields' type='text' name='pass' placeholder='Password'/>
                {touched.pass && errors.pass && (
                <p>{errors.pass}</p>
                )}
            </Form>
            <div>
                <Button variant="contained" color="primary">
                    Login
                </Button>
                <p>Or</p>
                <Button variant="contained" color="primary">
                    Sign Up
                </Button>
            </div>
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

const LoginForm= withFormik({
    mapPropsToValues({ name, pass}) {
        return {
          name: name || '',
          pass: pass || ''
        };
      },
    validationSchema: Yup.object().shape({
    name: Yup.string()
    .required('Name is required'),
    pass: Yup.string()
    .required('Password is required')
    }),
    handleSubmit(values, { setStatus }) {
        axios
          .post('', values)
          .then(response => {
            setStatus(response.data);
          })
          .catch(error => console.log('Error'));
      }
})(BasicLoginForm)
export default LoginForm