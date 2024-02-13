import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { Toaster } from 'sonner';
import secureLocalStorage from 'react-secure-storage';

import MainLayout from './MainLayout';


function App() {
  if(secureLocalStorage.getItem("url") !== "http://localhost/cocsm/api/"){
    secureLocalStorage.setItem("url", "http://localhost/cocsm/api/");
  }
  return (
    <>
      <div className="bg-zinc-800 vh-100 text-white">
        <Toaster duration={2000} richColors position='top-center'/>
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