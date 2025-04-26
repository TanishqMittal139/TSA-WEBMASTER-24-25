
import React from 'react';
import { Coffee } from 'lucide-react';

const AuthHeader = () => {
  return (
    <>
      <div className="flex justify-center mb-6">
        <div className="flex items-center space-x-2 text-primary font-bold text-2xl">
          <Coffee size={32} strokeWidth={2.5} />
          <span>Tasty Hub</span>
        </div>
      </div>
      
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">
          Sign in to your account to continue
        </p>
      </div>
    </>
  );
};

export default AuthHeader;
