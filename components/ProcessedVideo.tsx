"use client";

import { useEffect, useRef } from 'react';

export default function ProcessedVideo({ file }: { file: File | null }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (file && videoRef.current) {
      videoRef.current.src = URL.createObjectURL(file);
    }
  }, [file]);

  if (!file) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Processed Video (Simulated)</h2>
      <video ref={videoRef} controls className="w-full max-w-2xl mx-auto">
        Your browser does not support the video tag.
      </video>
      <p className="mt-4 text-center text-sm text-gray-500">
        Note: This is a simulation. The actual music removal process is not performed.
      </p>
    </div>
  );
}