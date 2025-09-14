import React, { useEffect, useState , useContext } from "react";
import { Input } from "@/components/ui/input";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import Globalapi from '@service/Globalapi'
import { useParams } from 'react-router-dom'

const Skills = () => {
  const [skilllist, setskilllist] = useState([{ name: "", rating: 0 }]);
  const [loading, setLoading] = useState(false)
  const { resumeinfo, setresumeinfo } = useContext(ResumeInfoContext)
  const {resumeid} = useParams();

  const handlechange = (index, field, value) => {
    const updatedList = [...skilllist];
    updatedList[index][field] = value;
    setskilllist(updatedList);
  };

  const addnewskill=()=>{
    setskilllist([...skilllist,{
       name: "", rating: 0 
    }])
  }
  const removeskill=()=>{
    setskilllist(skilllist=>skilllist.slice(0,-1))
  }
 const onSave = () => {
  setLoading(true);
  
  // Filter out empty skills and ensure proper data structure
  const validSkills = skilllist.filter(skill => skill.name && skill.name.trim() !== '');
  
  // Try different data structure options
  const data = {
    data: {
      Skills: validSkills.map(skill => ({
        name: skill.name.trim(),
        rating: parseInt(skill.rating) || 0
      }))
    }
  }
  
  // Alternative structure if the above doesn't work:
  // const data = {
  //   data: {
  //     skills: validSkills
  //   }
  // }
  
  console.log('Sending data to API:', JSON.stringify(data, null, 2)); // Debug log
  
  Globalapi.Updateresume(resumeid, data)
    .then(resp => {
      console.log('API Response:', resp);
      setLoading(false);
      toast('Details Updated');
    })
    .catch(error => {
      console.error('API Error:', error);
      setLoading(false);
      
      // More specific error handling
      if (error.response) {
        console.error('Error response:', error.response.data);
        toast(`Server Error: ${error.response.data?.error?.message || 'Unknown error'}`);
      } else if (error.request) {
        toast('Network Error: Unable to reach server');
      } else {
        toast('Error: ' + error.message);
      }
    });
}
  useEffect(()=>{
    setresumeinfo({
      ...resumeinfo,
      skills:skilllist
    })
  },[skilllist])
  

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your skills</p>
        <div>
          {skilllist.map((item, index) => (
            <div
              key={index}
              className="mb-4 flex items-center justify-between gap-6"
            >
              {/* Skill Input */}
              <div className="flex-1">
                <label className="text-xs block mb-1">Skill name</label>
                <Input
                  value={item.name}
                  onChange={(e) =>
                    handlechange(index, "name", e.target.value)
                  }
                />
              </div>

              {/* Rating Stars */}
              <div className="flex items-center mt-5">
                <Rating
                  initialRating={item.rating}
                  onChange={(v) => handlechange(index, "rating", v)}
                  emptySymbol={<FaStar size={24} color="#d1d5db" />} // gray
                  fullSymbol={<FaStar size={24} color="gold" />} // gold
                />
              </div>
            </div>
          ))}
        </div>
         <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                type="button"
                onClick={addnewskill}
                className="text-primary"
              >
                + Add Skills
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={removeskill}
                className="text-primary"
                disabled={skilllist.length === 1}
              >
                - Remove
              </Button>
            </div>

            <Button type="submit" disabled={loading} onClick={()=>onSave()}>
              {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
            </Button>
          </div>
      </div>
    </div>
  );
};

export default Skills;
