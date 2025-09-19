import React, { useEffect, useState, useContext, useCallback } from "react";
import { Input } from "@/components/ui/input";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import Globalapi from "@service/Globalapi";
import { useParams } from "react-router-dom";

const Skills = () => {
  const [skilllist, setSkilllist] = useState([{ name: "", rating: 0 }]);
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const { resumeinfo, setresumeinfo } = useContext(ResumeInfoContext);
  const { resumeid } = useParams();

  // Initialize skills from resumeinfo
  useEffect(() => {
    if (!isInitialized && resumeinfo) {
      if (resumeinfo.skills && resumeinfo.skills.length > 0) {
        setSkilllist(resumeinfo.skills);
      }
      setIsInitialized(true);
    }
  }, [resumeinfo, isInitialized]);

  const handleChange = (index, field, value) => {
    const updatedList = [...skilllist];
    updatedList[index][field] = value;
    setSkilllist(updatedList);
  };

  const addNewSkill = () => {
    setSkilllist([...skilllist, { name: "", rating: 0 }]);
  };

  const removeSkill = () => {
    if (skilllist.length > 1) {
      setSkilllist(skilllist.slice(0, -1));
    }
  };

  const onSave = () => {
    setLoading(true);

    const validSkills = skilllist.filter(
      (skill) => skill.name && skill.name.trim() !== ""
    );

    const data = {
      data: {
        skills: validSkills.map((skill) => ({
          name: skill.name.trim(),
          rating: Number(skill.rating) || 0,
        })),
      },
    };

    console.log("Sending data to API:", JSON.stringify(data, null, 2));

    Globalapi.Updateresume(resumeid, data)
      .then((resp) => {
        console.log("API Response:", resp);
        setLoading(false);
        toast("Skills Updated");

        // Update context immediately
        setresumeinfo((prev) => ({
          ...prev,
          skills: validSkills, // duplicate removed
        }));
      })
      .catch((error) => {
        console.error("API Error:", error);
        setLoading(false);
        toast("Error saving skills: " + (error?.message || "Unknown error"));
      });
  };

  // Debounced context update for live preview
  const updateContext = useCallback(() => {
    if (isInitialized) {
      setresumeinfo((prev) => ({
        ...prev,
        skills: skilllist,
      }));
    }
  }, [skilllist, setresumeinfo, isInitialized]);

  useEffect(() => {
    const timeoutId = setTimeout(() => updateContext(), 300);
    return () => clearTimeout(timeoutId);
  }, [updateContext]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Skills</h2>
        <p>Add your skills and rate them</p>

        {skilllist.map((item, index) => (
          <div
            key={index}
            className="mb-4 flex flex-col md:flex-row items-center justify-between gap-6"
          >
            {/* Skill Input */}
            <div className="flex-1">
              <label className="text-xs block mb-1">Skill name</label>
              <Input
                value={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>

            {/* Rating Stars */}
            <div className="flex items-center mt-3 md:mt-0">
              <Rating
                fractions={1} // allows half stars
                emptySymbol={<FaStar size={24} color="#d1d5db" />}
                fullSymbol={<FaStar size={24} color="gold" />}
                placeholderSymbol={<FaStar size={24} color="#fde68a" />}
                initialRating={item.rating}
                onChange={(v) => handleChange(index, "rating", v)}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-between mt-4">
          <div className="flex gap-2">
            <Button variant="outline" type="button" onClick={addNewSkill}>
              + Add Skill
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={removeSkill}
              disabled={skilllist.length === 1}
            >
              - Remove
            </Button>
          </div>

          <Button type="submit" disabled={loading} onClick={onSave}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Skills;
