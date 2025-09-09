import React, { useEffect, useState, useContext } from 'react'
import { Input  } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Editor } from 'primereact/editor';
        
const formField={
    title:'',
    companyName:'',
    city: '',
      state: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      workSummary:''
}

const Experience = () => {
    const [experiencelist ,setExperiencelist] = useState([
        {
                ...formField
        }
    ])
const handlechange = (index, event) => {
  const { name, value } = event.target;
  const updatedList = [...experiencelist];
  updatedList[index][name] = value;
  setExperiencelist(updatedList);
};

const addnewexp=()=>{
    setExperiencelist([...experiencelist,formField])
}
const removenewexp=()=>{
    setExperiencelist(experiencelist=>experiencelist.slice(0,-1))
}
const { resumeinfo, setresumeinfo } = useContext(ResumeInfoContext)
useEffect(()=>{
    setresumeinfo({
        ...resumeinfo,
        experience:experiencelist
    })
},[experiencelist])
  return (
    <div>
         <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 m-t-10">
        <h2 className="font-bold text-lg">Proffessional Experience</h2>
        <p>Add previous experience</p>
        <div>
            {experiencelist.map((item,index)=>(
                <div className='grid grid-cols-2 border border-primary gap-3 p-3 my-5 rounded-lg'>
                    <div>
                        <label className='text-xs' >Position Title</label>
                        <Input name="title" onChange={(event)=>handlechange(index,event)} />
                    </div>
                                        <div>
                        <label className='text-xs' >Company Name</label>
                        <Input name="companyName" onChange={(event)=>handlechange(index,event)} />
                    </div>
                                        <div>
                        <label className='text-xs' >City</label>
                        <Input name="city" onChange={(event)=>handlechange(index,event)} />
                    </div>
                                        <div>
                        <label className='text-xs' >State</label>
                        <Input name="state" onChange={(event)=>handlechange(index,event)} />
                    </div>
                                        <div>
                        <label className='text-xs' >Start Date</label>
                        <Input type="date" name="startDate" onChange={(event)=>handlechange(index,event)} />
                    </div>
                                        <div>
                        <label className='text-xs' >End Date</label>
                        <Input type="date" name="endDate" onChange={(event)=>handlechange(index,event)} />
                    </div>
                    <div>
  <label className="text-xs p-1">Currently Working</label>
  <input
    type="checkbox"
    checked={experiencelist[index].currentlyWorking}
    onChange={(e) =>
      handlechange(index, {
        target: { name: "currentlyWorking", value: e.target.checked }
      })
    }
  />
</div>

                    <div  className="col-span-2">
                        {/* <label className='text-xs' >Work Summary</label>
                        <Input name="workSummary" onChange={(event)=>handlechange(index,event)} /> */}
                         <label className='text-xs'>Work Summary</label>
<Editor
  value={experiencelist[index].workSummary}
  onTextChange={(e) =>
    handlechange(index, { target: { name: "workSummary", value: e.htmlValue } })
  }
  style={{ height: "200px" }}
  className="rounded-md border border-primary"
/>

                    </div>
                </div>
            ))}
        </div>
        <div className='flex justify-between'>
            <div className='flex gap-2'>
            <Button variant="outline" onClick={addnewexp} className="text-primary"> + Add More Experience </Button>
            <Button variant="outline" onClick={removenewexp} className="text-primary"> - Remove  </Button>
            </div>
            <Button>Save</Button>
        </div>  
        </div>
    </div>
  )
}

export default Experience