import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/users/Dashboard'
import MyNavbar from './components/MyNavbar'
import CreatePost from './pages/users/CreatePost'
import UserProfile from './pages/users/UserProfile'
import AdminDashboard from './pages/admin/AdminDashboard'

function MainLayout() {
  return (
    <>
      <MyNavbar />
      <div className='h-screen'>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path="/submit" element={<CreatePost />} />
          <Route path="/user" element={<UserProfile />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </div>
    </>
  )
}

export default MainLayout