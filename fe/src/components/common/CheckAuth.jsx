

import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const CheckAuth = ({isAuthen,user,children}) => {
  const location = useLocation();
  if(!isAuthen && !(location.pathname.includes('/login') || location.pathname.includes('/register'))){
    return <Navigate to={'/auth/login'}/>
  }
  if(isAuthen && (location.pathname.includes('/login') || location.pathname.includes('/register'))){
    if(user?.role === 'admin'){
      return <Navigate to={'/admin/dashboard'}/>
    }else{
      return <Navigate to={'/shop/home'}/>
    }
    
  }
  if(isAuthen && user?.role !== 'admin' && location.pathname.includes('admin')){
    return <Navigate to={'/anauth-page'}/>
  }
  if(isAuthen && user?.role === 'admin' && location.pathname.includes('shop')){
  return <Navigate to={'/admin/dashboard'}/>
  }
  return (
    <div>
      {children}
    </div>
  )
}

export default CheckAuth