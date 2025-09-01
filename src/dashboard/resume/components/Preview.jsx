import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'

const Preview = () => {
    const {resumeinfo , setresumeinfo}=useContext(ResumeInfoContext)
  return (
    <div>
        {/* personal details */}

        {/* summary */}

        {/* Proffesional Experience */}

        {/* Education */}

        {/* Skills */}

    </div>
  )
}

export default Preview