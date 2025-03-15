import React, { useContext } from 'react'
import style from './ShippingAddress.module.css'
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext.js';

export default function ShippingAddress() {
  let {checkOutSession} = useContext(CartContext)
  let {cartId} = useParams()
  console.log(cartId);
  

  async function checkOut(values){
    let {data} = await checkOutSession(cartId , values)
    if(data.status == 'success'){
      window.location.href = data.session.url
    }
    

  }
   let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    } , onSubmit: checkOut
   })
  return <>
  <h2>ShippingAddress</h2>
  <div className="w-75 mx-auto ">
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="details">details</label>
      <input onChange={formik.handleChange} type="text" id='details' name='details' className='form-control mb-3'/>
      <label htmlFor="phone">phone</label>
      <input onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3'/>
      <label htmlFor="city">city</label>
      <input onChange={formik.handleChange} type="text" id='city' name='city' className='form-control mb-3'/>
      <button className='btn bg-main text-light' type='submit'>checkout</button>
      </form>
  </div>
  </>
}
