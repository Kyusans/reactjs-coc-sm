import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import secureLocalStorage from 'react-secure-storage'

function Dashboard() {
  const navigateTo = useNavigate();
  useEffect(() => {
    if(secureLocalStorage.getItem("isLoggedIn") !== "true"){
      navigateTo("/");
    }
  },[navigateTo])
  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  )
}

export default Dashboard