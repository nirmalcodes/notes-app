import React from 'react';
import { useAuthContext } from '@/contexts/AuthContext';

const HomePage = () => {
  const { user } = useAuthContext();
  console.log('USER: ', user);

  return (
    <>
      <div>
        <h1>Welcome to the Home Page</h1>
      </div>
    </>
  );
};

export default HomePage;
