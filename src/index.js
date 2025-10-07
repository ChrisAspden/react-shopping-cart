import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Context/AuthContext';
import { CartProvider } from './Context/CartContext';
import { UIProvider } from './Context/UIContext'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();


