import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/users/Dashboard'
import MyNavbar from './components/MyNavbar'

function MainLayout() {
  return (
    <div>
      <MyNavbar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default MainLayout