import React from 'react'

const Summarypreview = ({resumeinfo}) => {
  return (
   
        <p className='text-xs'>
            {resumeinfo?.summary}
        </p>
    
  )
}

export default Summarypreview