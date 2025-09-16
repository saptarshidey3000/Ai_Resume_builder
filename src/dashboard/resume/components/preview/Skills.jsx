import React from 'react'

const Skills = ({ resumeinfo }) => {
  return (
    <div className='my-6'>
      <h2
        className='text-center font-bold text-sm mb-2'
        style={{ color: resumeinfo?.themeColor }}
      >
        Skills
      </h2>
      <hr style={{ borderColor: resumeinfo?.themeColor }} />

      <div className='grid grid-cols-2 gap-x-8 gap-y-3 my-4'>
        {resumeinfo?.skills?.map((skill, index) => (
          <div key={index} className='flex flex-col'>
            <h2 className='text-xs mb-1'>{skill.name}</h2>
            <div className='h-2 bg-gray-200 rounded w-[120px]'>
              <div
                className='h-2 rounded'
                style={{
                  backgroundColor: resumeinfo?.themeColor,
                  width: skill?.rating * 20 + '%',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Skills
