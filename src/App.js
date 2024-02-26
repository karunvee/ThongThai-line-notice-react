import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from './templates/Navbar/Navbar';
import HomePage from './templates/home/HomePage';
import LoginPage from './templates/LoginPage/LoginPage';
import SettingPage from './templates/setting/SettingPage';
import NoPage from './templates/NoPage/NoPage';

function App() {

  return (
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navbar />}>
            <Route index element={<HomePage />} />
            <Route path="/setting" element={<SettingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<NoPage />} />
            </Route>
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default App;
