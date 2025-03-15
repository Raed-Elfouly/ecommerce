
import React, { useEffect } from 'react'
import style from './Categories.module.css'
import { Helmet } from 'react-helmet'
import { getCategories } from '../../Redux/CategoriesSlice.js'
import { useDispatch, useSelector } from 'react-redux'
import { Vortex } from 'react-loader-spinner'

export default function Categories() {
  let{categories  , isLoading} = useSelector(({categories})=>categories)
  let dispatch =  useDispatch()
  useEffect(()=>{
    dispatch(getCategories())
  } ,[])
  return <>
  <h2 className='fw-bold text-main mt-2'>Categories</h2>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Categories</title>
  </Helmet>
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
      {categories.map((categories,index)=>      
      <div key={index} className="col-md-3 col-6">
        <div className="products p-2">
          <img src={categories.image} height={300} className='w-100' alt={categories.name} />
          <p>{categories.name}</p>
        </div>
      </div>)}
      </div>}
  </>
}

