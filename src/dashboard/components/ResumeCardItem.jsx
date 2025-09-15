import { MoreVertical, Notebook, Edit3, Eye, Download } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Globalapi from '@service/Globalapi';
import { toast } from 'sonner';

const ResumeCardItem = ({ resume }) => {
  const data = resume.attributes || resume;
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(true); // Hide card after deletion
  const [showDeleteDialog, setShowDeleteDialog] = useState(false); // New state for UI dialog
  const menuRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onDelete = async () => {
    setIsDeleting(true);
    try {
      await Globalapi.Deleteresumebyid(resume.documentId);

      // Success toast
      toast.success("Resume deleted successfully!");

      // Hide card
      setIsVisible(false);
    } catch (error) {
      console.error('Error deleting resume:', error);
      let errorMessage = 'Failed to delete resume. ';
      if (error.response?.status === 405) {
        errorMessage += 'Method not allowed.';
      } else if (error.response?.status === 404) {
        errorMessage += 'Resume not found.';
      } else if (error.response?.status === 403) {
        errorMessage += 'No permission to delete.';
      } else {
        errorMessage += 'Please try again.';
      }

      // Error toast
      toast.error(errorMessage);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isVisible) return null; // Hide card after deletion

  return (
    <div className="group relative">
      <div
        className='relative p-8 h-[320px] flex flex-col items-center justify-center
        rounded-2xl overflow-hidden cursor-pointer
        transition-all duration-500 ease-out
        hover:scale-[1.02] hover:-translate-y-2 
        shadow-xl hover:shadow-2xl
        border border-white/20'
      >
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-cyan-500/20 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 bg-white/[0.08] backdrop-blur-xl"></div>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full 
                         bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] 
                         bg-[length:24px_24px]"></div>
        </div>

        <div className="relative z-10 flex flex-col items-center text-white w-full h-full">
          {/* Dropdown Menu */}
          <div className="absolute top-1 right-1" ref={menuRef}>
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-xl bg-white/10 backdrop-blur-md transition-all duration-200
                        border border-white/20 hover:bg-white/15 hover:border-white/30 shadow-lg"
            >
              <MoreVertical className="h-5 w-5 text-white/90 hover:text-white" />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 min-w-[12rem] backdrop-blur-xl 
                             text-gray-800 rounded-xl shadow-2xl py-2 z-30
                             border border-gray-200/50 animate-in slide-in-from-top-2 duration-200"
              >
                <Link
                  to={'/dashboard/resume/' + resume.documentId + "/edit"}
                  className="flex items-center gap-2 px-3 py-2 mx-auto my-1 rounded-lg
                             bg-white text-gray-700 shadow-sm w-fit hover:bg-gray-50"
                >
                  <Edit3 className="h-4 w-4" />
                  <span className="font-medium text-sm">Edit Resume</span>
                </Link>

                <button 
                  onClick={() => navigate('/my-resume/' + resume.documentId + "/view")}
                  className="flex items-center gap-2 px-3 py-2 mx-auto my-1 rounded-lg
                             bg-white text-gray-700 shadow-sm w-fit hover:bg-gray-50"
                >
                  <Eye className="h-4 w-4" />
                  <span className="font-medium text-sm">View Resume</span>
                </button>

                <button
                  onClick={() => navigate('/my-resume/' + resume.documentId + "/view")}
                  className="flex items-center gap-2 px-3 py-2 mx-auto my-1 rounded-lg
                             bg-white text-gray-700 shadow-sm w-fit hover:bg-gray-50"
                >
                  <Download className="h-4 w-4" />
                  <span className="font-medium text-sm">Download PDF</span>
                </button>

                <div className="my-2 mx-4 border-t border-gray-200/60"></div>

                {/* Delete Button */}
                <button
                  onClick={() => setShowDeleteDialog(true)}
                  disabled={isDeleting}
                  className="flex items-center gap-2 px-3 py-2 mx-auto my-1 rounded-lg
                             bg-white text-red-500 shadow-sm w-fit hover:bg-red-50
                             disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Deleting...
                    </>
                  ) : (
                    'Delete Resume'
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Resume Icon & Title */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse scale-125"></div>
              <div className="relative p-6 rounded-full bg-white/15 backdrop-blur-sm shadow-2xl
                            transition-all duration-300 group-hover:rotate-6 group-hover:scale-110
                            border border-white/20">
                <Notebook className="w-12 h-12 text-white drop-shadow-lg" />
              </div>
            </div>

            <h3 className="font-bold text-2xl text-center drop-shadow-lg tracking-wide
                         text-white/95 group-hover:text-white transition-colors duration-300
                         max-w-[250px] line-clamp-2 leading-tight">
              {data.Title}
            </h3>

            <p className="text-white/70 text-sm mt-2 font-medium tracking-wide">
              Resume Template
            </p>
          </div>
        </div>
      </div>

      {/* Custom Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-40">
          <div className="bg-white rounded-xl p-6 w-72 shadow-2xl flex flex-col items-center text-center">
            <h4 className="text-lg font-semibold mb-4">Confirm Delete</h4>
            <p className="text-sm text-gray-600 mb-6">Are you sure you want to delete this resume?</p>
            <div className="flex gap-4">
              <button
  onClick={async () => {
    await onDelete();
    setShowDeleteDialog(false);
  }}
  disabled={isDeleting}
  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-2 justify-center"
>
  {isDeleting ? (
    <>
      {/* Spinner */}
      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
      Deleting...
    </>
  ) : (
    'Delete'
  )}
</button>

              <button
                onClick={() => setShowDeleteDialog(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResumeCardItem
