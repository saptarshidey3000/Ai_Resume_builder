import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Formsection from '../../components/Formsection';
import Preview from '../../components/Preview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';

const EditResume = () => {
    const params = useParams();
    const [resumeinfo , setresumeinfo] = useState();
    useEffect(()=>{
        setresumeinfo(dummy);
    },[])
  return (
    <ResumeInfoContext.Provider value={{resumeinfo,setresumeinfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      <Formsection/>
      <Preview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume