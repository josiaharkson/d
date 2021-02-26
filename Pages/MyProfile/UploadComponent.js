import React, { useState } from "react";
import axios from "axios";
import Styles from "./upload.module.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";

import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import dotenv from "dotenv";
import CloseIcon from "@material-ui/icons/Close";

import LoaderComp from "../../Components/LoadingComponent/index";
import signatureBuider from "../../Utils/SignRequest";
import CircularProgress from "@material-ui/core/CircularProgress";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

dotenv.config();

const BASE_URL = process.env.REACT_APP_URL;

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "fixed",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  iconbtna: {
    position: "absolute",
    bottom: -1,
    right: -1,
    color: "#813d3d",
    "& label": {
      margin: 0,
      padding: 0,
    },
  },
  iconbtnb: {
    position: "absolute",
    bottom: -1,
    right: -1,
    color: "#813d3d",
    background: "#fff",
  },
  dialog: {
    "& .MuiDialog-paperScrollPaper": {
      margin: 10,
      paddingBottom: 40,
      background: "rgb(14 14 14 / 97%)",
    },
  },
}));
const CLOUDINARY_CLOUD_NAME = "dtkagtqlt";
const CLOUDINARY_CREDENTIALS = {
  UPLOAD_PRESET: "birdieImages",
  UPLOAD_URL: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
  DELETE_URL: `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`,
  API_SECRET: "EuScKQvRGVPgsVuSImoOPVf-vJA",
};

const {
  UPLOAD_PRESET,
  UPLOAD_URL,
  DELETE_URL,
  API_SECRET,
} = CLOUDINARY_CREDENTIALS;

const defaultObject = {
  0: {
    id: 0,
    url: null,
    file: null,
    public_id: null,
    isUploadedSuccess: null,
    isDeleting: null,
  },
  1: {
    id: 1,
    url: null,
    file: null,
    public_id: null,
    isUploadedSuccess: null,
    isDeleting: null,
  },
  2: {
    id: 2,
    url: null,
    file: null,
    public_id: null,
    isUploadedSuccess: null,
    isDeleting: null,
  },
  3: {
    id: 3,
    url: null,
    file: null,
    public_id: null,
    isUploadedSuccess: null,
    isDeleting: null,
  },
  4: {
    id: 4,
    url: null,
    file: null,
    public_id: null,
    isUploadedSuccess: null,
    isDeleting: null,
  },
  5: {
    id: 5,
    url: null,
    file: null,
    public_id: null,
    isUploadedSuccess: null,
    isDeleting: null,
  },
};

const setImgArray = (photos) => {
  const x = defaultObject;

  if (!photos) return x;

  if (!photos.length) return x;

  photos.map((photo, id) => {
    x[id] = { id, file: null, ...photo };
  });

  return x;
};

function App({ photos, updateUserInfo }) {
  const userToken = () => localStorage.getItem("birddieUserToken");

  // Handle open/ close dialog grid
  const [openDialog, setOpenDialog] = React.useState(false);

  const [myImages, setMyImages] = React.useState(defaultObject);

  // Check if user deletes/removes or adds any image
  const [didMakeChanges, setDidMakeChanges] = React.useState(false);

  const onChangeImage = (event) => {
    let file = event.target.files[0];

    const fileSizeInMB = parseInt(file.size) / 1024 / 1024;
    const fileSize = fileSizeInMB.toFixed(2);
    const MAX = 4;
    console.log({ fileSize: fileSize + " mb" });

    if (fileSize > MAX) return alert("Image must not exceed 4 MB!");
    const data = { ...myImages };

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      data[event.target.name] = {
        ...data[event.target.name],
        file,
        url: [reader.result],
      };
      setMyImages(data);
      setDidMakeChanges(true);
      uploadNewImage({
        item_id: parseInt(event.target.name),
        myImages,
        setMyImages,
        UPLOAD_URL,
        UPLOAD_PRESET,
        file,
        BASE_URL,
        userToken,
      });
    };
  };

  const onRemoveImage = (item_id) => {
    // Set image Deleting ICON to start motion
    setMyImages((x) => ({
      ...x,
      [item_id]: { ...myImages[item_id], isDeleting: true },
    }));

    setDidMakeChanges(true);
    // Make request to delete from cloud and database
    deleteExistingImage({
      userToken,
      myImages,
      DELETE_URL,
      BASE_URL,
      public_id: myImages[item_id].public_id,
      API_SECRET,
      item_id,
      setMyImages,
    });
  };

  const onHandleClose = () => {
    // return console.log({ didMakeChanges });

    if (didMakeChanges) {
      updateUserInfo();
    }
    setOpenDialog(false);
    setMyImages(setImgArray(photos));
  };

  React.useEffect(() => {
    if (photos) {
      setMyImages(setImgArray(photos));
    }
  }, [photos]);

  return (
    <main className={Styles.App}>
      <Button
        variant="contained"
        onClick={() => setOpenDialog(true)}
        startIcon={<EditIcon />}
        style={{ fontSize: 11 }}
      >
        Add/Remove Photos
      </Button>

      <FullScreenDialog
        open={openDialog}
        handleClose={() => {
          onHandleClose();
        }}
        myImages={myImages}
        onChangeImage={onChangeImage}
        onRemoveImage={onRemoveImage}
      />
    </main>
  );
}

App.defaultProps = {
  photos: [],
};

export default App;

const FullScreenDialog = ({
  open,
  handleClose,
  isloading,
  myImages,
  onChangeImage,
  onRemoveImage,
}) => {
  const classes = useStyles();
  return (
    <Dialog
      classes={{ root: classes.dialog }}
      open={open}
      onClose={handleClose}
    >
      {isloading && <LoaderComp />}

      <div
        style={{
          width: "100%",
          display: "flex",
          padding: 10,
          justifyContent: "flex-start",
        }}
      >
        <Button
          color="inherit"
          onClick={handleClose}
          variant="contained"
          startIcon={<CloseIcon />}
          style={{ color: "black" }}
        >
          Go back
        </Button>
      </div>

      <div className={Styles.body}>
        {Object.keys(myImages).map((x) => (
          <ImageCard
            key={Math.random()}
            item={myImages[x]}
            onChangeImage={onChangeImage}
            onRemoveImage={onRemoveImage}
          />
        ))}
      </div>
    </Dialog>
  );
};

const ImageCard = ({ item, onChangeImage, onRemoveImage }) => {
  const classes = useStyles();
  const id = `image_no_${item.id}`;

  // CHECKS
  const isUploading = item.file && !item.public_id ? true : false;
  const isUploadedSuccess = item.isUploadedSuccess ? true : false;
  const isDeleting = item.isDeleting ? true : false;

  return (
    <div
      className={Styles.card}
      style={{
        backgroundImage: `url(${item.url})`,
      }}
    >
      {isUploading && (
        <div className={Styles.loader}>
          <CircularProgress size={18} color="inherit" />
        </div>
      )}

      {isUploadedSuccess && (
        <div className={Styles.uploadSuccessIcon}>
          <CheckCircleOutlineIcon size={18} color="inherit" />
        </div>
      )}

      {isDeleting && (
        <div className={Styles.deleting}>
          <div>Deleting...</div> <CircularProgress size={12} color="inherit" />
        </div>
      )}

      {!isUploading && !isDeleting ? (
        <>
          {!item.url ? (
            <IconButton size="small" className={classes.iconbtna}>
              <label htmlFor={id}>
                <AddIcon />
              </label>
            </IconButton>
          ) : (
            <IconButton
              size="small"
              className={classes.iconbtnb}
              onClick={() => onRemoveImage(item.id)}
            >
              <DeleteIcon style={{ background: "#fff" }} />
            </IconButton>
          )}
        </>
      ) : null}
      <input
        type="file"
        accept="image/x-png,image/gif,image/jpeg"
        id={id}
        hidden={true}
        name={item.id}
        onChange={(event) => onChangeImage(event)}
      />
    </div>
  );
};

function uploadNewImage({
  item_id,
  myImages,
  setMyImages,
  UPLOAD_URL,
  UPLOAD_PRESET,
  file,
  BASE_URL,
  userToken,
}) {
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
    .then(async (response) => {
      const data = response.data;
      const url = data.secure_url;

      const public_id = data.public_id;

      // The array of picture urls to be sent back to the server / database
      const results = [];
      // Add the newly uploaded image url to the result array
      results.push({
        url,
        public_id,
      });

      // CHECK FOR IMAGES THAT ALREADY EXIST IN THE DATABASE AND WERE NOT DELETED/REMOVED BY USER AND ADD TO
      // THE results array SO THAT WHEN THE NEW PHOTOS ARE ADDED THEIR URLS ARE ALSO ADDED TO THE  results array
      // TOGETHER WITH IMAGES THAT ALREADY EXIST IN THE DATABASE AND WERE NOT DELETED/REMOVED
      Object.keys(myImages).map((image) => {
        // First make sure the new item is not duplicated unnessesrily
        if (parseInt(myImages[image].id) !== parseInt(item_id)) {
          if (myImages[image].public_id)
            results.unshift({
              url: myImages[image].url,
              public_id: myImages[image].public_id,
            });
        }
      });

      try {
        const data = { photos: [...results] };
        const res = await axios.put(
          `${BASE_URL}/user/upload?token=${userToken()}`,
          data
        );
        // Add the newly uploaded image to the myImages object on the client side
        const newFile = {
          id: item_id,
          file: null,
          url,
          public_id,
          isUploadedSuccess: true,
          isDeleting: null,
        };
        setMyImages((x) => ({ ...x, [item_id]: newFile }));
      } catch (error) {
        console.log(error);

        // Add the newly uploaded image to the myImages object on the client side
        const newFile = {
          id: item_id,
          file: null,
          url,
          public_id,
          isUploadedSuccess: true,
          isDeleting: null,
        };
        setMyImages((x) => ({ ...x, [item_id]: newFile }));
      }
    });
}

function deleteExistingImage({
  userToken,
  myImages,
  DELETE_URL,
  BASE_URL,
  public_id,
  API_SECRET,
  item_id,
  setMyImages,
}) {
  const timestamp = Date.now() / 1000;
  const signature = signatureBuider({ timestamp, public_id }, API_SECRET);

  // SEND Delete REQUEST TO CLOUDINARY
  axios({
    url: DELETE_URL,
    method: "post",
    params: {
      timestamp,
      public_id,
      api_key: "143172111454658",
      signature,
    },
  }).then(async () => {
    // FETCH LIST OF AVAILABLE IMAGES THAT ARE NOT DELETED
    // THESE WILL BE UPDATED IN THE DATABASE
    const results = [];

    Object.keys(myImages).map((image) => {
      // First make sure the deleted item is not added to the data to be sent to the database
      if (parseInt(myImages[image].id) !== parseInt(item_id)) {
        if (myImages[image].public_id)
          results.unshift({
            url: myImages[image].url,
            public_id: myImages[image].public_id,
          });
      }
    });

    const data = { photos: [...results] };

    try {
      // SEND UPLOAD REQUEST TO BACKEND
      const res = await axios.put(
        `${BASE_URL}/user/upload?token=${userToken()}`,
        data
      );
      // make changes on the deleted space client side
      const updatedItem = {
        id: item_id,
        file: null,
        url: null,
        public_id: null,
        isUploadedSuccess: null,
        isDeleting: null,
      };
      setMyImages((x) => ({ ...x, [item_id]: updatedItem }));
    } catch (error) {
      // make changes on the deleted space client side
      const updatedItem = {
        id: item_id,
        file: null,
        url: null,
        public_id: null,
        isUploadedSuccess: null,
        isDeleting: null,
      };
      setMyImages((x) => ({ ...x, [item_id]: updatedItem }));
    }
  });
}
