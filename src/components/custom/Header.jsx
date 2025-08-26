import React from 'react'
import { Button } from '../ui/button'
import { UserButton, useUser } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

const Header = () => {
    const {user, isSignedIn} = useUser();
  return (
    <div className='flex items-center justify-between p-3 px-5 shadow-sm'>
      <img src="/logo.svg" width={40} height={40} alt="Logo" />
         {isSignedIn ?
        <div className='flex gap-2 items-center'>
            <Link to={'/dashboard'}>
                <Button variant="outline">DashBoard</Button>
            </Link>
            <UserButton/>
            </div> :
              <Link to ={'/auth/sign-in'}>
        <Button>Get Started</Button>
    </Link>

        }
    
    </div>
  )
}

export default Header
