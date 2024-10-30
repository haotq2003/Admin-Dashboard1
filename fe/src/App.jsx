import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import {BrowserRouter,Route, Routes} from 'react-router-dom'
import Layout from './components/auth/Layout'
import Login from './page/auth/Login'
import Register from './page/auth/Register'
import AdminLayout from './components/admin-view/layout'
import AdminDashBoard from './page/admin-view/DashBoard'
import AdminProduct from './page/admin-view/Product'
import AdminDashOrder from './page/admin-view/Order'
import AdminDashFeature from './page/admin-view/Features'
import ShoppingLayout from './components/shopping-view/layout'
import NotFound from './page/not-found/NotFound'
import ShoppingHome from './page/shopping-view/Home'
import ShoppingAccount from './page/shopping-view/Account'
import ShoppingCheckOut from './page/shopping-view/CheckOut'
import ShoppingListing from './page/shopping-view/list'

function App() {
 

  return (
    
      <div className='flex flex-col overflow-hidden bg-white'>
         
         <Routes>
          <Route path='/auth' element={<Layout />}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          </Route>
          <Route path='/admin' element={<AdminLayout/>}>
            
            <Route path='dashboard' element={<AdminDashBoard />} />
            <Route path='product' element={<AdminProduct />} />
            <Route path='order' element={<AdminDashOrder />} />
            <Route path='feature' element={<AdminDashFeature />} />
          </Route>
          <Route path='/shop' element={<ShoppingLayout />}>
          <Route path='home' element={<ShoppingHome />} />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='checkout' element={<ShoppingCheckOut />} />
          <Route path='listing' element={<ShoppingListing />} />
          </Route>
          <Route path='*' element={<NotFound />}/>
         </Routes>
      </div>
     
    
  )
}

export default App
