import React from 'react'
import Personaldetails from './forms/Personaldetails'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { LayoutGrid } from 'lucide-react'
const Formsection = () => {
  return (
    <div>
      <div className='flex justify-between items-center mb-5'>
        <Button variant="outline" size="sm"
         className="flex gap-2"> <LayoutGrid/> Theme</Button>
        <div>
          <Button className="flex gap-2" size="sm" >Next 
            <ArrowRight/> </Button>
        </div>
      </div>
      {/* Personal details  */}
      <Personaldetails/>
      {/* summary  */}

      {/* experience */}

      {/* education */}

      {/* skills */}
    </div>
  )
}

export default Formsection