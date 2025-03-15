import React, { Suspense, useContext, useEffect } from 'react'
import Cart from './Component/Cart/Cart.jsx'
import Layout from './Component/Layout/Layout.jsx'
// import Categories from './Component/Categories/Categories.jsx'
// import Brands from './Component/Brands/Brands.jsx'
import Products from './Component/Products/Products.jsx'
import Register from './Component/Register/Register.jsx'
import Login from './Component/Login/Login.jsx'
import Home from './Component/Home/Home.jsx'
import NotFound from './Component/NotFound/NotFound.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CounterContextProvider, { CounterContext } from './Context/CounterContext.js'
import { UserContext } from './Context/UserContext.js'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute.jsx'
import ProductDetails from './Component/ProductDetails/ProductDetails.jsx'
import { Toaster } from 'react-hot-toast'
import {Provider} from 'react-redux'
import { store } from './Redux/Store.js'
import ShippingAddress from './Component/ShippingAddress/ShippingAddress.jsx'
import AllOrders from './Component/AllOrders/AllOrders.jsx'
import FeaturedProducts from './Component/Products/Products.jsx'

const Categories = React.lazy(() => import('./Component/Categories/Categories.jsx'));
const Brands = React.lazy(() => import('./Component/Brands/Brands.jsx'));

export default function App() {

  let routers = createBrowserRouter([
    {path :'',element : <Layout></Layout> , children : [
      {index : true , element : <ProtectedRoute><Home></Home></ProtectedRoute>},
      {path : 'home' , element : <ProtectedRoute><Home></Home></ProtectedRoute>},
      {path : 'cart' , element : <ProtectedRoute><Cart></Cart></ProtectedRoute>},
      {path : 'products' , element : <ProtectedRoute><Products></Products></ProtectedRoute>},
      {path : 'productdetails/:id' , element : <ProtectedRoute><ProductDetails></ProductDetails></ProtectedRoute>},
      {path : 'categories' , element : <Suspense fallback={<div>Loading...</div>}><ProtectedRoute><Categories></Categories></ProtectedRoute></Suspense>},
      {path : 'allorders' , element : <ProtectedRoute><AllOrders></AllOrders></ProtectedRoute>},
      {path : 'shippingaddress/:cartId' , element : <ProtectedRoute><ShippingAddress></ShippingAddress></ProtectedRoute>},
      {path : 'brands' , element : <Suspense fallback={<div>Loading...</div>}><ProtectedRoute> <Brands></Brands></ProtectedRoute></Suspense>},
      {path : 'register' , element : <Register></Register>},
      {path : 'login' , element : <Login></Login>},
      {path : '*' , element : <NotFound></NotFound>},
    ]}
  ])
  let {setUserToken} = useContext(UserContext);
  useEffect(()=>{
    
  if(localStorage.getItem('userToken')){
    setUserToken(localStorage.getItem('userToken'))
  }
  } , [])

  return <>
  <CounterContextProvider>
  <Provider store={store}>
  <RouterProvider router={routers}></RouterProvider>
  <Toaster></Toaster>
  </Provider>
  </CounterContextProvider>
  </>
}
