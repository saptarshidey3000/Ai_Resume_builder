import React from 'react'
import { Button } from '../ui/button'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="fixed top-4 left-0 w-full z-50 flex justify-center">
      <div className='w-full max-w-5xl flex items-center justify-between
        p-3 px-6 rounded-2xl
        backdrop-blur-md bg-white/10 border border-white/20 shadow-sm mx-auto'>
        
        <img src="/logo.svg" width={40} height={40} alt="Logo" />
        
        {isSignedIn ? (
          <div className='flex gap-2 items-center'>
            <Link to={'/dashboard'}>
              <Button variant="outline">Dashboard</Button>
            </Link>
            <UserButton />
          </div>
        ) : (
          <Link to={'/auth/sign-in'}>
            <Button>Get Started</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
