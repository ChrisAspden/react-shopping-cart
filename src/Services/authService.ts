// src/services/authService.ts
//frontend service for user authentication
import axios from 'axios';

export type LoginResponse =
  | { success: true; email: string }
  | { success: false; message: string };


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
    const fallbackMessage = 'Login failed. Please try again.';
    const message =
      typeof error.response?.data?.message === 'string'
        ? error.response.data.message
        : fallbackMessage;
    return {
      status: error.response?.status || 500,
      data: { message, success: false },
    };
  }
};


