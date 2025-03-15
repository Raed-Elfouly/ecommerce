import React, { useContext, useEffect, useState } from 'react'
import style from './FeaturedProducts.module.css'
import axios from 'axios'
import { Vortex } from 'react-loader-spinner'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { CartContext } from '../../Context/CartContext.js'
import toast from 'react-hot-toast'
import { CounterContext } from '../../Context/CounterContext.js'


export default function FeaturedProducts() {
  // const [products, setProducts] = useState([])
  // const [loading, setLoading] = useState(true)

  // async function getProducts(){
  //   let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  //   setProducts(data.data)
  //   setLoading(false)
    
  // }

  // useEffect(()=>{
  //   getProducts()
  //   }, [])
  function getProducts(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
  }
  let {data , isLoading , isError , isFetching} = useQuery('featuredproducts' , getProducts , {
    // cacheTime
  })

  let {addToCart } = useContext(CartContext)
  async function postToCart(id){
    let {data} = await addToCart(id)
    if(data.status == 'success'){
      toast.success(data.message)
    }
    
  }
  
  return <>
  <h2 className='text-main fw-bold py-3'>Featured Products</h2>
  {isLoading? 
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
     <div className='row gy-4'>
    {data?.data.data.map(product =>    

      <div key={product.id} className="col-lg-2 col-6">

        <div className="product p-2">
        <Link to={`/productdetails/${product.id}`}>
            <img src={product.imageCover} className='w-100' alt={product.title} />
            <span className='font-sm text-main'>{product.category.name}</span>
            <h3 className='h5'>{product.title.split(' ').splice(0,2).join(' ')}</h3>
            <div className="d-flex justify-content-between align-items-center py-3">
              <span className='font-sm'>{product.price} EGP</span>
              <span className='font-sm'>
                <i className='fas fa-star rating-color me-1'></i>
                {product.ratingsAverage}</span>
            </div>
            </Link>
            <button onClick={()=> postToCart(product.id)} className='btn bg-main text-main-light w-100 btn-sm'> Add To Cart</button>
          </div>

    </div>

  )}
    </div>
  }
    </>
}
