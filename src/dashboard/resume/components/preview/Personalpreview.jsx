import React from 'react'

const Personalpreview = ({resumeinfo}) => {
  return (
    <div>
        <h2 className='font-bold text-xl text-center '
        style={{
            color : resumeinfo?.themeColor
        }}
        >{resumeinfo?.firstName} {resumeinfo?.lastName}</h2>
        <h2 className='text-center text-sm font-medium'
        >{resumeinfo?.jobTitle}</h2>
        <h2 className='text-center font-normal text-xs'
        style={{
            color:resumeinfo?.themeColor
        }}
        >{resumeinfo?.address}</h2>
        <div className='flex justify-between'>
            <h2 className='font-normal text-xs'
            style={{
                color:resumeinfo?.themeColor
            }}
             >{resumeinfo?.phone}</h2>
            <h2 className='font-normal text-xs'
            style={{
                color:resumeinfo?.themeColor
            }}
            >{resumeinfo?.email}</h2>
        </div>
        <hr className='border-[1.5px] my-2 ' 
        style={{
            borderColor:resumeinfo?.themeColor
        }}/>
    </div>
  )
}

export default Personalpreview