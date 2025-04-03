import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import MainPage from './pages/MainPage.tsx'
import Login from './pages/Login.tsx';
import SignUp from './pages/SignUp.tsx';
import CreateBigTask from './pages/CreateBigTask.tsx';
import CreateSprint from './pages/CreateSprint.tsx';
import ShowBigTask from './pages/ShowBigTask.tsx';
import ShowSprint from './pages/ShowSprint.tsx';
import NotFound from './pages/NotFound.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<SignUp />}/>
        <Route path="/createbigtask" element={<CreateBigTask />}/>
        <Route path="/createsprint" element={<CreateSprint />}/>
        <Route path="/showbigtask" element={<ShowBigTask />}/>
        <Route path="/Showsprint" element={<ShowSprint />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
