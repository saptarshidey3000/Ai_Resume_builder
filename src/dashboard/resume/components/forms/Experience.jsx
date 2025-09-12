// Experience.jsx
import React, { useEffect, useState, useContext } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Editor } from 'primereact/editor'
import { Brain, LoaderCircle } from 'lucide-react'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { toast } from 'sonner'
import DOMPurify from 'dompurify' // npm i dompurify

const apikey = import.meta.env.VITE_GEMINI_API
// NOTE: For testing it's fine. For production, use a backend proxy (see below).
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
  const [experiencelist, setExperiencelist] = useState([{ ...formField }])
  const [generatingIndex, setGeneratingIndex] = useState(null) // index currently generating
  const { resumeinfo, setresumeinfo } = useContext(ResumeInfoContext)

  // sync with context
  useEffect(() => {
    setresumeinfo({
      ...resumeinfo,
      experience: experiencelist
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [experiencelist])

  // controlled-change handler
  const handlechange = (index, event) => {
    const { name, value } = event.target
    const updatedList = [...experiencelist]
    updatedList[index] = { ...updatedList[index], [name]: value }
    setExperiencelist(updatedList)
  }

  const addnewexp = () => {
    // clone to avoid shared refs
    setExperiencelist([...experiencelist, { ...formField }])
  }

  const removenewexp = () => {
    if (experiencelist.length > 1) {
      setExperiencelist((prev) => prev.slice(0, -1))
    }
  }

  // Helper: if model returns plain text bullets, convert to <ul><li>
// Helper: normalize Gemini output to valid HTML
const normalizeToHtml = (raw) => {
  if (!raw) return ''
  let html = raw.trim()

  // 1. Strip Markdown code fences (```html ... ```)
  html = html.replace(/```html|```/gi, '').trim()

  // 2. If no <ul>/<li>, convert line breaks into bullet list
  if (!/<ul|<li/.test(html)) {
    const lines = html
      .split(/\r?\n/)
      .map((l) => l.replace(/^[-\d\.\)\s]+/, '').trim())
      .filter(Boolean)

    if (lines.length) {
      html = `<ul>${lines.map((l) => `<li>${l}</li>`).join('')}</ul>`
    } else {
      html = `<p>${html}</p>`
    }
  }
  return html
}


  // AI generator for a single experience entry (by index)
  const generateByAI = async (index) => {
    const positiontitle = (experiencelist[index]?.positiontitle || '').trim()
    if (!positiontitle) {
      toast.error('Please add Position Title first')
      return
    }

    try {
      setGeneratingIndex(index)

      const prompt = `Position title: ${positiontitle}.
Based on this position title, generate 3-5 concise bullet points describing key responsibilities and achievements suitable for a resume.
Return ONLY valid HTML: a single <ul> with <li> items (no extra explanation). Keep bullets short (8-20 words each).`

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent(prompt)
      const raw = await result.response.text() // await this promise
      let html = normalizeToHtml(raw)

      // sanitize output before injecting into editor
      let safe = html
      try {
        safe = DOMPurify.sanitize(html)
      } catch (err) {
        console.warn('DOMPurify sanitize failed, falling back to raw HTML', err)
      }

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

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 m-t-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add previous experience</p>

        <div>
          {experiencelist.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-2 border border-primary gap-3 p-3 my-5 rounded-lg"
            >
              <div>
                <label className="text-xs">Position Title</label>
                <Input
                  name="positiontitle"
                  value={item.positiontitle}
                  onChange={(e) => handlechange(index, e)}
                />
              </div>

              <div>
                <label className="text-xs">Company Name</label>
                <Input
                  name="companyName"
                  value={item.companyName}
                  onChange={(e) => handlechange(index, e)}
                />
              </div>

              <div>
                <label className="text-xs">City</label>
                <Input name="city" value={item.city} onChange={(e) => handlechange(index, e)} />
              </div>

              <div>
                <label className="text-xs">State</label>
                <Input
                  name="state"
                  value={item.state}
                  onChange={(e) => handlechange(index, e)}
                />
              </div>

              <div>
                <label className="text-xs">Start Date</label>
                <Input
                  type="date"
                  name="startDate"
                  value={item.startDate}
                  onChange={(e) => handlechange(index, e)}
                />
              </div>

              <div>
                <label className="text-xs">End Date</label>
                <Input
                  type="date"
                  name="endDate"
                  value={item.endDate}
                  onChange={(e) => handlechange(index, e)}
                />
              </div>

              <div>
                <label className="text-xs p-1">Currently Working</label>
                <input
                  type="checkbox"
                  checked={Boolean(item.currentlyWorking)}
                  onChange={(e) =>
                    handlechange(index, {
                      target: { name: 'currentlyWorking', value: e.target.checked }
                    })
                  }
                />
              </div>

              <div className="col-span-2">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-medium text-gray-700">Work Summary</label>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 border-primary text-primary"
                    onClick={() => generateByAI(index)}
                    disabled={generatingIndex !== null && generatingIndex !== index}
                  >
                    {generatingIndex === index ? (
                      <LoaderCircle className="w-4 h-4 animate-spin" />
                    ) : (
                      <Brain className="w-4 h-4" />
                    )}
                    Generate from AI
                  </Button>
                </div>

                <Editor
                  value={item.workSummary}
                  onTextChange={(e) =>
                    handlechange(index, { target: { name: 'workSummary', value: e.htmlValue } })
                  }
                  style={{ height: '200px' }}
                  className="rounded-md border border-primary"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={addnewexp} className="text-primary">
              + Add More Experience
            </Button>
            <Button
              variant="outline"
              onClick={removenewexp}
              className="text-primary"
              disabled={experiencelist.length === 1}
            >
              - Remove
            </Button>
          </div>

          <Button>Save</Button>
        </div>
      </div>
    </div>
  )
}

export default Experience
