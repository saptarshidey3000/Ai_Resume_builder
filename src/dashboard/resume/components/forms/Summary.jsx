import React, { useContext, useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import Globalapi from '@service/Globalapi'
import { Brain, LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { GoogleGenerativeAI } from "@google/generative-ai";


const apikey = import.meta.env.VITE_GEMINI_API
const genAI = new GoogleGenerativeAI(apikey)

function Summary({ enablenext }) {
  const { resumeinfo, setresumeinfo } = useContext(ResumeInfoContext)
  const [summary, setsummary] = useState(resumeinfo?.summary || '')
  const [loading, setLoading] = useState(false)
  const [generating, setGenerating] = useState(false)
  const params = useParams()

  // ✅ Generate AI summary
  const Generatesummary = async () => {
    if (!resumeinfo?.jobTitle) {
      toast.error('Please add Job Title first')
      return
    }
    try {
      setGenerating(true)
      const prompt = `Job title: ${resumeinfo.jobTitle}. Based on this job title, generate a professional resume summary in 4-5 lines.`

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent(prompt)

      const text = result.response.text()
      setsummary(text)
      setresumeinfo({ ...resumeinfo, summary: text })
      enablenext(true)
    } catch (error) {
      console.error(error)
      toast.error('AI generation failed')
    } finally {
      setGenerating(false)
    }
  }

  // sync context when summary changes
  useEffect(() => {
    if (summary && summary.trim() !== '') {
      setresumeinfo({
        ...resumeinfo,
        summary: summary,
      })
      enablenext(true)
    } else {
      enablenext(false)
    }
  }, [summary])

  useEffect(() => {
    if (resumeinfo?.summary) {
      setsummary(resumeinfo.summary)
    }
  }, [resumeinfo])

  // ✅ Save to Strapi
  const onSave = (e) => {
    e.preventDefault()
    setLoading(true)
    const data = {
      data: {
        summary: summary,
      },
    }
    Globalapi.Updateresume(params.resumeid, data).then(
      (resp) => {
        console.log(resp)
        enablenext(true)
        setLoading(false)
        toast('Details Updated')
      },
      (error) => {
        setLoading(false)
      }
    )
  }

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 m-t-10">
        <h2 className="font-bold text-lg">Summary</h2>
        <p>Add summary for your Job Title</p>
        <form className="mt-5" onSubmit={onSave}>
          <div className="flex justify-between items-end">
            <label htmlFor="">Add summary</label>
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="border-primary text-primary flex gap-2"
              onClick={Generatesummary}
              disabled={generating}
            >
              {generating ? (
                <LoaderCircle className="h-4 w-4 animate-spin" />
              ) : (
                <Brain className="h-4 w-4" />
              )}
              Generate Summary with AI
            </Button>
          </div>
<Textarea
  className="mt-5 resize-none"
  rows={6} // adjust rows as needed
  required
  value={summary}
  onChange={(e) => setsummary(e.target.value)}
/>


          <div className="mt-2 justify-end">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Summary
