import React from 'react'

const Experience = ({resumeinfo}) => {
  return (
    <div className='my-6'>
        <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeinfo?.themeColor
        }}
        >Proffesional Experience</h2>
        <hr style={{
            borderColor:resumeinfo?.themeColor
        }}/>
        {resumeinfo?.experience.map((experience,index)=>(
            <div key={index} className='my-5' >
                <h2 className='text-sm font-bold'
                    style={{
                        color:resumeinfo?.themeColor
                    }}
                >{experience?.title}</h2>
                <h2 className='text-xs flex justify-between' >
                    {experience?.companyName},
                    {experience?.city},
                    {experience?.state}
                  <span>
  {experience?.startDate} - {experience?.currentlyWorking ? "Present" : experience?.endDate}
</span>

                </h2>
                {/* <p className='text-xs my-2'>
                    {experience.workSummary}
                </p> */}
                <div dangerouslySetInnerHTML={{__html:experience?.workSummary}} className='text-xs my-2' />
            </div>
        ))}
    </div>
  )
}

export default Experience