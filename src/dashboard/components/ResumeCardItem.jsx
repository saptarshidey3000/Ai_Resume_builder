import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ResumeCardItem = ({ resume }) => {
  // If using Strapi, fields are under resume.attributes
  const data = resume.attributes || resume;

  return (
    <Link to={'/dashboard/resume/'+resume.documentId+"/edit"}>

      <div className='p-5 bg-secondary flex flex-col
        items-center justify-center h-[280px]
        border border-primary rounded-lg 
        hover:scale-105 transition-all
        hover:shadow-md shadow-primary '>
        
        <Notebook className="mb-3" />
        <h3 className="font-semibold text-lg text-center">{data.Title}</h3>
      </div>
    </Link>
  )
}

export default ResumeCardItem
