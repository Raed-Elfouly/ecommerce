import React, { useEffect } from 'react'
import style from './Brands.module.css'
import { Helmet } from 'react-helmet'
import { getBrands } from '../../Redux/BrandsSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { Vortex } from 'react-loader-spinner'

export default function Brands() {
  let{brands  , isLoading} = useSelector(({brand})=>brand)
  let dispatch =  useDispatch()
  useEffect(()=>{
    dispatch(getBrands())
  } ,[])
  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Brands</title>
  </Helmet>
  <h2 className='fw-bold text-main mt-3'>Brands</h2>
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
      </div>
    : <div className='row gy-3 py-5'>
      {brands.map((brand,index)=>      
      <div key={index} className="col-md-3 col-6">
        <div className="products p-2">
          <img src={brand.image} className='w-100' alt={brand.name} />
          <p>{brand.name}</p>
        </div>
      </div>)}
      </div>}
  </>
}
