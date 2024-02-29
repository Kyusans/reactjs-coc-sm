import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/users/Dashboard'
import MyNavbar from './components/MyNavbar'
import CreatePost from './pages/users/CreatePost'
import UserProfile from './pages/users/UserProfile'

function MainLayout() {
  return (
    <div className='h-screen overflow-hidden'>
      <MyNavbar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/submit" element={<CreatePost />} />
        <Route path="/user" element={<UserProfile />} />
      </Routes>
    </div>
  )
}

export default MainLayout