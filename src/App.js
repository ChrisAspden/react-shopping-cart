import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import MainLayout from './Layouts/MainLayout';
import './index.css';
import AppRoutes from './Routes/appRoutes';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;


