import React, { useContext, useEffect, useState } from 'react'
import style from './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Vortex } from 'react-loader-spinner'

import Slider from "react-slick";
import { Helmet } from 'react-helmet'
import { CartContext } from '../../Context/CartContext.js'
import toast from 'react-hot-toast'

export default function ProductDetails() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };

    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(true)

  let {id} = useParams()

  async function getProductsDetails(id){
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data.data)
    setLoading(false)

  }

  useEffect(()=>{
  getProductsDetails(id)
  },[])

  let {addToCart } = useContext(CartContext)
  async function postToCart(id){
    let {data} = await addToCart(id)
    if(data.status == 'success'){
      toast.success(data.message)
    }
    
  }
  

  return <>
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
    </div> :
    <>
          <Helmet>
      <meta charSet="utf-8" />
      <title>{details.title}</title>
      </Helmet>
      <div className="row align-items-center py-5">
        <div className="col-md-4">
          <Slider {...settings}>
            {details.images.map(( image , index)=> <img src={image} className='w-75' key={index} alt={details.title}/>)}
    </Slider>
        </div>
        <div className="col-md-8">
          <div className="details">
            <h3 className='h5'>{details.title}</h3>
            <p className='py-3'>{details.description}</p>
            <span className='font-sm text-main'>{details.category.name}</span>
            <div className="d-flex justify-content-between align-items-center py-3">
              <span className='font-sm'>{details.price} EGP</span>
              <span className='font-sm'>
                <i className='fas fa-star rating-color me-1'></i>
                {details.ratingsAverage}</span>
            </div>
            <button onClick={()=> postToCart(details.id)} className='btn bg-main text-main-light w-100 btn-sm'> Add To Cart</button>

          </div>
        </div>
      </div>
    </>}</>}