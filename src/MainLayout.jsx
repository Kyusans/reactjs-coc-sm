import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/users/Dashboard'
import MyNavbar from './components/MyNavbar'
import CreatePost from './pages/users/CreatePost'

function MainLayout() {
  return (
    <div className='h-screen overflow-hidden'>
      <MyNavbar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path="/submit" element={<CreatePost />} />
      </Routes>
    </div>
  )
}

export default MainLayout