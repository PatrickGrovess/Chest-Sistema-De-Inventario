import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import Inventory from './pages/Inventory';
import Team from './pages/Team';
import Settings from './pages/Settings'

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Ruta principal: Login */}
        <Route path="/" element={<Login />} />
        
        {/*Ruta de Dashboard */}
       <Route element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}