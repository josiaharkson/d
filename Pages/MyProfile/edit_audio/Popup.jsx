import React from "react";
import axios from "axios";
import dotenv from "dotenv";
import { makeStyles } from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MicIcon from "@material-ui/icons/Mic";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import StopIcon from "@material-ui/icons/Stop";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import AudiotrackIcon from "@material-ui/icons/Audiotrack";
import useRecorder from "./useRecorder";
import useLocalAudioFile from "./useLocalAudioFile";
import styles from "./index.module.css";
import CircularProgress from "@material-ui/core/CircularProgress";

import classes from "./index.module.css";
dotenv.config();

const BASE_URL = process.env.REACT_APP_URL;
const useStyles = makeStyles({
  root: {
    "& .MuiDialog-paperScrollPaper": {
      margin: 10,
      position: "relative",
      width: "100%",
      height: 300,
      maxHeight: 300,
    },
  },

  close_btn: {
    color: "black",
  },

  start_btn: {},
  stop_btn: {},
});

const FormatAudioDuration = ({ d }) => {
  var seconds = parseInt(d % 60);
  var minutes = parseInt((d / 60) % 60);

  return (
    <span>
      {minutes} minutes, {seconds} seonds
    </span>
  );
};

export default function SimpleDialog(props) {
  const userToken = () => localStorage.getItem("birddieUserToken");
  const classes = useStyles();
  const { handleClose, open } = props;
  const [view, setView] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);

  const [
    recordedUrl,
    recordedFile,
    isRecording,
    startRecording,
    stopRecording,
    recordedDuration,
    resetRecorder,
  ] = useRecorder();

  const [
    localAudioFileUrl,
    localAudioFile,
    onChangeLocalAudioFile,
    localAudioFileDuration,
    resetAudioFile,
  ] = useLocalAudioFile();

  const CLOUDINARY_CLOUD_NAME = "dtkagtqlt";
  const CLOUDINARY_CREDENTIALS = {
    UPLOAD_PRESET: "birdieImages",
    UPLOAD_URL: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/video/upload`,
    API_SECRET: "EuScKQvRGVPgsVuSImoOPVf-vJA",
  };

  const {
    UPLOAD_PRESET,
    UPLOAD_URL,
    DELETE_URL,
    API_SECRET,
  } = CLOUDINARY_CREDENTIALS;

  const onHandleClose = () => {
    resetRecorder();
    resetAudioFile();
    handleClose();
  };

  const onUpload = type => {
    setIsLoading(true);
    console.log({
      recordedFile,
      localAudioFile,
      type,
    });

    if (type === "file")
      uploadAudioFile({
        file: localAudioFile,
        UPLOAD_PRESET,
        UPLOAD_URL,
        BASE_URL,
        userToken: userToken(),
        setIsLoading,
        onHandleClose,
      });
    if (type === "rec")
      uploadNAudioRecorded({
        file: recordedFile,
        UPLOAD_PRESET,
        UPLOAD_URL,
        BASE_URL,
        userToken: userToken(),
        API_SECRET,
        setIsLoading,
        onHandleClose,
      });
  };

  return (
    <Dialog
      onClose={onHandleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      classes={{ root: classes.root }}
    >
      <div className={styles.nav}>
        <div>
          <div
            className={
              view === 0 ? styles.active_nav_btn : styles.inactive_nav_btn
            }
            onClick={() => {
              if (isLoading) return;
              setView(0);
              stopRecording();
              resetRecorder();
              resetAudioFile();
            }}
          >
            <MicIcon />
            <span style={{ marginLeft: 5 }}>Record</span>
          </div>{" "}
          <div
            className={
              view === 1 ? styles.active_nav_btn : styles.inactive_nav_btn
            }
            onClick={() => {
              if (isLoading) return;
              setView(1);
              resetRecorder();
              resetAudioFile();
            }}
          >
            <CloudUploadIcon />
            <span style={{ marginLeft: 5 }}>Upload</span>
          </div>
        </div>

        <IconButton className={classes.close_btn} onClick={onHandleClose}>
          <CloseIcon />
        </IconButton>
      </div>

      <div className={styles.dialog}>
        {view === 0 ? (
          <div>
            <audio src={recordedUrl} controls className={styles.audio} />
            <div className={styles.rec_buttons}>
              <div>
                <IconButton
                  className={classes.start_btn}
                  onClick={startRecording}
                  disabled={isRecording}
                >
                  <PlayCircleOutlineIcon />
                </IconButton>
                <span>Start</span>
              </div>
              <div>
                <IconButton
                  className={classes.stop_btn}
                  onClick={stopRecording}
                  disabled={!isRecording}
                >
                  <StopIcon />
                </IconButton>

                <span>Stop</span>
              </div>
            </div>
            <p className={styles.duration}>
              Duration Rec: <FormatAudioDuration d={recordedDuration} />
            </p>

            <Button
              variant="outlined"
              onClick={() => {
                onUpload("rec");
              }}
              size="small"
              disabled={!recordedFile || isLoading}
            >
              {isLoading && <CircularProgress size={20} />}
              {!isLoading && "SAVE"}
            </Button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              onChange={event => onChangeLocalAudioFile(event)}
              id="audio_input"
              className={styles.audio_input}
              accept="audio/mp3,audio/*;capture=microphone"
            />

            {isLoading && (
              <label className={styles.select_audio}>
                <AudiotrackIcon /> <span>Select audio</span>
              </label>
            )}

            {!isLoading && (
              <label htmlFor="audio_input" className={styles.select_audio}>
                <AudiotrackIcon /> <span>Select audio</span>
              </label>
            )}

            <audio src={localAudioFileUrl} controls />
            <p className={styles.duration}>
              Duration Rec: <FormatAudioDuration d={localAudioFileDuration} />
            </p>

            <Button
              variant="outlined"
              onClick={() => {
                onUpload("file");
              }}
              disabled={!localAudioFile || isLoading}
              size="small"
            >
              {isLoading && <CircularProgress size={20} />}
              {!isLoading && "SAVE"}
            </Button>
          </div>
        )}
      </div>
    </Dialog>
  );
}

function uploadAudioFile({
  file,
  UPLOAD_PRESET,
  UPLOAD_URL,
  BASE_URL,
  userToken,
  setIsLoading,
  onHandleClose,
}) {
  console.log({ file, UPLOAD_PRESET, UPLOAD_URL, BASE_URL, userToken });

  if (!file) return alert("No audio has been selected or recorded!");
  // Initial FormData
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("timestamp", (Date.now() / 1000) | 0);

  // Make an AJAX upload request using Axios to cloudinary
  return axios
    .post(UPLOAD_URL, formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
    .then(async response => {
      console.log(response.data);

      const { public_id, secure_url } = response.data;

      try {
        const data = { audio: [{ public_id, secure_url }] };
        console.log({ data });

        const res = await axios.put(
          `${BASE_URL}/user/upload/audio?token=${userToken}`,
          data
        );

        console.log(res.data);

        alert("Success");
        setIsLoading(false);
        onHandleClose();
      } catch (error) {
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);
        setIsLoading(false);
      }
    });
}

function uploadNAudioRecorded({
  file,
  UPLOAD_PRESET,
  UPLOAD_URL,
  BASE_URL,
  userToken,
  setIsLoading,
  onHandleClose,
}) {
  console.log({ file, UPLOAD_PRESET, UPLOAD_URL, BASE_URL, userToken });
  if (!file) return alert("No audio has been selected or recorded!");

  // Initial FormData
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  // Make an AJAX upload request using Axios to cloudinary
  return axios
    .post(UPLOAD_URL, formData, {
      headers: { "X-Requested-With": "XMLHttpRequest" },
    })
    .then(async response => {
      const { public_id, secure_url } = response.data;

      try {
        const data = { audio: [{ public_id, secure_url }] };

        console.log({ data });
        const res = await axios.put(
          `${BASE_URL}/user/upload/audio?token=${userToken}`,
          data
        );

        alert("Success");
        setIsLoading(false);
        onHandleClose();
      } catch (error) {
        console.log(error);
        console.log(error.response);
        console.log(error.response.data);
        setIsLoading(false);
      }
    });
}
