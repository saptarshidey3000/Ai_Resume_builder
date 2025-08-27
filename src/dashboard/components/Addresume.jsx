import { Loader2, PlusSquareIcon } from 'lucide-react';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import Globalapi from '../../../service/Globalapi';  // ✅ correct relative path
import { useUser } from '@clerk/clerk-react';



const Addresume = () => {
  const [opendial, setopendial] = useState(false);
  const [resumetitle, setresumetitle] = useState("");
  const {user} =useUser();
  const [loading,setloading] =useState(false)
  const onCreate = () => {
    setloading(true)
    const uuid = uuidv4();
    const data ={
      data:{
        title : resumetitle,
        resumeId : uuid,
        userEmail : user?.primaryEmailAddress?.emailAddress,
        userName:user?.fullName
      }
    }

    Globalapi.CreatenewResume(data).then(resp=>{
      console.log(resp);
      if(resp){
        setloading(false);
      }
    },(error)=>{
      setloading(false);
    })
    setopendial(false); 
    setresumetitle(""); 
  };

  return (
    <>
      <div
        className='p-14 py-24 border items-center
        flex justify-center bg-secondary
        rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md cursor-pointer'
        onClick={() => setopendial(true)}
      >
        <PlusSquareIcon />  
      </div>

      <AlertDialog open={opendial} onOpenChange={setopendial}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a New Resume</AlertDialogTitle>
            <AlertDialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Resume"
                value={resumetitle}
                onChange={(e)=>setresumetitle(e.target.value)}
              />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center gap-5">
            <Button onClick={() => setopendial(false)}>Cancel</Button>
            <Button
              disabled={!resumetitle.trim() || loading}
              onClick={onCreate}
            >
              {
                loading ?
                <Loader2 className='animate-spin'/> : 'Create'
              }
          
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default Addresume
