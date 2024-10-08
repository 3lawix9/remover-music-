"use client";

import { useEffect, useRef } from 'react';

interface ProcessedAudioProps {
  vocals: Blob | null;
  music: Blob | null;
}

export default function ProcessedAudio({ vocals, music }: ProcessedAudioProps) {
  const vocalsRef = useRef<HTMLAudioElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (vocals && vocalsRef.current) {
      vocalsRef.current.src = URL.createObjectURL(vocals);
    }
    if (music && musicRef.current) {
      musicRef.current.src = URL.createObjectURL(music);
    }
  }, [vocals, music]);

  if (!vocals || !music) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Processed Audio</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Vocals Only</h3>
          <audio ref={vocalsRef} controls className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Music Only</h3>
          <audio ref={musicRef} controls className="w-full">
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  );
}