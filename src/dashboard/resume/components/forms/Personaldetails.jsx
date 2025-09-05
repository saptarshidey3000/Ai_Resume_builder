import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'

const Personaldetails = () => {
    const {resumeinfo , setresumeinfo} = useContext(ResumeInfoContext)
  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 m-t-10'>
        <h2 className='font-bold text-lg'>Personal Details</h2>
        <p>Get started with basic information</p>
    </div>
  )
}

export default Personaldetails