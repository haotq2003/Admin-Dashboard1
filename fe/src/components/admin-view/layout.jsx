import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import AdminSidebar from './Sidebar'
import AdminHeader from './Header'

const AdminLayout = () => {
  const [openSiderbar,setOpenSideber] = useState(false);
  return (
    <div className='flex min-h-screen'>
        {/* admin sidebar */}
        <AdminSidebar open={openSiderbar} setOpen={setOpenSideber}/>
        <div className='flex flex-1 flex-col'>
        {/* admin header */}
        <AdminHeader setOpen={setOpenSideber}/>
        <main className='flex-1 flex bg-muted/40 md:p-6'>
            <Outlet/>
        </main>
        </div>
    </div>
  )
}

export default AdminLayout