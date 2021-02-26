import React from "react";

import IconButton from "@material-ui/core/IconButton";
// import AudiotrackIcon from "@material-ui/icons/Audiotrack";
// import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import EditIcon from "@material-ui/icons/Edit";

import styles from "./index.module.css";
import EditPopup from "./Popup";

function App({ myAudioUrl }) {
  console.log({ myAudioUrl });
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    setOpen(false);
  };

  return (
    <div>
      <div className={styles.question_wrapper}>
        <div className={styles.question_wrapper_question}>
          Tell me about a time when you listened to rap music?
        </div>
        <div className={styles.question_wrapper_audio_wrapper}>
          <audio src={""} controls className={styles.audio} />

          <IconButton onClick={handleOpen}>
            <EditIcon style={{ color: "#fff" }} />
          </IconButton>
        </div>
      </div>

      <EditPopup open={open} handleClose={handleClose} />
    </div>
  );
}

export default App;
