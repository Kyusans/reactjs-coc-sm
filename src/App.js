import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { Toaster } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

import MainLayout from './MainLayout';


function App() {
  // localStorage.removeItem('facCode');
  // localStorage.removeItem('facultyLoggedIn');
  // localStorage.removeItem('selectedStatus');
  // localStorage.removeItem('userId');
  // localStorage.removeItem('userLevel');
  // localStorage.removeItem('isLoggedIn');
  // localStorage.removeItem('adminLoggedIn');
  // localStorage.removeItem('userCommentId');
  // localStorage.removeItem('url');
  // localStorage.removeItem('userFullName');
  // localStorage.removeItem('personnelLoggedIn');
  // localStorage.removeItem('theme');
  if(secureLocalStorage.getItem("url") !== "http://localhost/cocsm/api/"){
    secureLocalStorage.setItem("url", "http://localhost/cocsm/api/");
  }
  return (
    <>
      <div className="text-white bg-zinc-800">
        <Toaster richColors position='top-center'/>
        <BrowserRouter basename='coc'>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="*" element={<MainLayout />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;