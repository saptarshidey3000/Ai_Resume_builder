import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const ResumeCardItem = ({ resume }) => {
  // If using Strapi, fields are under resume.attributes
  const data = resume.attributes || resume;

  return (
    <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
      <div
        className='relative p-6 h-[280px] flex flex-col items-center justify-center
        rounded-3xl overflow-hidden cursor-pointer
        transition-transform duration-300 ease-out
        hover:scale-105 hover:-translate-y-1'
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500"></div>
        
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-white">
          <div className="p-5 rounded-full bg-white/20 backdrop-blur-sm shadow-lg mb-4 transition-transform duration-300 hover:rotate-6">
            <Notebook className="w-10 h-10" />
          </div>
          <h3 className="font-bold text-xl text-center drop-shadow-lg tracking-wide">
            {data.Title}
          </h3>
        </div>

        {/* Glow effect */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-pink-400/40 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-indigo-400/40 rounded-full blur-3xl"></div>
      </div>
    </Link>
  )
}

export default ResumeCardItem
