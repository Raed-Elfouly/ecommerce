import React, { useState } from 'react'
import style from './Register.module.css'
import {useFormik} from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import {Vortex} from 'react-loader-spinner'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Register() {  
  const [loading, setLoading] = useState(false)
  const [apiError, setApiError] = useState(null)
  let navigate = useNavigate()

  async function registerSubmit(values){
    setLoading(true)
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values)
    .catch((err)=>{setApiError(err.response.data.message);
      setLoading(false)
    })
    if(data.message == 'success'){
      setLoading(false)
      navigate('/login')
    }
    
    
  }
  let validationSchema = Yup.object({
    name : Yup.string().required('Name is required').min(3 , 'min length is 3').max(10 ,'max length is 10'),
    email : Yup.string().required('Email is required').email('invalid email'),
    password : Yup.string().required('Password is required').matches(/^[A-Z][\w @ ]{5,8}$/ , 'invalid password ex(Ahmed123)'),
    rePassword : Yup.string().required('rePassword is required').oneOf([Yup.ref('password')] , 'password and rePassword dont match'),
    phone : Yup.string().required('phone is reqquired').matches(/^01[0125][0-9]{8}$/, 'we need egyptian number')
  })



  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },validationSchema
    ,onSubmit:registerSubmit
  })
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Register</title>
  </Helmet>
  <div className="w-75 mt-5 mx-auto py-4">
    <h2>Register Now</h2>
    <form onSubmit={formik.handleSubmit}>
      {apiError?<div className="alert alert-danger">{apiError}</div>:''}
      <label htmlFor="name">Name : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange } type="text"  name='name' className='form-control mb-3' id='name' />
      {formik.errors.name && formik.touched.name? <div className='alert alert-danger py-2'>{formik.errors.name}</div> : null}

      <label htmlFor="email">Email : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange }  type="email"  name='email' className='form-control mb-3' id='email' />
      {formik.errors.email && formik.touched.email? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}


      <label htmlFor="password">Password : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange }  type="password"  name='password' className='form-control mb-3' id='password' />
      {formik.errors.password && formik.touched.password? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}


      <label htmlFor="rePassword">RePassword : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange }  type="password"  name='rePassword' className='form-control mb-3' id='rePassword' />
      {formik.errors.rePassword && formik.touched.rePassword? <div className='alert alert-danger py-2'>{formik.errors.rePassword}</div> : null}


      <label htmlFor="phone">Phone : </label>
      <input onBlur={formik.handleBlur} onChange={formik.handleChange }  type="tel"  name='phone' className='form-control mb-3' id='phone' />
      {formik.errors.phone && formik.touched.phone? <div className='alert alert-danger py-2'>{formik.errors.phone}</div> : null}

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
      </button> : <button disabled = {!(formik.isValid && formik.dirty)} type='submit' className=' btn bg-main text-light'>Register</button>}
      <Link className='ps-3' to={'/login'}>Login Now</Link>
    </form>
  </div>
  </>
}
