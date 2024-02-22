import React, { useEffect, useRef, useState } from "react";
import "../styles/Recorder.css";
import { formatTime } from "../utils/utils";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const Recorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [recordings, setRecordings] = useState([]);
  const audioChunks = useRef([]);
  const intervalRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunks.current.push(e.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/wav" });
        setRecordings((prev) => [...prev, audioBlob]);
        audioChunks.current = [];
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
      setIsRecording(true);
      setTimer(0);
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const pauseRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.pause();
      clearInterval(intervalRef.current);
      setIsRecording(false);
    }
  };

  const resumeRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "paused"
    ) {
      mediaRecorderRef.current.resume();
      setIsRecording(true);
      intervalRef.current = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state === "recording"
    ) {
      mediaRecorderRef.current.stop();
      clearInterval(intervalRef.current);
      setTimer(0);
      setIsRecording(false);
    }
  };

  useEffect(() => {
    return () => {
      stopRecording();
    };
  }, []);

  const handleSaveAudio = async (blob) => {
    try {
      const audioFirebaseRef = ref(
        storage,
        `audio/recording-${Date.now()}.wav`
      );
      await uploadBytes(audioFirebaseRef, blob);
      const downloadUrl = await getDownloadURL(audioFirebaseRef);
      console.log("Download URL:", downloadUrl);
    } catch (error) {
      console.log("Error uploading audio:", error.message);
    }
  };

  const handleClearAll = ()=>{
    setRecordings([])
  }

  return (
    <div className="recording-container">
      <div className="display-timer">
        <p>{formatTime(timer)}</p>
      </div>
      <div className="button-group">
        {((!isRecording && mediaRecorderRef?.current?.state === "inactive") || !mediaRecorderRef?.current?.state) && (
          <button className="start-btn" onClick={startRecording}>
            Start
          </button>
        )}
        {isRecording &&
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state === "recording" && (
            <button className="start-btn" onClick={pauseRecording}>
              Pause
            </button>
          )}
        {!isRecording &&
          mediaRecorderRef.current &&
          mediaRecorderRef.current.state === "paused" && (
            <button className="start-btn" onClick={resumeRecording}>
              Resume
            </button>
          )}
        {isRecording && (
          <button className="stop-btn" onClick={stopRecording}>
            Stop
          </button>
        )}
      </div>
      {recordings.length > 0 && <div className="clear-btn-container">
        <button className="clear-btn" onClick={handleClearAll}>Clear All</button>
      </div>}
      <div>
        {recordings.length > 0 &&
          recordings?.map((blob, index) => {
            return (
              <Audio
                key={index}
                blob={blob}
                handleSaveAudio={handleSaveAudio}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Recorder;

const Audio = ({ blob, handleSaveAudio }) => {
  return (
    <div className="audio-output">
      <audio src={URL.createObjectURL(blob)} controls></audio>
      <button className="save-btn" onClick={() => handleSaveAudio(blob)}>
        Save
      </button>
    </div>
  );
};
