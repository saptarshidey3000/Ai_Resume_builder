import React, { useEffect, useState } from 'react'
import Addresume from './components/Addresume'
import { useUser } from '@clerk/clerk-react'
import Globalapi from './../../service/Globalapi';
import ResumeCardItem from './components/ResumeCardItem';

const Dashboard = () => {
  const { user } = useUser();
  const [resumelist, setresumelist] = useState([]);

  useEffect(() => {
    if (user) {
      getuserResumelist();
    }
  }, [user]);

  // use for get user resume list
  const getuserResumelist = () => {
    Globalapi.getuserresume(user?.primaryEmailAddress?.emailAddress)
      .then(resp => {
        setresumelist(resp.data.data);
      })
      .catch(err => {
        console.error("Error fetching resume list:", err);
      });
  };

  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next job role</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <Addresume />
        {resumelist.length > 0 && resumelist.map((resume, index) => (
          <ResumeCardItem resume={resume} key={index} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard;
