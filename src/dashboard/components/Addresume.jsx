import { Loader2, PlusSquareIcon } from 'lucide-react';
import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import Globalapi from '../../../service/Globalapi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';

const Addresume = () => {
  const [opendial, setopendial] = useState(false);
  const [resumetitle, setresumetitle] = useState("");
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigate();

  const onCreate = async () => {
    setloading(true);
    setError("");

    try {
      // Validate user data first
      if (!user?.primaryEmailAddress?.emailAddress) {
        throw new Error("User email not available. Please make sure you're logged in.");
      }

      const uuid = uuidv4();

      // Use the EXACT field names from your Strapi content type
      const data = {
        data: {
          Title: resumetitle.trim(),  // Capital T - match your Strapi field exactly
          resumeid: uuid,
          mail: user.primaryEmailAddress.emailAddress,
          name: user.fullName || user.firstName || "Unknown User"
        }
      };

      console.log('Creating resume with data:', data);

      const response = await Globalapi.CreatenewResume(data);
      console.log('Resume created successfully:', response);
      console.log(response.data.data.documentId)
      if (response) {
        navigation('/dashboard/resume/' + response.data.data.documentId + "/edit");
        // Close dialog and reset form on success
        setopendial(false);
        setresumetitle("");
      }

    } catch (error) {
      console.error('Error creating resume:', error);

      // Handle Strapi-specific error responses
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        if (errorData?.error?.details?.errors) {
          // Strapi validation errors
          const validationErrors = errorData.error.details.errors;
          const errorMessages = validationErrors.map(err => `${err.path}: ${err.message}`).join(', ');
          setError(`Validation error: ${errorMessages}`);
        } else if (errorData?.error?.message) {
          setError(`Strapi error: ${errorData.error.message}`);
        } else {
          setError("Invalid data. Please check all fields and try again.");
        }
      } else if (error.response?.status === 401) {
        setError("Authentication failed. Please check your API key.");
      } else if (error.response?.status === 403) {
        setError("Permission denied. Check your API token permissions.");
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Failed to create resume. Please try again.");
      }
    } finally {
      setloading(false);
    }
  };

  return (
    <>
      <div
        className='p-14 py-24 border items-center
        flex justify-center bg-secondary
        rounded-lg h-[280px]
        hover:scale-105 transition-all hover:shadow-md cursor-pointer'
        onClick={() => setopendial(true)}
      >
        <PlusSquareIcon />
      </div>

      <AlertDialog open={opendial} onOpenChange={setopendial}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Create a New Resume</AlertDialogTitle>
            <AlertDialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. Full Stack Resume"
                value={resumetitle}
                onChange={(e) => setresumetitle(e.target.value)}
              />
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex justify-center gap-5">
            <Button onClick={() => {
              setopendial(false);
              setError("");
              setresumetitle("");
            }}>
              Cancel
            </Button>
            <Button
              disabled={!resumetitle.trim() || loading}
              onClick={onCreate}
            >
              {loading ? <Loader2 className='animate-spin' /> : 'Create'}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default Addresume;
