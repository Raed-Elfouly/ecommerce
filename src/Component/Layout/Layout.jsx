import React from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar.jsx'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer.jsx'
import { Offline } from "react-detect-offline";

export default function Layout() {
  return <>
  <Navbar></Navbar>
  <div className="container">
      <Outlet></Outlet>
      <Offline><h2 className='fw-bold loading'>Only shown offline (surprise!)</h2></Offline>
  </div>
  <Footer></Footer>
  </>
}
