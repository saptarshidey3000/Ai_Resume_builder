import React, { useState } from 'react'
import { useParams, Navigate, Link } from 'react-router-dom'
import Personaldetails from './forms/Personaldetails'
import Summary from './forms/Summary'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Home, LayoutGrid } from 'lucide-react'
import Themecolor from './Themecolor'

const Formsection = () => {
  const { resumeid } = useParams() // grab resume ID from URL

  const [activeFormIndex, setActiveFormIndex] = useState(1) // starting at 1
  const [enableNext, setEnableNext] = useState(true)
  const [redirect, setRedirect] = useState(false)

  // Handlers
  const handleNext = () => {
    if (activeFormIndex < 5) {
      setActiveFormIndex(prev => prev + 1)
    } else if (activeFormIndex === 5) {
      setRedirect(true) // trigger redirect on last form
    }
  }

  const handlePrev = () => {
    if (activeFormIndex > 1) {
      setActiveFormIndex(prev => prev - 1)
    }
  }

  // Array of all form components
  const forms = [
    <Personaldetails enablenext={setEnableNext} />,
    <Summary enablenext={setEnableNext} />,
    <Experience enablenext={setEnableNext} />,
    <Education enablenext={setEnableNext} />,
    <Skills enablenext={setEnableNext} />
  ]

  // Redirect after finishing last form
  if (redirect) {
    return <Navigate to={`/my-resume/${resumeid}/view`} />
  }

  return (
    <div>
      {/* Header with buttons */}
      <div className='flex justify-between items-center mb-5'>
        <div className='flex gap-5'>
          <Link to={"/dashboard"}>
            <Button><Home /></Button>
          </Link>
        <Themecolor/>
        </div>
        <div className='flex gap-2'>
          <Button size="sm" onClick={handlePrev} disabled={activeFormIndex <= 1}>
            <ArrowLeft />
          </Button>

          <Button
            size="sm"
            className="flex gap-2"
            onClick={handleNext}
            disabled={!enableNext} // rely on each form to enable/disable
          >
            {activeFormIndex === 5 ? 'Finish' : 'Next'} <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Render current form */}
      <div>
        {forms[activeFormIndex - 1] || <div>No form to display</div>}
      </div>
    </div>
  )
}

export default Formsection
