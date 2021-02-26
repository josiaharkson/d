import React from "react";
import axios from "axios";
import dotenv from "dotenv";

import { useHistory } from "react-router-dom";

import Bk from "../../Assets/images/bk.png";
import coin from "../../Assets/images/coin.png";

import Loading from "../../Components/LoadingComponent";

import ImageSliderComponent from "./ImageSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

import MyProfileComponent from "./MyProfileComponent";
import AudioEditComponent from "./edit_audio";

import { useDispatch } from "react-redux";
import { updateMe } from "../../Redux/actions/user";

import { getAuthToken } from "../../Services/AuthToken";

import style from "./mpStyle.module.css";

import UploadComponent from "./UploadComponent";

dotenv.config();

const baseURL = process.env.REACT_APP_URL;

const Index = () => {
  const value = React.useRef(0);
  const history = useHistory();
  const [isLoading, setIsloading] = React.useState(false);
  const [shouldUpdateProfile, setShouldUpdateProfile] = React.useState(false);

  const dispatch = useDispatch();

  const [profileOptions, setProfileOptions] = React.useState({
    bio: "",
    religion: "",
    state: "",
    height: "",
    tribe: "",
    skintone: "",
    bodyType: "",
    lookingfor: "",
    drink: "",
    smoke: "",
  });

  const [prefOptions, setPrefOptions] = React.useState({
    ageRageUpper: "",
    ageRangeLower: "",
    height: "",
    bodytype: "",
    profession: "",
    goal: "",
  });

  const [photos, setPhotos] = React.useState(undefined);
  const [audio, setAudio] = React.useState(undefined);

  const onChangeProfileOptions = e => {
    setProfileOptions(x => ({ ...x, [e.target.name]: e.target.value }));
    setShouldUpdateProfile(true);
  };

  const updateUserProfile = async () => {
    setIsloading(true);
    if (shouldUpdateProfile) {
      dispatch(updateMe(profileOptions));
    }
    setTimeout(() => {
      history.push("/search/results");
    }, 1000);
  };

  const updateUserInfo = async () => {
    const data = { token: getAuthToken() };

    try {
      const res = await axios.get(`${baseURL}/user/me?token=${data.token}`);
      console.log(res.data);

      if (res.data.data) {
        const {
          bio,
          religion,
          state,
          height,
          tribe,
          skintone,
          bodytype,
          lookingfor,
          drink,
          smoke,
          photos,
          audio,
        } = res.data.data;

        setPhotos(photos ? photos : []);
        setAudio(audio ? audio : []);

        setProfileOptions({
          bio: bio || "",
          religion: religion || "",
          state: state || "",
          height: height || "",
          tribe: tribe || "",
          skintone: skintone || "",
          bodytype: bodytype || "",
          lookingfor: lookingfor || "",
          drink: drink || "",
          smoke: smoke || "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    if (value.current < 2) {
      updateUserInfo();

      value.current = value.current + 1;
    }
  });

  return (
    <div
      style={{
        paddingBottom: 100,
        background:
          "linear-gradient(163.79deg, #736CC7 -16.48%, #CE499B 134.62%)",
      }}
    >
      {isLoading && <Loading />}

      <ImageSliderComponent photos={photos}>
        <div
          className={style.cback02}
          style={{ cursor: "pointer" }}
          onClick={() => updateUserProfile()}
        >
          <img className={style.bk} src={Bk} alt="back" />
          <h5 className={style.cBT}>Edit Profile</h5>
        </div>
      </ImageSliderComponent>

      <div className={style.btn_wrapper}>
        <UploadComponent photos={photos} updateUserInfo={updateUserInfo} />

        <Coins />
      </div>

      <AudioEditComponent myAudioUrl={audio} />

      <MyProfileComponent
        profileOptions={profileOptions}
        onChangeProfileOptions={onChangeProfileOptions}
      />

      <LogoutIcon history={history} />
    </div>
  );
};

export default Index;

const Coins = () => (
  <div className={style.consD}>
    <img src={coin} className={style.coin} alt="coin" />
    <div className={style.coint}>2390</div>
  </div>
);

const LogoutIcon = ({ history }) => (
  <div
    className="menuSpace"
    style={{
      color: "red",
      position: "fixed",
      bottom: "30px",
      right: 0,
      boxShadow: "1px 1px 1px gray",
      padding: 10,
      background: "#e4e4e4",
    }}
  >
    <FontAwesomeIcon
      style={{ cursor: "pointer", fontSize: "20px" }}
      onClick={() => history.push("/logout")}
      icon={faPowerOff}
    />
  </div>
);
