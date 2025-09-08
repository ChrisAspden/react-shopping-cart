//frontend service for user signup, called in SignupFormPopup.tsx, PasswordResetRequestPopup.tsx
export const signupUser = async (email: string, password: string) => {
  const response = await fetch('/api/users/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  return { status: response.status, data };
};

export const requestPasswordReset = async (email: string) => {
  const response = await fetch('/api/users/request-password-reset', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await response.json();
  return { status: response.status, data };
};

export const resetPassword = async (token: string, newPassword: string) => {
  const response = await fetch('/api/users/reset-password-final', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await response.json();
  return { status: response.status, data };
};

