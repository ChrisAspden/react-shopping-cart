// src/services/authService.ts
//frontend service for user authentication
import axios from 'axios';

// export const sendLoginRequest = async (email: string, password: string) => {
//   const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
//   console.log('📤 Sending login request to:', `${BASE_URL}/api/users/login`);
//   console.trace("📍 sendLoginRequest called from:");
//   try {
//     const res = await axios.post(`${BASE_URL}/api/users/login`, { email, password }, {
//       withCredentials: true
//     });
//     console.log('📥 Login response data:', res.data);
//     return res.data
//   } catch (err: any) {
//     console.error('🔍 Axios error details:', {
//     status: err.response?.status,
//     headers: err.response?.headers,
//     data: err.response?.data,
//    message: err.message,
//   });

//     if (err.response?.status === 401) {
//       return { success: false, message: 'Invalid credentials' };
//     }
//     console.error('Login error:', err.response?.data || err.message || err);
//     return { success: false, message: 'Server error — please try again' };
//   }
// };

// export const sendLoginRequest = async (email: string, password: string) => {
//   try {
//     const response = await fetch('/api/users/login', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       credentials: 'include', // only needed if backend is issuing cookies
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();
//     return { status: response.status, data };
//   } catch (err) {
//     console.error('❌ Fetch login error:', err);
//     return { status: 500, data: { message: 'Network error or server unavailable' } };
//   }
// };

export type LoginResponse =
  | { success: true; email: string }
  | { success: false; message?: string };


export const sendLoginRequest = async (
  email: string,
  password: string
  ): Promise<{status: number; data: LoginResponse}> => {
  try {
    const res = await axios.post('/api/users/login', { email, password }, {
      withCredentials: true,
    });
    return { status: res.status, data: res.data };
  } catch (error: any) {
    console.error('Axios login failed:', error);
    return {
      status: error.response?.status || 500,
      data: { message: error.response?.data || 'Login failed', success: false },
    };
  }
};


