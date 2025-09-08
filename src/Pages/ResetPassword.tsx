import React from 'react';
import { useSearchParams } from 'react-router-dom';
import PasswordResetPopup from '../Components/PasswordResetPopup';

const ResetPassword: React.FC = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  console.log('🔍 URL token:', token);


  if (!token) {
    return <p className="text-red-600 p-4">Invalid or missing token.</p>;
  }

  return (
        <div className="absolute top-15 right-10 z-50">
            <div className="w-64 transform scale-[0.9] origin-top-right">
                <PasswordResetPopup token={token} onClose={() => window.location.href = '/'} />
            </div>
        </div>

    
  );
};

export default ResetPassword;
