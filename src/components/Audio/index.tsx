"use client";

import React, { useState, useEffect } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import '../../styles/audio.css';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { AnalysisResult, uploadAudio } from '@/services/audio/audioService';
import Loader from '../Common/Loader';
import toast from 'react-hot-toast';

const AudioAnalyse: React.FC = () => {
  const [audios, setAudios] = useState<Blob[]>([]);
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult[] | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  const addAudioElement = async (blob: Blob): Promise<void> => {
    if (status !== "authenticated") {
      toast.error("Please first sign in to analyze audio.");
      router.push("/signin");
      return;
    }

    setAudios([...audios, blob]); // Add blob to audios state

    try {
      await uploadAudio(blob, setAnalysisResults, analysisResults, setUploading, session);
      console.log("Audio results.", analysisResults);
    } catch (error) {
      console.error(error);
      toast.error('Error uploading audio.');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (status !== "authenticated") {
      toast.error("Please first sign in to analyze audio.");
      router.push("/signin");
      return;
    }
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('audio/')) {
        setFileError(null);
        const blob = new Blob([file], { type: file.type });
        addAudioElement(blob);
      } else {
        setFileError('Invalid file type. Please upload an audio file.');
      }
    }
  };

  return (
    <section id="audio-record" className="relative py-20 md:py-[120px]">
      <div className="absolute left-0 top-0 -z-[1] h-full w-full dark:bg-dark"></div>
      <div className="absolute left-0 top-0 -z-[1] h-1/2 w-full bg-[#E9F9FF] dark:bg-dark-700 lg:h-[45%] xl:h-1/2"></div>
      <div className="container px-4">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-7/12 xl:w-8/12">
            <div className="ud-contact-content-wrapper">
              <div className="ud-contact-title mb-12 lg:mb-[150px]">
                <span className="mb-6 block text-base font-medium text-dark dark:text-white">
                  ANALYZE AUDIO
                </span>
                <h2 className="max-w-[260px] text-[35px] font-semibold leading-[1.14] text-dark dark:text-white">
                  Record/Upload & Analyze Your Audio
                </h2>
                <p className="text-lg leading-relaxed m-4 text-gray-600 dark:text-dark-6">
                  Use the recorder to capture your audio message. 
                </p>
                <p className="text-lg leading-relaxed m-4 text-gray-600 dark:text-dark-6">
                  Once you stop recording, your message will be automatically uploaded for sentiment analysis.
                </p>
                <p className="text-lg leading-relaxed m-4 text-gray-600 dark:text-dark-6">
                  Alternatively, you can upload an audio file for analysis.
                </p>
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-5/12 xl:w-4/12">
            <div
              className="wow fadeInUp rounded-lg bg-white px-8 py-10 shadow-testimonial dark:bg-dark-2 dark:shadow-none sm:px-10 sm:py-12 md:p-[60px] lg:p-10 lg:px-10 lg:py-12 2xl:p-[60px]"
              data-wow-delay=".2s"
            >
              <div>
                <AudioRecorder
                  onRecordingComplete={addAudioElement}
                  audioTrackConstraints={{ noiseSuppression: true, echoCancellation: true }}
                  mediaRecorderOptions={{ audioBitsPerSecond: 128000 }}
                  downloadFileExtension='mp3'
                />

                <div className="mt-4">
                  <input 
                    type="file" 
                    accept="audio/*" 
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-dark-3 dark:border-gray-600 dark:placeholder-gray-400"
                  />
                  {fileError && (
                    <p className="mt-2 text-sm text-red-600 dark:text-red-400">{fileError}</p>
                  )}
                </div>

                {uploading && (
                  <div className="flex w-full items-center justify-center 
                  rounded-md px-5 py-3 text-base text-white border border-primary bg-primary
                  transition duration-300 ease-in-out mt-4">
                    <strong>Processing</strong> <Loader />
                  </div>
                )}

                {analysisResults && (
                  <div id="audioContainer" className="grid gap-4 grid-cols-1">
                    {analysisResults.map((result, index) => (
                      <div key={index} className="p-4 bg-white bg-opacity-80 rounded-lg mx-auto" style={{ maxWidth: '400px', marginTop: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                        <audio
                          src={URL.createObjectURL(audios[index])}
                          controls
                          className="mb-2"
                          style={{ width: '100%' }}
                        />
                        <div className="text-center">
                          <span className={`font-bold ${result.sentiment === 'positive' ? 'text-green-600' : result.sentiment === 'negative' ? 'text-red-600' : 'text-yellow-600'}`}>
                            Analysis Result: {result.sentiment}
                          </span>
                          <p className="font-bold ml-1 text-cyan-700">Confidence Score: {(result.confidence_score).toFixed(2)}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AudioAnalyse;
