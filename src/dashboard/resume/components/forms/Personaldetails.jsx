import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const Personaldetails = ({enablenext}) => {
  const { resumeinfo, setresumeinfo, activeIndex, setActiveIndex } =
    useContext(ResumeInfoContext)

  const handleinputchange = (e) => {
    enablenext(false)
    const { name, value } = e.target
    setresumeinfo({
      ...resumeinfo,
      [name]: value,
    })
  }

  const onSave = (e) => {
    e.preventDefault()
    enablenext(true);
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 m-t-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with basic information</p>
      <form onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label className="text-sm">First Name</label>
            <Input name="firstName" required onChange={handleinputchange} />
          </div>
          <div>
            <label className="text-sm">Last Name</label>
            <Input name="lastName" required onChange={handleinputchange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Job Title</label>
            <Input name="jobTitle" required onChange={handleinputchange} />
          </div>
          <div className="col-span-2">
            <label className="text-sm">Address</label>
            <Input name="address" required onChange={handleinputchange} />
          </div>
          <div>
            <label className="text-sm">Phone</label>
            <Input name="phone" required onChange={handleinputchange} />
          </div>
          <div>
            <label className="text-sm">Email</label>
            <Input name="email" required onChange={handleinputchange} />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  )
}

export default Personaldetails
