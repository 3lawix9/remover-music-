export async function processVideo(videoFile: File): Promise<{ vocals: Blob; music: Blob }> {
  const formData = new FormData();
  formData.append('video', videoFile);

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/process-video`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to process video');
  }

  const result = await response.json();

  const vocalsResponse = await fetch(result.vocals);
  const musicResponse = await fetch(result.music);

  const vocals = await vocalsResponse.blob();
  const music = await musicResponse.blob();

  return { vocals, music };
}