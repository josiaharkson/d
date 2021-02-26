import { useState } from "react";
import getBlobDuration from "./getBlobDuration";

const useLocalAudioFile = () => {
  const [localAudioFileDuration, setLocalAudioFileDuration] = useState(0);
  const [localAudioFileUrl, setLocalAudioFileUrl] = useState(null);
  const [localAudioFile, setLocalAudioFile] = useState(null); // FOR UPLOAD

  const resetRecorder = () => {
    setLocalAudioFileDuration(0);
    setLocalAudioFileUrl(null);
    setLocalAudioFile(null);
  };

  const onChangeLocalAudioFile = async (event) => {
    var target = event.currentTarget;
    var file = target.files[0];
    const duration = await getBlobDuration(file);
    var seconds = parseInt(duration % 60);
    var minutes = parseInt((duration / 60) % 60);

    console.log({ file, minutes, seconds });

    console.log(file.type);

    if (minutes >= 2 && seconds > 0) {
      resetRecorder();
      return alert("Audio must not exceed 2 minutes");
    }

    setLocalAudioFile(file);

    if (target.files && file) {
      var reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = async (e) => {
        setLocalAudioFileUrl(e.target.result);
        setLocalAudioFileDuration(duration);
      };
    }
  };

  return [
    localAudioFileUrl,
    localAudioFile,
    onChangeLocalAudioFile,
    localAudioFileDuration,
    resetRecorder,
  ];
};

export default useLocalAudioFile;
