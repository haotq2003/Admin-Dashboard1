import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='flex min-h-screen w-full'>
    <div className='hidden lg:flex items-center justify-center w-1/2 bg-black'>
    <div className='max-w-md space-y-6 text-center text-primary-foreground'>
   <h1 className='text-4xl font-extralight tracking-tighter'>
    Welcome to ECommere Shopping
   </h1>
    </div>
    </div>
        <div className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Layout