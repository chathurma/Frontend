import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './utils/Auth';

import './App.css';


import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ManageItemsPage from './pages/ManageItemsPage.jsx';
import ManageCategoriesPage from './pages/ManageCategoriesPage.jsx';
import SalesPage from './pages/SalesPage.jsx';


function App() {
  return (
    <Router>
      <AuthProvider>
      <div className="app-container"> 
        <Routes>
          <Route exact path="/" element={<SalesPage/>}/>
          <Route exact path="/login" element={<LoginPage/>}/>
          <Route exact path="/dashboard" element={<SalesPage/>}/>
          <Route exact path="/manage-items" element={<ManageItemsPage/>}/>
          <Route exact path="/manage-categories" element={<ManageCategoriesPage/>}/>
          <Route exact path="/sales" element={<SalesPage/>}/>
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
