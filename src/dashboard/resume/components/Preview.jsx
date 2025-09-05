import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import Personalpreview from './preview/Personalpreview'
import Summarypreview from './preview/Summarypreview'
import Experience from './preview/Experience'
import Education from './preview/Education'
import Skills from './preview/Skills'

const Preview = () => {
    const {resumeinfo , setresumeinfo}=useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
      style={{
        borderColor : resumeinfo?.themeColor
      }}
    >
        {/* personal details */}
          <Personalpreview  resumeinfo={resumeinfo}/>
        {/* summary */}
          <Summarypreview resumeinfo={resumeinfo}/>
        {/* Proffesional Experience */}
          <Experience resumeinfo={resumeinfo}/>
        {/* Education */}
          <Education resumeinfo={resumeinfo}/>
        {/* Skills */}
        <Skills resumeinfo={resumeinfo}/>

    </div>
  )
}

export default Preview