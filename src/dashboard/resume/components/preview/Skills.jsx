import React from 'react'

const Skills = ({resumeinfo}) => {
  return (
    <div className='my-6'>
                <h2 className='text-center font-bold text-sm mb-2'
        style={{
            color:resumeinfo?.themeColor
        }}
        >Skills</h2>
        <hr style={{
            borderColor:resumeinfo?.themeColor
        }}/>
    <div className=" my-2">
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-1 list-disc text-xs text-gray-700">
             {resumeinfo?.skills?.map((skill, index) => (
                <li key={index} className="break-words pr-3 leading-tight">
                {skill}
                </li>
            ))}
        </ul>
    </div>


    </div>
  )
}

export default Skills