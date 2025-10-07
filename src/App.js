import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import './index.css';
import AppRoutes from './Routes/appRoutes';
import CartErrorBanner from './Components/CartErrorBanner';

function App() {
  return (
    <BrowserRouter>
      <CartErrorBanner />
      <MainLayout>
        <AppRoutes />      
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;


