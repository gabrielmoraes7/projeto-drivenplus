import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PlanPage from './pages/Plan/PlanPage';
import PlansPage from './pages/Plans/PlansPage';
import HomePage from './pages/Home/HomePage';
import SignupPage from './pages/Signup/SignupPage';
import LoginPage from './pages/Login/LoginPage';
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    
    <AuthProvider>
      <BrowserRouter>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignupPage />} />
              <Route path="/subscriptions/:id" element={<PlanPage />} />
              <Route path="/subscriptions" element={<PlansPage />} />
              <Route path="/home" element={<HomePage />} />
            </Routes>
      </BrowserRouter>
    </AuthProvider>      
  )
}

export default App
