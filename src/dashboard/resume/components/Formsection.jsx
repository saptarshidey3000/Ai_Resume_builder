import React, { useState } from 'react'
import Personaldetails from './forms/Personaldetails'
import Summary from './forms/Summary'
import Experience from './forms/Experience'
import Education from './forms/Education'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'

const Formsection = () => {
  const [activeformindex, setactiveformindex] = useState(4) // starting at Experience
  const [enablenext, setenablenext] = useState(true)

  // Array of all form components
  const forms = [
    <Personaldetails enablenext={setenablenext} />,
    <Summary enablenext={setenablenext} />,
    <Experience enablenext={setenablenext} />,
    <Education enablenext={setenablenext} />
  ]

  // Handlers
  const handleNext = () => {
    if (activeformindex < forms.length) {
      setactiveformindex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (activeformindex > 1) {
      setactiveformindex(prev => prev - 1)
    }
  }

  return (
    <div>
      {/* Header with buttons */}
      <div className='flex justify-between items-center mb-5'>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid /> Theme
        </Button>

        <div className='flex gap-2'>
          <Button size="sm" onClick={handlePrev} disabled={activeformindex <= 1}>
            <ArrowLeft />
          </Button>

          <Button size="sm" className="flex gap-2" onClick={handleNext} disabled={activeformindex >= forms.length}>
            Next <ArrowRight />
          </Button>
        </div>
      </div>

      {/* Render current form */}
      <div>
        {forms[activeformindex - 1] || <div>No form to display</div>}
      </div>
    </div>
  )
}

export default Formsection
