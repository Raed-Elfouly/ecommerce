import React from 'react'
import style from './MainSlider.module.css'
import slider1 from '../../Assets/images/slider-image-1.jpeg'
import slider2 from '../../Assets/images/slider-image-2.jpeg'
import slider3 from '../../Assets/images/slider-image-3.jpeg'
import img1 from '../../Assets/images/grocery-banner-2.jpeg'
import img2 from '../../Assets/images/grocery-banner.png'
import Slider from 'react-slick'

export default function MainSlider() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false
  };
  return <>
  <div className="row my-3 gx-0">
    <div className="col-md-9 col-sm-9 col-9">
      <Slider {...settings}>
        <img src={slider1} height={400} className='w-100' alt="" />
        <img src={slider2} height={400} className='w-100' alt="" />
        <img src={slider3} height={400} className='w-100' alt="" />
      </Slider>
    </div>
    <div className="col-md-3 col-col-sm-3 col-3">
      <div className="images">
        <img src={img1} className='w-100' height={200} alt="" />
        <img src={img2} className='w-100' height={200} alt="" />
      </div>
    </div>
  </div>
  </>
}
