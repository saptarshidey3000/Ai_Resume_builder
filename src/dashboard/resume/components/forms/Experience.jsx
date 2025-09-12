// Experience.jsx
import React, { useEffect, useState, useContext } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Editor } from 'primereact/editor'
import { Brain, LoaderCircle } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { toast } from 'sonner'
import DOMPurify from 'dompurify'
import Globalapi from '@service/Globalapi'
import { useParams } from 'react-router-dom'

const apikey = import.meta.env.VITE_GEMINI_API
const genAI = new GoogleGenerativeAI(apikey)

const formField = {
  positiontitle: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  currentlyWorking: false,
  workSummary: ''
}

const Experience = () => {
  const { resumeinfo, setresumeinfo } = useContext(ResumeInfoContext)
  const params = useParams()

  const [experiencelist, setExperiencelist] = useState(
    resumeinfo?.experience?.length > 0 ? resumeinfo.experience : [{ ...formField }]
  )
  const [generatingIndex, setGeneratingIndex] = useState(null)
  const [loading, setLoading] = useState(false)

  // Sync changes to context
  useEffect(() => {
    setresumeinfo({ ...resumeinfo, experience: experiencelist })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiencelist])

  // Initialize state when resumeinfo changes
  useEffect(() => {
    if (resumeinfo?.experience?.length > 0) {
      setExperiencelist(resumeinfo.experience)
    }
  }, [resumeinfo])

  const handlechange = (index, event) => {
    const { name, value } = event.target
    const updatedList = [...experiencelist]
    updatedList[index] = { ...updatedList[index], [name]: value }
    setExperiencelist(updatedList)
  }

  const handleCheckboxChange = (index) => (e) => {
    handlechange(index, { target: { name: 'currentlyWorking', value: e.target.checked } })
  }

  const addnewexp = () => setExperiencelist([...experiencelist, { ...formField }])
  const removenewexp = () => {
    if (experiencelist.length > 1) setExperiencelist((prev) => prev.slice(0, -1))
  }

  const normalizeToHtml = (raw) => {
    if (!raw) return ''
    let html = raw.trim()
    html = html.replace(/```html|```/gi, '').trim()
    if (!/<ul|<li/.test(html)) {
      const lines = html
        .split(/\r?\n/)
        .map((l) => l.replace(/^[-\d\.\)\s]+/, '').trim())
        .filter(Boolean)
      html = lines.length ? `<ul>${lines.map((l) => `<li>${l}</li>`).join('')}</ul>` : `<p>${html}</p>`
    }
    return html
  }

  const generateByAI = async (index) => {
    const positiontitle = (experiencelist[index]?.positiontitle || '').trim()
    if (!positiontitle) {
      toast.error('Please add Position Title first')
      return
    }

    try {
      setGeneratingIndex(index)
      const prompt = `Position title: ${positiontitle}.
Generate 3-5 concise bullet points describing key responsibilities and achievements suitable for a resume.
Return ONLY valid HTML: a single <ul> with <li> items (short bullets, 8-20 words).`

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent(prompt)
      const raw = await result.response.text()
      const html = normalizeToHtml(raw)
      const safe = DOMPurify.sanitize(html)

      const updated = [...experiencelist]
      updated[index] = { ...updated[index], workSummary: safe }
      setExperiencelist(updated)
      toast('AI-generated bullets inserted')
    } catch (err) {
      console.error('AI generation error', err)
      toast.error('AI generation failed')
    } finally {
      setGeneratingIndex(null)
    }
  }

  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = { data: { experience: experiencelist } }

    Globalapi.Updateresume(params.resumeid, data)
      .then((resp) => {
        console.log(resp)
        setLoading(false)
        toast('Experience Updated')
      })
      .catch(() => {
        setLoading(false)
        toast.error('Save failed')
      })
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add previous experience</p>

        <form onSubmit={onSave}>
          {experiencelist.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 border border-primary gap-3 p-3 my-5 rounded-lg"
            >
              {/* Left side inputs */}
              <div>
                <label className="text-xs">Position Title</label>
                <Input name="positiontitle" value={item.positiontitle} onChange={(e) => handlechange(index, e)} />
              </div>
              <div>
                <label className="text-xs">Company Name</label>
                <Input name="companyName" value={item.companyName} onChange={(e) => handlechange(index, e)} />
              </div>
              <div>
                <label className="text-xs">City</label>
                <Input name="city" value={item.city} onChange={(e) => handlechange(index, e)} />
              </div>
              <div>
                <label className="text-xs">State</label>
                <Input name="state" value={item.state} onChange={(e) => handlechange(index, e)} />
              </div>
              <div>
                <label className="text-xs">Start Date</label>
                <Input type="date" name="startDate" value={item.startDate} onChange={(e) => handlechange(index, e)} />
              </div>
              <div>
                <label className="text-xs">End Date</label>
                <Input type="date" name="endDate" value={item.endDate} onChange={(e) => handlechange(index, e)} />
              </div>
              <div>
                <label className="text-xs p-1">Currently Working</label>
                <input type="checkbox" checked={Boolean(item.currentlyWorking)} onChange={handleCheckboxChange(index)} />
              </div>

              {/* Work Summary Editor + Preview */}
              <div className="col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-700">Work Summary</label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-primary text-primary"
                    onClick={() => generateByAI(index)}
                    disabled={generatingIndex !== null && generatingIndex !== index}
                    type="button"
                  >
                    {generatingIndex === index ? <LoaderCircle className="w-4 h-4 animate-spin" /> : <Brain className="w-4 h-4" />}
                    Generate from AI
                  </Button>
                </div>

                <Editor
                  key={index} // force re-render to prevent glitches
                  value={item.workSummary}
                  onTextChange={(e) => handlechange(index, { target: { name: 'workSummary', value: e.htmlValue } })}
                  style={{ height: '200px' }}
                  className="rounded-md border border-primary"
                />

                {/* Preview below editor */}
                <div className="mt-2 p-2 border border-gray-200 rounded bg-gray-50 resume-preview">
                  <div dangerouslySetInnerHTML={{ __html: item.workSummary || '' }} />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button variant="outline" type="button" onClick={addnewexp} className="text-primary">
                + Add More Experience
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={removenewexp}
                className="text-primary"
                disabled={experiencelist.length === 1}
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

export default Experience
