/** biome-ignore-all lint/suspicious/noConsole: Just testing */
import { useRef, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

type RoomParams = {
  roomId: string;
};

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function';

export function RecordRoomAudio() {
  const params = useParams<RoomParams>();

  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);
  const audioStream = useRef<MediaStream | null>(null);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop();
    }

    if (audioStream.current) {
      for (const track of audioStream.current.getTracks()) {
        track.stop();
      }
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log('Gravação iniciada.');
    };

    recorder.current.onstop = () => {
      console.log('Gravação encerrada/pausada');
    };

    recorder.current.start();
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append('file', audio, 'audio.webm');

    const response = await fetch(
      `http://localhost:3333/rooms/${params.roomId}/audio`,
      {
        method: 'POST',
        body: formData,
      }
    );

    const result = await response.json();

    console.log(result);
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('O browser não suporta gravação.');
      return;
    }

    setIsRecording(true);

    audioStream.current = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    createRecorder(audioStream.current);

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();

      if (audioStream.current) {
        createRecorder(audioStream.current);
      }
    }, 5000);
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Parar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar áudio</Button>
      )}

      {isRecording ? <p>Gravando...</p> : <p>Pausado</p>}
    </div>
  );
}
