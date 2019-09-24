import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axiosWithAuth from './WithAuth';

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
                <Field value={values.username} className='Fields' type='text' name='username' placeholder='Username/Email'/>
                {touched.username && errors.username && (
                <p>{errors.username}</p>
                )}
                <Field value={values.pass} className='Fields' type='text' name='pass' placeholder='Password'/>
                {touched.pass && errors.pass && (
                <p>{errors.pass}</p>
                )}
                <div>
                    <button type="submit" value="Submit">
                        Login
                    </button>
                    <p>Or</p>
                    <button>
                        Sign Up
                    </button>
                </div>
            </Form>
        </div>
    )
}

const LoginForm= withFormik({
    mapPropsToValues({ username, pass}) {
        return {
          username: username || '',
          pass: pass || ''
        };
      },
    validationSchema: Yup.object().shape({
    username: Yup.string()
    .required('Name is required'),
    pass: Yup.string()
    .required('Password is required')
    }),
    handleSubmit(values, { setStatus }) {
        const {username,pass}= values
        const postValues= {username, password:pass}
        console.log(postValues)
        axios
          .post('https://fish-friends.herokuapp.com/auth/login', postValues)
          .then(response => {
            console.log(response)
            setStatus(response.data)
            localStorage.setItem('token', response.data.token)
          })
          .catch(error => console.log('Error'));
      }
})(BasicLoginForm)
export default LoginForm