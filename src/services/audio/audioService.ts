import { api } from "@/utils/api";
import { Dispatch, SetStateAction } from 'react';
import { Session } from 'next-auth';
import axios from 'axios';
import toast from 'react-hot-toast';

interface UploadAudioResponse {
  sentiment: string;
}

export const uploadAudio = async (
  blob: Blob,
  setAnalysisResult: Dispatch<SetStateAction<string | null>>,
  setUploading: Dispatch<SetStateAction<boolean>>,
  session: Session | null,
): Promise<void> => {
  setUploading(true);
  
  const formData = new FormData();
  formData.append('file', blob, 'audio_file.mp3');
  
  if (session) {
    const email = session.user?.email as string;
    try {
      const res = await axios.post("/api/user/email/", {
        email: email.toLowerCase(),
      });
      if (res.status === 404) {
        toast.error("User not found.");
        return;
      }

      const user = res.data;
      formData.append('user_id', user.id as string);
    } catch (error: any) {
      toast.error(error.message);
      return;
    }
  }

  try {
    const res = await api.post("/api/audios/", formData);
    if (res.status === 404) {
      toast.error("User not found.");
      return;
    }
    console.log("response", res);

    const data: UploadAudioResponse = res.data;
    setAnalysisResult(data.sentiment);
  } catch (error: any) {
    toast.error(error?.response.data);
  } finally {
    setUploading(false);
    toast.success("Audio uploaded successfully.");
  }
};
