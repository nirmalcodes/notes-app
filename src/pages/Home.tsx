import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';

const Home = () => {
  return (
    <>
      <div>Home</div>
      <Button
        variant="outline"
        onClick={() => {
          console.log('clicked');
        }}
      >
        Button
      </Button>
      <Button asChild>
        <Link to="/login">Login</Link>
      </Button>
    </>
  );
};

export default Home;
