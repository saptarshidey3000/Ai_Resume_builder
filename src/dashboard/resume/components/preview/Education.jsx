import React from 'react'

const Education = ({resumeinfo}) => {
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeinfo?.themeColor
        }}
        >Education</h2>
        <hr style={{
            borderColor:resumeinfo?.themeColor
        }}/>
        {resumeinfo?.education.map((education,index)=>(
            <div key={index} className='my-3'>
                <h2 className='text-sm font-bold'
                    style={{
                        color:resumeinfo?.themeColor
                    }}
                >{education.institution}</h2>
                <h2 className='text-xs flex justify-between' >{education?.degree} 
                <span>{education?.startDate} - {education?.endDate}</span>
                </h2>
                <p className='text-xs my-2'>
                    {education?.grade}
                </p>
            </div>
        ))}
    </div>
  )
}

export default Education