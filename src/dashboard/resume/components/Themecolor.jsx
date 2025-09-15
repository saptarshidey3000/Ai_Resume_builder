import React, { useState, useRef, useEffect, useContext } from 'react'
import { Button } from '@/components/ui/button'
import { LayoutGrid } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import Globalapi from '@service/Globalapi'
import { toast } from 'sonner'

const Themecolor = () => {
  const [open, setOpen] = useState(false)
  const popoverRef = useRef(null)

  const colors = [
    "#1A1A1A", // Dark Charcoal
    "#2C3E50", // Navy Blue
    "#34495E", // Slate Gray
    "#800000", // Maroon
    "#2E8B57", // Dark Green
    "#652edb", // Purple
  ]

  const { resumeinfo, setresumeinfo } = useContext(ResumeInfoContext);
  const {resumeid}=useParams();

 const oncolorselect = (color) => {
  const payload = {
    data: {
      themeColor: color,
    },
  }

  Globalapi.Updateresume(resumeid, payload)
    .then(resp => {
      setresumeinfo({
        ...resumeinfo,
        themeColor: color,
      })
      setOpen(false)
      toast.success("Theme Color Updated")
    })
    .catch(err => {
      console.error("Failed to update theme color:", err.response?.data || err)
      toast.error("Failed to update theme color")
    })
}



  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block" ref={popoverRef}>
      {/* Trigger using your Button */}
      <Button
        variant="outline"
        size="sm"
        className="flex gap-2"
        onClick={() => setOpen(!open)}
      >
        <LayoutGrid /> Theme
      </Button>

      {/* Popover content */}
      {open && (
        <div className="absolute z-50 mt-2 w-64 rounded-lg border bg-white shadow-lg p-3">
          <div className="grid grid-cols-5 gap-2">
            {colors.map((color, idx) => (
              <button
                key={idx}
                style={{ backgroundColor: color }}
                onClick={() => oncolorselect(color)} // ✅ fixed
                className="w-8 h-8 rounded-full border border-gray-300 hover:scale-110 transition"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Themecolor
