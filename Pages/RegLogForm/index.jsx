import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import logo from "../../Assets/images/logoM.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { userSignup, sendOtp, verifyOtp } from "../../Redux/actions/user";
import { PATH_CHANGE } from "../../Redux/actionTypes";
import NaijaStates from "naija-state-local-government";
import Grid from "@material-ui/core/Grid";
import Checkbox from "@material-ui/core/Checkbox";

import { isTokenValid } from "../../Utils";
import { getAuthToken } from "../../Services/AuthToken";

import "./style.css";

import TextField from "../../Components/customized/TextField";
import UploadIcon from "../../Components/customized/UploadIcon";

import Zoom from "@material-ui/core/Zoom";
import MenuItem from "@material-ui/core/MenuItem";
import PhoneIcon from "@material-ui/icons/Phone";
import DialpadIcon from "@material-ui/icons/Dialpad";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import WcIcon from "@material-ui/icons/Wc";
import LanguageIcon from "@material-ui/icons/Language";
import LocationCityIcon from "@material-ui/icons/LocationCity";
import WorkIcon from "@material-ui/icons/Work";
import MapIcon from "@material-ui/icons/Map";
import RoomIcon from "@material-ui/icons/Room";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";
import GroupIcon from "@material-ui/icons/Group";
import EmojiObjectsIcon from "@material-ui/icons/EmojiObjects";
import LocalBarIcon from "@material-ui/icons/LocalBar";
import SmokingRoomsIcon from "@material-ui/icons/SmokingRooms";
import FavoriteIcon from "@material-ui/icons/Favorite";

const Search = () => {
  const initialState = {
    phone: "",
    code: "",
    firstname: "",
    gender: "",
    dob: "",
    country: "",
    state: "",
    city: "",
    occupation: "",
    genotype: "",
    dependants: "",
    tribe: "",
    religion: "",
    height: "",
    skinTone: "",
    bodyType: "",
    smoke: "",
    drink: "",
    lookingfor: "",
    tc: "",
    usePhoto: "",
  };
  const [state, setState] = useState(initialState);
  const [next, setNext] = useState(1);
  const dispatch = useDispatch();
  const history = useHistory();

  const [photo_1, setPhoto_1] = React.useState(null);
  const [photo_2, setPhoto_2] = React.useState(null);
  const [photo_3, setPhoto_3] = React.useState(null);
  const [photo_4, setPhoto_4] = React.useState(null);
  const [selectedFile_1, setSelectedFile_1] = React.useState([]);
  const [selectedFile_2, setSelectedFile_2] = React.useState([]);
  const [selectedFile_3, setSelectedFile_3] = React.useState([]);
  const [selectedFile_4, setSelectedFile_4] = React.useState([]);

  const showBack = () => {
    // history.push('/search/results');
    setNext(next - 1);
  };
  const token = getAuthToken();
  let validToken = isTokenValid(token);

  if (validToken) {
    history.push("/search/results");
  }
  const signupData = useSelector(state => state.signupData);

  const showNext = () => {
    if (next === 1) {
      dispatch(sendOtp({ phone: state.phone })).then(() => {
        setNext(next + 1);
      });
    }
    if (next === 2) {
      dispatch(verifyOtp({ phone: state.phone, code: state.code }))
        .then(isNewUser => {
          if (!isNewUser) {
            history.push("/search/results");
          } else {
            setNext(next + 1);
          }
        })
        .catch(e => {
          alert("Invalid Token. Kindly retry again");
        });
    }

    if (next > 2) {
      setNext(next + 1);
    }
  };

  const onChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // STEP 1
  const onPhoneChange = e => {
    if (e.target.value.trim().length > 11) return;
    setState({ ...state, [e.target.name]: e.target.value.trim() });
  };

  const formatPhoneNumber = () => {
    let x = state.phone.trim();

    if (state.phone.trim().length === 10 && state.phone.trim()[0] !== "0") {
      x = "+234" + state.phone.trim();
    }

    if (state.phone.trim().length === 11) {
      const b = state.phone.trim().substr(1, 11);

      x = "+234" + b;
    }

    return x;
  };

  const getOtp = () => {
    const formattedNumber = formatPhoneNumber();

    console.log({ formattedNumber });
    dispatch(sendOtp({ phone: formattedNumber })).then(() => {
      setNext(next + 1);
    });
  };

  // Step 2

  const onChangeOTP = e => {
    if (e.target.value.trim().length > 6) return;
    setState({ ...state, [e.target.name]: e.target.value.trim() });
  };

  const onVerifyOTP = () => {
    const formattedNumber = formatPhoneNumber();

    dispatch(verifyOtp({ phone: formattedNumber, code: state.code })).then(
      isNewUser => {
        if (!isNewUser) {
          history.push("/search/results");
        } else {
          setNext(next + 1);
        }
      }
    );
  };

  const submit = () => {
    dispatch(userSignup({ ...state, phone: formatPhoneNumber() })).then(res => {
      console.log({ res });
      // if (!res) {
      //   setNext(1);
      //   history.push("/settings");
      // }

      history.push("/settings");
    });
  };

  return (
    <div className="srBody">
      <div className="__overlay" />
      <div className="__left" />
      <div className="__right">
        <div className="__card">
          <div className="">
            <div className="slPCstyle">
              <img className="fLogo" src={logo} alt="logo" />
            </div>

            {next === 1 && (
              <StepOne
                state={state}
                onPhoneChange={onPhoneChange}
                getOtp={getOtp}
              />
            )}

            {next === 2 && (
              <StepTwo
                formatPhoneNumber={formatPhoneNumber}
                state={state}
                onVerifyOTP={onVerifyOTP}
                onChangeOTP={onChangeOTP}
              />
            )}

            {next === 3 && (
              <StepThree setNext={setNext} state={state} onChange={onChange} />
            )}

            {next === 4 && (
              <StepFour setNext={setNext} state={state} onChange={onChange} />
            )}

            {next === 5 && (
              <StepFive submit={submit} state={state} onChange={onChange} />
            )}

            <div className="__align_btns"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StepOne = ({ state, onPhoneChange, getOtp }) => {
  const check = state.phone.trim().length > 9 && state.phone.trim().length < 12;
  const [load, setLoad] = React.useState(false);

  return (
    <Zoom in={true} timeout={500}>
      <div
        id="1"
        style={{ padding: 10, display: "flex", flexDirection: "column" }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          icon={<b style={{ paddingRight: 10, color: "#fff" }}>+234</b>}
          fullWidth
          color="secondary"
          label="Enter your Phone Number"
          name="phone"
          type="number"
          value={state.phone}
          autoFocus
          onChange={onPhoneChange}
        />

        <Button
          className="btNext"
          variant="primary"
          onClick={() => {
            setLoad(true);
            getOtp();
          }}
          type="button"
          disabled={!check || load}
        >
          {load && "Sending OTP..."}
          {!load && "Next"}
        </Button>
      </div>
    </Zoom>
  );
};

const StepTwo = ({ state, formatPhoneNumber, onVerifyOTP, onChangeOTP }) => {
  const check = state.code.trim().length === 6;
  const [load, setLoad] = React.useState(false);

  return (
    <Zoom in={true} timeout={500}>
      <div
        id="2"
        style={{ padding: 10, display: "flex", flexDirection: "column" }}
      >
        <div
          style={{
            color: "white",
            fontSize: "15px",
            textAlign: "center",
            width: "100%",
            paddingBottom: 10,
          }}
        >
          Enter Code send to {formatPhoneNumber()}
        </div>
        <TextField
          variant="outlined"
          margin="normal"
          required
          icon={<DialpadIcon style={{ color: "#e4e4e4" }} />}
          autoFocus
          fullWidth
          color="secondary"
          label="Enter Code"
          name="code"
          type="text"
          value={state.code}
          onChange={onChangeOTP}
        />

        <Button
          className="btNext"
          variant="primary"
          onClick={() => {
            setLoad(true);
            onVerifyOTP();
          }}
          type="button"
          disabled={!check}
        >
          {load && "Verifying OTP..."}
          {!load && "Verify"}
        </Button>
      </div>
    </Zoom>
  );
};

const StepThree = ({ state, setNext, onChange }) => {
  const check =
    state.firstname.trim() &&
    state.gender.trim() &&
    state.dob.trim() &&
    state.state.trim() &&
    state.city.trim();

  const stateList = NaijaStates.states();

  return (
    <Zoom in={true} timeout={500}>
      <div
        id="3"
        style={{ padding: 20, display: "flex", flexDirection: "column" }}
      >
        <TextField
          variant="outlined"
          margin="normal"
          required
          icon={<SpellcheckIcon style={{ color: "#e4e4e4" }} />}
          fullWidth
          color="secondary"
          label="First Name"
          name="firstname"
          size="small"
          value={state.firstname}
          onChange={onChange}
          fullwidth
        />
        <TextField
          select
          label="Gender"
          icon={<WcIcon style={{ color: "#e4e4e4" }} />}
          onChange={onChange}
          color="secondary"
          variant="outlined"
          name="gender"
          value={state.gender}
          required
          autoFocus
          margin="normal"
          size="small"
          fullWidth
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="female">Female</MenuItem>
        </TextField>

        <TextField
          required
          margin="normal"
          variant="outlined"
          size="small"
          color="secondary"
          fullWidth
          name="dob"
          label="Date of Brith"
          type="date"
          value={state.dob}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <TextField
          select
          label="State"
          icon={<RoomIcon style={{ color: "#e4e4e4" }} />}
          onChange={onChange}
          color="secondary"
          variant="outlined"
          name="state"
          value={state.state}
          required
          margin="normal"
          size="small"
          fullWidth
        >
          {stateList.map(s => (
            <MenuItem
              key={s}
              value={s}
              selected={s === state.state ? "selected" : ""}
            >
              {s}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          required
          margin="normal"
          variant="outlined"
          size="small"
          color="secondary"
          fullWidth
          name="city"
          label="City"
          value={state.city}
          onChange={onChange}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <Button
          className="btNext"
          variant="primary"
          onClick={() => setNext(x => x + 1)}
          type="button"
          disabled={!check}
        >
          Next
        </Button>
      </div>
    </Zoom>
  );
};

const StepFour = ({ state, setNext, onChange }) => {
  const check =
    state.genotype.trim() &&
    state.occupation.trim() &&
    state.bodyType.trim() &&
    state.height.trim() &&
    state.skinTone.trim();

  return (
    <Zoom in={true} timeout={500}>
      <div
        id="4"
        style={{ padding: 20, display: "flex", flexDirection: "column" }}
      >
        <div className="slPCstyle">
          <Form.Label style={{ color: "white", fontSize: "15px" }}>
            I am a
          </Form.Label>
        </div>

        <TextField
          label="Occupation"
          icon={<WorkIcon style={{ color: "#e4e4e4" }} />}
          onChange={onChange}
          color="secondary"
          variant="outlined"
          name="occupation"
          value={state.occupation}
          required
          margin="normal"
          size="small"
          fullWidth
        />

        <TextField
          select
          label="Genotype"
          icon={<EmojiPeopleIcon style={{ color: "#e4e4e4" }} />}
          onChange={onChange}
          color="secondary"
          variant="outlined"
          name="genotype"
          value={state.genotype}
          required
          margin="normal"
          size="small"
          fullWidth
        >
          <MenuItem value="AA">AA</MenuItem>
          <MenuItem value="AS">AS</MenuItem>
          <MenuItem value="AC">AC</MenuItem>
          <MenuItem value="SS">SS</MenuItem>
        </TextField>

        <TextField
          select
          label="Height"
          color="secondary"
          variant="outlined"
          onChange={onChange}
          name="height"
          value={state.height}
          required
          margin="normal"
          size="small"
          fullWidth
        >
          <MenuItem value='5.0" below'>5.0 Below</MenuItem>
          <MenuItem value='5.1"-5.5"'>5.1-5.5</MenuItem>
          <MenuItem value='5.6"-6.0"'>5.6-6.0</MenuItem>
          <MenuItem value='6.2" Above'>6.2 Above</MenuItem>
          <MenuItem value="Note sure">Note Sure</MenuItem>
        </TextField>

        <TextField
          select
          label="Skin Tone"
          color="secondary"
          variant="outlined"
          onChange={onChange}
          name="skinTone"
          value={state["skinTone"]}
          required
          margin="normal"
          size="small"
          fullWidth
        >
          <MenuItem value="Dark">Dark </MenuItem>
          <MenuItem value="Exotic">Exotic</MenuItem>
          <MenuItem value="Caramel">Caramel</MenuItem>
          <MenuItem value="Light">Light</MenuItem>
          <MenuItem value="Rosy">Rosy</MenuItem>
        </TextField>

        <TextField
          select
          label="Body Type"
          color="secondary"
          variant="outlined"
          onChange={onChange}
          name="bodyType"
          value={state.bodyType}
          required
          margin="normal"
          size="small"
          fullWidth
        >
          <MenuItem value="Slim">Slim</MenuItem>
          <MenuItem value="Average">Average</MenuItem>
          <MenuItem value="Athletic">Athletic</MenuItem>
          <MenuItem value="Curvy">Curvy</MenuItem>
          <MenuItem value="Big">Big</MenuItem>
        </TextField>

        <Button
          className="btNext"
          variant="primary"
          onClick={() => setNext(x => x + 1)}
          type="button"
          disabled={!check}
        >
          Next
        </Button>
      </div>
    </Zoom>
  );
};

const StepFive = ({ state, submit, onChange }) => {
  const check = state.lookingfor.trim();

  return (
    <Zoom in={true} timeout={500}>
      <div
        id="5"
        style={{ padding: 20, display: "flex", flexDirection: "column" }}
      >
        <TextField
          select
          label="I am looking For"
          icon={<FavoriteIcon style={{ color: "#e4e4e4" }} />}
          onChange={onChange}
          color="secondary"
          variant="outlined"
          name="lookingfor"
          value={state.lookingfor}
          required
          margin="normal"
          size="small"
          fullWidth
        >
          <MenuItem value="Marriage">Marriage</MenuItem>
          <MenuItem value="SeriousRelationship"> Serious Relationship</MenuItem>
          <MenuItem value="NotSureYet">Not Sure Yet</MenuItem>
        </TextField>

        <hr style={{ paddingTop: 100, borderColor: "gray" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <Checkbox
            style={{ color: "#fff" }}
            defaultChecked
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
            onChange={onChange}
            value={true}
            name="tc"
          />

          <div>I Accept Terms & Conditions</div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            color: "#fff",
          }}
        >
          <Checkbox
            style={{ color: "#fff" }}
            onChange={e => console.log(e.target.value)}
            value={true}
            name="usePhoto"
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />

          <div>
            I give Birddie permision to use my images for any birddie related
            promotions or content.
          </div>
        </div>

        <Button
          className="btNext"
          variant="primary"
          onClick={() => submit()}
          type="button"
          disabled={!check}
        >
          Sign Up
        </Button>
      </div>
    </Zoom>
  );
};

export default Search;
