import React, { useState } from 'react'
import Personaldetails from './forms/Personaldetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { LayoutGrid } from 'lucide-react'
const Formsection = () => {
  const [activeformindex , setactiveformindex] = useState(1);
  const [enablenext , setenablenext] = useState(false);
  return (
    <div>
      <div className='flex justify-between items-center mb-5'>
        <Button variant="outline" size="sm"
         className="flex gap-2"> <LayoutGrid/> Theme</Button>
        <div className='flex gap-2'>
          {activeformindex>1
           && <Button size="sm"
           onClick={()=>setactiveformindex(activeformindex-1)}><ArrowLeft/></Button>}
          <Button 
          disabled={!enablenext}
          className="flex gap-2" size="sm"
           onClick={()=>setactiveformindex(activeformindex+1)}>Next 
            <ArrowRight/> </Button>
        </div>
      </div>
      {/* Personal details  */}
        {activeformindex==1?  <Personaldetails enablenext={(v)=>setenablenext(v)} /> :null}
      {/* summary  */}

      {/* experience */}

      {/* education */}

      {/* skills */}
    </div>
  )
}

export default Formsection