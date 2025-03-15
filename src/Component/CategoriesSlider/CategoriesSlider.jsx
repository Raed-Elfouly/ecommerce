import React from 'react'
import style from './CategoriesSlider.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import Slider from 'react-slick';

export default function CategoriesSlider() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };

  function getCategoriea(){
  return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }
  let {data} = useQuery('categories' , getCategoriea)
  return <>

  <div className="row">
  <div className="col-12">
  <Slider {...settings}>
        {data?.data.data.map((category,index)=> <div key={index} className='col-md-4'>
          <div className="img">
            <img src={category.image} height={200} className='w-100' alt={category.name} />
            <p>{category.name}</p>
          </div>
        </div>)}
      </Slider>
  </div>
  </div>
  </>
}
