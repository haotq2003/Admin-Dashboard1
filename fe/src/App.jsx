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
import CheckAuth from './components/common/CheckAuth'
import UnauthPage from './page/UnauthPage'
import { useSelector } from 'react-redux'

function App() {
 
   
    const {isAuthenticated,user} = useSelector(state => state.auth)
    
  return (
    
      <div className='flex flex-col overflow-hidden bg-white'>
         
         <Routes>
          <Route path='/auth' element={<CheckAuth isAuthen={isAuthenticated} user={user}>
            <Layout />
          </CheckAuth>}>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          </Route>
          <Route path='/admin' element={
            <CheckAuth isAuthen={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>}>
            
            <Route path='dashboard' element={<AdminDashBoard />} />
            <Route path='product' element={<AdminProduct />} />
            <Route path='order' element={<AdminDashOrder />} />
            <Route path='feature' element={<AdminDashFeature />} />
          </Route>
          <Route path='/shop' element={
            <CheckAuth isAuthen={isAuthenticated} user={user}> 
              <ShoppingLayout />
            </CheckAuth>
          }>
          <Route path='home' element={<ShoppingHome/>
            
          } />
          <Route path='account' element={<ShoppingAccount />} />
          <Route path='checkout' element={<ShoppingCheckOut />} />
          <Route path='listing' element={<ShoppingListing />} />
          </Route>
          <Route path='/anauth-page' element={<UnauthPage />}/>
          <Route path='*' element={<NotFound />}/>
          
         </Routes>
      </div>
     
    
  )
}

export default App
