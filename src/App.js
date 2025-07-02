import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home/Home';
import MainLayout from './Layouts/MainLayout';
import './index.css';



function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Add more routes here */}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;


