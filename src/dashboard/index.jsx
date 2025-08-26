import React from 'react'
import Addresume from './components/Addresume'

const Dashboard = () => {
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating AI resume to your next job role</p>
      <div className='grid grid-cols-2 md:grid-cols03 lg:grid-cols-5 mt-10'>
        <Addresume/>
      </div>
    </div>
  )
}

export default Dashboard