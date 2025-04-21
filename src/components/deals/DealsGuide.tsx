
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

const DealsGuide = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="bg-muted p-6 rounded-lg max-w-3xl mx-auto mt-12">
      <h2 className="text-xl font-semibold mb-2">How to Use Deals</h2>
      <ol className="list-decimal ml-5 space-y-2">
        <li>Sign in to your account to access exclusive deals</li>
        <li>Browse available deals and select the one you want</li>
        <li>Click "Use Deal" to apply the discount to eligible items</li>
        <li>Complete your order with the discount applied</li>
      </ol>
      
      {!user && (
        <div className="mt-6 text-center">
          <p className="mb-3">Sign in to access exclusive deals</p>
          <Button onClick={() => navigate('/sign-in')}>
            Sign In Now
          </Button>
        </div>
      )}
    </div>
  );
};

export default DealsGuide;
