import { useEffect, useState } from "react";
import getBlobDuration from "./getBlobDuration";

const useRecorder = () => {
  const [recordedUrl, setRecordedURL] = useState("");
  const [recordedFile, setRecordedFile] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [recordedDuration, setRecordedDuration] = useState(0);

  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    const rec = new MediaRecorder(stream);

    let audioChunks = [];
    rec.ondataavailable = e => {
      audioChunks.push(e.data);
      if (rec.state == "inactive") {
        let blob = new Blob(audioChunks, { type: "audio/mpeg-3" });
        setRecordedFile(blob);
      }
    };

    return rec;
  }

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
      console.log("start rec");
    } else {
      recorder.stop();
      console.log("stop rec");
    }

    // Obtain the audio when ready.
    const handleData = e => {
      setRecordedURL(URL.createObjectURL(e.data));

      const reader = new FileReader();

      let arrayBuffer;

      reader.onloadend = async () => {
        arrayBuffer = reader.result;

        const duration = await getBlobDuration(reader.result);
        var seconds = parseInt(duration % 60);
        var minutes = parseInt((duration / 60) % 60);
        setRecordedDuration(duration);
      };

      reader.readAsDataURL(e.data);
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const resetRecorder = () => {
    setRecordedURL("");
    setRecordedFile("");
    setIsRecording(false);
    setRecorder(null);
    setRecordedDuration(0);
    setIsRecording(false);
  };

  return [
    recordedUrl,
    recordedFile,
    isRecording,
    startRecording,
    stopRecording,
    recordedDuration,
    resetRecorder,
  ];
};

export default useRecorder;
