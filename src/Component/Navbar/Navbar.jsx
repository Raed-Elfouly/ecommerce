import React, { useContext, useEffect, useState } from 'react'
import style from './Navbar.module.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../../Assets/images/freshcart-logo.svg'
import { CounterContext } from '../../Context/CounterContext.js'
import { UserContext } from '../../Context/UserContext.js'
import { CartContext } from '../../Context/CartContext.js'
import {  useLocation } from "react-router-dom";
import Cart from '../Cart/Cart.jsx'
// import { Collapse } from 'bootstrap'



export default function Navbar() {
  let {count} = useContext(CounterContext)
  let {getCartItems} = useContext(CartContext) 
  const [cart, setCart] = useState([])
  
  let {userToken ,setUserToken} = useContext(UserContext)
  let location = useLocation(); 
  let navigate = useNavigate()
  function logOut(){
    localStorage.removeItem('userToken')
    setUserToken(null)
    navigate('/login')

  }
  async function getItem() {
    let{data} = await getCartItems()
    setCart(data)
    
    
  }


    useEffect(()=>{
      getItem()
    },[])

  return <>
  <nav  className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
  <div className="container-fluid">
    <Link className="navbar-brand" to={'/'}>
    <img src={logo} alt="fresh cart" />
    </Link>
    <button  className='navbar-toggler ' type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
      <span ><i className='navbar-toggler-icon'></i></span>
    </button>
    <div id="navbarSupportedContent" className='navbar-collapse collapse' >
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        {userToken != null?<>
          <li className="nav-item">
          <Link className={` nav-link ${location.pathname === "/home" ? "active" : ""}`} to={'home'}>Home</Link>
        </li>
        <li className="nav-item">
        <Link className={` nav-link ${location.pathname === "/cart" ? "active" : ""}`} to={'cart'}>Cart {cart.numOfCartItems}</Link>
        </li>
        <li className="nav-item">
          <Link className={` nav-link ${location.pathname === "/products" ? "active" : ""}`} to={'products'}>Products</Link>
        </li>
        <li className="nav-item">
          <Link className={` nav-link ${location.pathname === "/categories" ? "active" : ""}`} to={'categories'}>Categories</Link>
        </li>
        <li className="nav-item">
          <Link className={` nav-link ${location.pathname === "/brands" ? "active" : ""}`} to={'brands'}>Brands</Link>
        </li>
        </> :''}

      </ul>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item d-flex align-items-center">
          <i className='fab fa-facebook me-2'></i>
          <i className='fab fa-twitter me-2'></i>
          <i className='fab fa-instagram me-2'></i>
          <i className='fab fa-youtube me-2'></i>
        </li>
        {userToken != null?<>
          <li className="nav-item">
          <span onClick={logOut} className="nav-link cursor-pointer">LogOut</span>
        </li>
        </> : <>
        <li className="nav-item">
          <Link className="nav-link" to={'register'}>Register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={'login'}>Login</Link>
        </li>
        </>}


      </ul>
    </div>
  </div>
</nav>
  </>
}
