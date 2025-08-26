import { PlusSquareIcon } from 'lucide-react'
import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input"
const Addresume = () => {
    const [opendial, setopendial] = useState(false);
  return (
    <>
      <div
        className='p-14 py-24 border items-center
        flex justify-center bg-secondary
        rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md cursor-pointer'
        onClick={()=>setopendial(true)}>
        <PlusSquareIcon />  
      </div>

      <AlertDialog open={opendial}>
        
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a New Resume</AlertDialogTitle>
            <AlertDialogDescription>
              <p>Add a title for your new resume</p>
              <Input className="my-2" placeholder="Ex. Full Stack Resume" />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
           <div className='flex justify-center gap-5'>
            <Button onClick={()=>setopendial(false)} > Cancel</Button>
            <Button> Create</Button>
           </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Addresume
