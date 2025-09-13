import React, { useEffect, useState, useContext, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import Globalapi from '@service/Globalapi'
import { useParams } from 'react-router-dom'

const formField = {
  institution: '',
  degree: '',
  startDate: '',
  endDate: '',
  grade: ''
}

const Education = () => {
  const { resumeinfo, setresumeinfo } = useContext(ResumeInfoContext)
  const params = useParams()

  const [educationlist, setEducationlist] = useState(
    resumeinfo?.education?.length > 0 ? resumeinfo.education : [{ ...formField }]
  )
  const [loading, setLoading] = useState(false)

  // Update local list if context changes (e.g., initial load)
  useEffect(() => {
    if (resumeinfo?.education?.length > 0) {
      setEducationlist(resumeinfo.education)
    }
  }, [resumeinfo?.education])

  // Debounced context sync
  const updateContext = useCallback(() => {
    setresumeinfo(prev => ({
      ...prev,
      education: educationlist
    }))
  }, [educationlist, setresumeinfo])

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateContext()
    }, 300)
    return () => clearTimeout(timeoutId)
  }, [educationlist, updateContext])

  const handleChange = (event, index) => {
    const { name, value } = event.target
    const updatedList = [...educationlist]
    updatedList[index] = { ...updatedList[index], [name]: value }
    setEducationlist(updatedList)
  }

  const addnewedu = () => {
    setEducationlist([...educationlist, { ...formField }])
  }

  const removeedu = () => {
    if (educationlist.length > 1) {
      setEducationlist(prev => prev.slice(0, -1))
    }
  }

 const onSave = (e) => {
  e.preventDefault()
  setLoading(true)

  const payload = {
    data: {
      education: educationlist.map(({ id, ...rest }) => rest) // remove id if exists
    }
  }

  console.log("Saving resumeid:", params.resumeid)
  console.log("Sending payload:", payload)

  Globalapi.Updateresume(params.resumeid, payload).then(
    (resp) => {
      console.log("Update success:", resp)
      setLoading(false)
      toast('Education Updated')

      // Force immediate context update
      setresumeinfo(prev => ({
        ...prev,
        education: educationlist
      }))
    },
    (error) => {
      console.error("Update failed:", error)
      setLoading(false)
      toast.error('Save failed')
    }
  )
}


  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Education</h2>
        <p>Add your educational details</p>

        <form onSubmit={onSave}>
          {educationlist.map((item, index) => (
            <div key={index} className="grid grid-cols-2 border border-primary gap-3 p-3 my-5 rounded-lg">
              <div>
                <label>Institute Name</label>
                <Input
                  name="institution"
                  value={item.institution}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Degree</label>
                <Input
                  name="degree"
                  value={item.degree}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={item.startDate}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={item.endDate}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
              <div>
                <label>Grade</label>
                <Input
                  name="grade"
                  value={item.grade}
                  onChange={(e) => handleChange(e, index)}
                />
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={addnewedu}
                className="text-primary"
              >
                + Add
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={removeedu}
                className="text-primary"
                disabled={educationlist.length === 1}
              >
                - Remove
              </Button>
            </div>

            <Button type="submit" disabled={loading}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Education
