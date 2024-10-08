"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { processVideo } from '@/lib/audioProcessing';

export default function VideoUploader({ onProcessed }: { onProcessed: (vocals: Blob, music: Blob) => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleProcess = async () => {
    if (!file) return;

    setProcessing(true);
    try {
      const { vocals, music } = await processVideo(file);
      onProcessed(vocals, music);
    } catch (error) {
      console.error('Error processing video:', error);
      alert('An error occurred while processing the video. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="mb-8">
      <Label htmlFor="video-upload">Upload MP4 Video</Label>
      <Input
        id="video-upload"
        type="file"
        accept=".mp4"
        onChange={handleFileChange}
        className="mb-4"
      />
      <Button onClick={handleProcess} disabled={!file || processing}>
        {processing ? 'Processing...' : 'Process Video'}
      </Button>
    </div>
  );
}