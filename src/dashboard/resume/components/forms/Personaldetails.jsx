import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useParams } from 'react-router-dom'
import Globalapi from '@service/Globalapi'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'

const Personaldetails = ({enablenext}) => {

  const params = useParams();

  const { resumeinfo, setresumeinfo, activeIndex, setActiveIndex } =useContext(ResumeInfoContext)
  const [formData , setFormData]=useState();
  const [loading, setLoading] =useState(false);
  useEffect(()=>{
    console.log(params)
  },[])

  const handleinputchange = (e) => {
    enablenext(false)
    const { name, value } = e.target;
    setFormData({
      ...formData ,
      [name]:value
    })
    setresumeinfo({
      ...resumeinfo,
      [name]: value
    })
  }

  const onSave =(e)=> {
    e.preventDefault();
    setLoading(true)
    const data={
      data:formData
    }
    Globalapi.Updateresume(params.resumeid, data).then(resp=>{
      console.log(resp);
       enablenext(true);
       setLoading(false);
       toast("Details Updated")
    },(error)=>{
      setLoading(false);
    })
   
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 m-t-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName"  defaultValue={resumeinfo?.firstName}  required onChange={handleinputchange} />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" defaultValue={resumeinfo?.lastName} required onChange={handleinputchange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle"  defaultValue={resumeinfo?.jobTitle} required onChange={handleinputchange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" defaultValue={resumeinfo?.address} required onChange={handleinputchange} />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" defaultValue={resumeinfo?.phone} required onChange={handleinputchange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" defaultValue={resumeinfo?.email} required onChange={handleinputchange} />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit"
          disabled={loading}>
            {loading?<LoaderCircle className='animate-spin'/>:'Save'}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default Personaldetails
