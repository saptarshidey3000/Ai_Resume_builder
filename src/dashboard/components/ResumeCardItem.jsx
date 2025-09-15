import { MoreVertical, Notebook, Edit3, Eye, Download, Trash2, Navigation } from 'lucide-react'
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import Globalapi from '@service/Globalapi';
import { toast } from 'sonner';


const ResumeCardItem = ({ resume, onResumeDeleted }) => {
  const data = resume.attributes || resume;
  const [open, setOpen] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const menuRef = useRef();
  

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

  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setOpen(false); // Close the dropdown menu
    setShowDeleteDialog(true); // Show confirmation dialog
  };

  const onDelete = async () => {
  setIsDeleting(true);
  try {
    console.log('Attempting to delete resume with ID:', resume.documentId);
    const resp = await Globalapi.Deleteresumebyid(resume.documentId);
    console.log('Delete response:', resp);
    
    // Close the dialog
    setShowDeleteDialog(false);
    
    // ✅ Show success toaster instead of alert
    toast.success("Resume deleted successfully!");

    // Call parent callback to refresh the list
    if (onResumeDeleted) {
      onResumeDeleted(resume.documentId);

    }

  } catch (error) {
    console.error('Error deleting resume:', error);

    let errorMessage = 'Failed to delete resume. ';
    if (error.response?.status === 405) {
      errorMessage += 'Method not allowed - please check the API endpoint configuration.';
    } else if (error.response?.status === 404) {
      errorMessage += 'Resume not found.';
    } else if (error.response?.status === 403) {
      errorMessage += 'You do not have permission to delete this resume.';
    } else {
      errorMessage += 'Please try again or contact support.';
    }

    // ✅ Show error toaster instead of alert
    toast.error(errorMessage);
  } finally {
    setIsDeleting(false);
  }
};

  const cancelDelete = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <div className="group relative">
        {/* Main Card Container */}
        <div
          className='relative p-8 h-[320px] flex flex-col items-center justify-center
          rounded-2xl overflow-hidden cursor-pointer
          transition-all duration-500 ease-out
          hover:scale-[1.02] hover:-translate-y-2 
          shadow-xl hover:shadow-2xl
          border border-white/20'
        >
          
          {/* Enhanced Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700"></div>
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-transparent to-cyan-500/20 
                         opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Premium Glass Effect */}
          <div className="absolute inset-0 bg-white/[0.08] backdrop-blur-xl"></div>

          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-0 left-0 w-full h-full 
                           bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1)_1px,transparent_1px)] 
                           bg-[length:24px_24px]"></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col items-center text-white w-full h-full">
            
            {/* Enhanced Dropdown Menu */}
            <div className="absolute top-1 right-1" ref={menuRef}>
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-xl bg-white/10 backdrop-blur-md 
                          transition-all duration-200 
                          border border-white/20 hover:bg-white/15 hover:border-white/30
                          shadow-lg"
              >
                <MoreVertical className="h-5 w-5 text-white/90 hover:text-white" />
              </button>

              {/* Dropdown Menu with Enhanced Styling */}
              {open && (
                <div
                  className="absolute right-0 mt-3 min-w-[12rem] backdrop-blur-xl 
                             text-gray-800 rounded-xl shadow-2xl py-2 z-30
                             border border-gray-200/50 animate-in slide-in-from-top-2 duration-200"
                >
                  {/* Edit Option */}
                  <Link
                    to={'/dashboard/resume/' + resume.documentId + "/edit"}
                    className="flex items-center gap-2 px-3 py-2 mx-auto my-1 rounded-lg
                               bg-white text-gray-700 shadow-sm w-fit hover:bg-gray-50"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span className="font-medium text-sm">Edit Resume</span>
                  </Link>

                  {/* View Option */}
                  <button 
                    onClick={() => navigate('/my-resume/' + resume.documentId + "/view")}
                    className="flex items-center gap-2 px-3 py-2 mx-auto my-1 rounded-lg
                               bg-white text-gray-700 shadow-sm w-fit hover:bg-gray-50"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="font-medium text-sm">View Resume</span>
                  </button>

                  {/* Download Option */}
                  <button
                    onClick={() => navigate('/my-resume/' + resume.documentId + "/view")}
                    className="flex items-center gap-2 px-3 py-2 mx-auto my-1 rounded-lg
                               bg-white text-gray-700 shadow-sm w-fit hover:bg-gray-50"
                  >
                    <Download className="h-4 w-4" />
                    <span className="font-medium text-sm">Download PDF</span>
                  </button>

                  {/* Divider */}
                  <div className="my-2 mx-4 border-t border-gray-200/60"></div>

                  {/* Delete Option */}
                  <button
                    onClick={handleDeleteClick}
                    className="flex items-center gap-2 px-3 py-2 mx-auto my-1 rounded-lg
                               bg-white text-red-500 shadow-sm w-fit hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="font-medium text-sm">Delete Resume</span>
                  </button>
                </div>
              )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center">
              
              {/* Enhanced Icon Container */}
              <div className="relative mb-6">
                {/* Pulsing Background Ring */}
                <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse scale-125"></div>
                
                {/* Main Icon Container */}
                <div className="relative p-6 rounded-full bg-white/15 backdrop-blur-sm shadow-2xl
                              transition-all duration-300 group-hover:rotate-6 group-hover:scale-110
                              border border-white/20">
                  <Notebook className="w-12 h-12 text-white drop-shadow-lg" />
                </div>
              </div>

              {/* Enhanced Title */}
              <h3 className="font-bold text-2xl text-center drop-shadow-lg tracking-wide
                           text-white/95 group-hover:text-white transition-colors duration-300
                           max-w-[250px] line-clamp-2 leading-tight">
                {data.Title}
              </h3>

              {/* Subtitle/Status */}
              <p className="text-white/70 text-sm mt-2 font-medium tracking-wide">
                Resume Template
              </p>
            </div>
          </div>

          {/* Enhanced Floating Elements & Glows */}
          <div className="absolute -bottom-12 -right-12 w-48 h-48 
                         bg-gradient-to-tr from-pink-400/30 to-purple-500/30 
                         rounded-full blur-3xl group-hover:blur-2xl
                         transition-all duration-500"></div>
          
          <div className="absolute -top-12 -left-12 w-48 h-48 
                         bg-gradient-to-br from-indigo-400/30 to-cyan-500/30 
                         rounded-full blur-3xl group-hover:blur-2xl
                         transition-all duration-500"></div>

          {/* Subtle Corner Highlights */}
          <div className="absolute top-0 left-0 w-32 h-32 
                         bg-gradient-to-br from-white/10 to-transparent 
                         rounded-2xl group-hover:from-white/20 
                         transition-all duration-500"></div>
          
          <div className="absolute bottom-0 right-0 w-32 h-32 
                         bg-gradient-to-tl from-white/10 to-transparent 
                         rounded-2xl group-hover:from-white/20 
                         transition-all duration-500"></div>

          {/* Border Highlight Effect */}
          <div className="absolute inset-0 rounded-2xl border-2 border-transparent 
                         bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-border
                         opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-red-100 rounded-full">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Resume</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete "<strong>{data.Title}</strong>"? This will permanently remove the resume from your account.
            </p>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                disabled={isDeleting}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 
                          transition-colors duration-200 disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={onDelete}
                disabled={isDeleting}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 
                          transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed
                          flex items-center gap-2"
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
          </div>
        </div>
      )}
    </>
  )
}

export default ResumeCardItem