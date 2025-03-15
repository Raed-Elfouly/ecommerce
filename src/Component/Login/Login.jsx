import React,{useContext, useState} from 'react'
import style from './Login.module.css'

import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {Vortex} from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext.js'
import { Helmet } from 'react-helmet'

export default function Login() {
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  let navigate = useNavigate()
  let {setUserToken} = useContext(UserContext)

  async function loginSubmit(values){
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values)
    .catch((err)=>{setApiError(err.response.data.message);
      setLoading(false)
    })
    if(data.message == 'success'){
      setLoading(false)
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/')
    }
    
    
  }
  let validationSchema = Yup.object({
    email : Yup.string().required('Email is required').email('invalid email'),
    password : Yup.string().required('Password is required').matches(/^[A-Z][\w @ ]{5,8}$/ , 'invalid password ex(Ahmed123)'),
  })



  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },validationSchema
    ,onSubmit:loginSubmit
  })
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Login</title>
  </Helmet>
  <div className="w-75 vh-100  mt-5 mx-auto py-4">
    <h2>Register Now</h2>
    <form onSubmit={formik.handleSubmit}>
      {apiError?<div className="alert alert-danger">{apiError}</div>:''}

      <label htmlFor="email">Email : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange }  type="email"  name='email' className='form-control mb-3' id='email' />
      {formik.errors.email && formik.touched.email? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}


      <label htmlFor="password">Password : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange }  type="password"  name='password' className='form-control mb-3' id='password' />
      {formik.errors.password && formik.touched.password? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}


      {loading? <button type='button' className=' btn bg-main text-light '>
          <Vortex
              visible={true}
              height="50"
              width="50"
              ariaLabel="vortex-loading"
              wrapperStyle={{}}
              wrapperClass="vortex-wrapper"
              colors={['white', 'white', 'white', 'white', 'white', 'white']}
          />
      </button> : <button disabled = {!(formik.isValid && formik.dirty)} type='submit' className=' btn bg-main text-light'> Login</button>}
      <Link className='ps-3' to={'/register'}>Register Now</Link>
    </form>
  </div>
  </>
}
