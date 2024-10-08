"use client";

import { useState } from 'react';
import VideoUploader from '../components/VideoUploader';
import ProcessedAudio from '../components/ProcessedAudio';

export default function Home() {
  const [processedVocals, setProcessedVocals] = useState<Blob | null>(null);
  const [processedMusic, setProcessedMusic] = useState<Blob | null>(null);

  const handleProcessed = (vocals: Blob, music: Blob) => {
    setProcessedVocals(vocals);
    setProcessedMusic(music);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Video to Audio Converter</h1>
      <VideoUploader onProcessed={handleProcessed} />
      <ProcessedAudio vocals={processedVocals} music={processedMusic} />
    </div>
  );
}