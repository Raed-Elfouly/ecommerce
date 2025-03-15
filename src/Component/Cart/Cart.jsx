import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../../Context/CartContext.js'
import { Vortex } from 'react-loader-spinner'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import Footer from '../Footer/Footer.jsx'


export default function Cart() {
  let{UpdataCartItems,getCartItems , deleteCartItems} = useContext(CartContext)
  
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  async function getItem() {
    let{data} = await getCartItems()
    setCart(data)
    setLoading(false)

    
    
  }

  async function deleteItem(id) {
    setLoading(true)
    let{data} = await deleteCartItems(id)
    setCart(data)
    setLoading(false)
    
  }

  async function UpdataCart(id , count) {
    if(count < 1){
    setLoading(true)
    let{data} = await deleteCartItems(id)
    setCart(data)
    setLoading(false)
    }else{
    setLoading(true)

      let{data} = await UpdataCartItems(id , count)
    setCart(data)
    setLoading(false)
    }
    
  }

  useEffect(()=>{
    getItem()
  },[])
  if(cart.numOfCartItems===0){
    return <div className='bg-main-light p-2 my-4 vh-100 d-flex justify-content-center align-items-center'>
      <h3 className='text-center h1'>Your cart is empty...</h3>


    </div>
  }
  
  return <>
  
    <Helmet>
      <meta charSet="utf-8" />
      <title>Cart</title>
  </Helmet>
  <div className='bg-main-light mt-5 p-2 my-4 '>
  <h2>cart</h2>
  
  {loading? 
    <div className="row  justify-content-center align-items-center vh-100" >
            <Vortex
                visible={true}
                height="100"
                width="100"
                ariaLabel="vortex-loading"
                wrapperStyle={{}}
                wrapperClass="vortex-wrapper"
                colors={['green', 'green', 'green', 'green', 'green', 'green']}
            />
    </div>
    
  :cart?<div className=''>
    <p className='text-main'>numOfCartItems : {cart.numOfCartItems}</p>
    <p className='text-main'>total Cart Price : {cart.data.totalCartPrice} EGP</p>
    
      {cart.data.products.map((product) =>  <div key={product.product.id} className="row align-items-center border-1 p-2 border-bottom m-0">
      <div className="col-md-1 col-3">
        <div className="img">
          <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
        </div>
      </div>
      <div className="col-md-10 col-5">
        <div className="item">
          <h3 className='h5 fw-bold'>{product.product.title.split(' ').splice(0,3).join(' ')}</h3>
          <p className='text-main fw-bold'>price : {product.price} EGP</p>
          <button onClick={()=>deleteItem(product.product.id)} className='btn btn-outline-danger'><i className='fas fa-trash-can'></i> Remove</button>
        </div>
      </div>
      <div className="col-md-1 col-4">
        <div className="count">
          <button onClick={()=> UpdataCart(product.product.id , product.count+1)} className='btn text-secondary border-1 border-success pt-1 px-2 pb-1'>+</button>
          <span className='mx-2'>{product.count}</span>
          <button onClick={()=> UpdataCart(product.product.id , product.count-1)} className='btn text-secondary border-1 border-success pt-1 px-2 pb-1'>-</button>
        </div>
      </div>
    </div> )}
        <Link to={`/shippingaddress/${cart.data._id}`} className='btn bg-main text-light m-3'>online paymant</Link>      

    </div>:''}
  </div>
  
  </>
  
}
