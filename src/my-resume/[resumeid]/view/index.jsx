import React, { useEffect, useState } from 'react'
import Header from '../../../components/custom/Header.jsx'
import { Button } from '@/components/ui/button.jsx'
import Preview from '@/dashboard/resume/components/Preview.jsx'
import { ResumeInfoContext } from '@/context/ResumeInfoContext.jsx'
import { useParams } from 'react-router-dom'
import Globalapi from '@service/Globalapi.js'
import { RWebShare } from "react-web-share";


const Viewresume = () => {

  const [resumeinfo , setresumeinfo]=useState()
  const {resumeid}=useParams();

  useEffect(()=>{
      getresumeinfo();
  },[])

  const getresumeinfo=()=>{
      Globalapi.getresumebyid(resumeid).then(resp=>{
        console.log(resp.data.data);
        setresumeinfo(resp.data.data);
      })
  }

  const handledownload=()=>{
    window.print();
  }

  return (
    <ResumeInfoContext.Provider  value={{resumeinfo , setresumeinfo}} >
      <div id="no-print">
        <Header />
        <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <h2 className='text-center text-2xl font-medium'>Your Ai generated Resume is Ready </h2>
          <p className='text-center text-gray-700'>You are ready to Download your Resume and you can share your resume url with others</p>
          <div className='flex justify-between px-44 my-10'>
            <Button onClick={handledownload} >Download</Button>
            <RWebShare
        data={{
          text: "Have a look at my Resume",
          url: import.meta.env.VITE_BASE_URL+"my-resume/"+resumeid+"/view" ,
          title: resumeinfo?.firstName+" "+resumeinfo?.lastName ,
        }}
        onClick={() => console.log("shared successfully!")}
      >
        <Button>Share 🔗</Button>
      </RWebShare>
          </div>
        </div>
        </div>
          <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
          <div id="print-area" >
            <Preview/>
          </div>
          </div>
    </ResumeInfoContext.Provider>
  )
}

export default Viewresume