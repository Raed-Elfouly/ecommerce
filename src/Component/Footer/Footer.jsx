import React from 'react'
import style from './Footer.module.css'
import img1 from '../../Assets/images/jcb.png'
import img2 from '../../Assets/images/visa-2.png'
import img3 from '../../Assets/images/mastercard-2.png'
import img4 from '../../Assets/images/discover.png'

export default function Footer() {
  return <>
  <div className='bg-secondary-subtle py-5'>
    <div className="container  p-0">
      <div className="row">
        <div className="col-md-6">
          <div >
            <h2>Get The FreshCart app</h2>
            <p>We will sent you a link, open it on your Phone to dawnloud the app</p>
          </div>
        </div>
      </div>
      <div className="row mx-auto">
        <div className="col-md-8">
        <input type="text" className='form-control' />
        </div>
      <div className="col-md-4">
      <button className='btn bg-main text-light'>Share App Link</button>
      </div>
      </div>
  <div className="row">
  <div className='text-center mt-3'>
        <p className='fw-bold h4'>Payment Partener 

        <img src={img2} className='mx-1' width={'40px'} alt="" />
        <img src={img3} className='mx-1' width={'40px'} alt="" />
        <img src={img4} className='mx-1' width={'40px'} alt="" />
        <img src={img1} className='mx-1' width={'40px'} alt="" />
        </p>
      </div>
      <div className='text-center mt-3'>
        <p className='m-0 row-cols-5'>© 2024 Raed Elfouly. All rights reserved.</p>
      </div>
  </div>
    </div>
  </div>

  </>
}
