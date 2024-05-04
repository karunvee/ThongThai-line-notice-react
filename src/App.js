import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {STORAGE_KEY_AUTH, BASE_URL} from './Config';

import ProtectedRoute from './ProtectRoute';
import Navbar from './templates/Navbar/Navbar';
import HomePage from './templates/home/HomePage';
import LoginPage from './templates/LoginPage/LoginPage';
import SettingPage from './templates/setting/SettingPage';
import NoPage from './templates/NoPage/NoPage';


import { enqueueSnackbar, SnackbarProvider } from 'notistack';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_KEY_AUTH);
    setIsLoggedIn(!!token); // Check if token exists
    if(!localStorage.getItem(BASE_URL)){
      console.log('url was saved!' ,window.location.hostname);
      localStorage.setItem(BASE_URL, `http://${window.location.hostname}:8070`);
    }
  }, []);


  const handleLogout = () => {
    setIsLoggedIn(false);

    const variant = 'success';
    enqueueSnackbar( `Goodbye, you were logout 👋👋👋`, { variant });

  };

  const handleLoginPage = (status, username) => {
    // Handle data received from the child component
    setIsLoggedIn(status);

    const variant = 'success';
    enqueueSnackbar( `Hello ${username}, welcome to Smart Component Management 😃😃😃`, { variant });
  };
  return (
    <React.StrictMode>
      <BrowserRouter>
      <SnackbarProvider />
        <Routes>
            <Route path="/" element={<Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout}/>}>
            <Route index element={<HomePage />} />
            <Route
            path="/setting"
            element={
              <ProtectedRoute>
                <SettingPage />
              </ProtectedRoute>}
            />
            <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} onLogin={handleLoginPage}/>} />
            <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
