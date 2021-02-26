import React from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import Bk from "../../Assets/images/bk.png";

import Imgae_default_a from "../../Assets/images/user01.png";
import Imgae_default_b from "../../Assets/images/profileImage.jpg";
import Loading from "../../Components/LoadingComponent";

import style from "./style.module.css";

import ChatComponent from "./chat";

const Search = () => {
  const history = useHistory();
  const [isLoading, setIsloading] = React.useState(false);

  return (
    <div>
      <div className={style.headr}>
        <div>
          <div className={style.cbackDiv}>
            <div className="">
              <div
                className={style.cback02}
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/reservation/:id/detail")}
              >
                <img className={style.bk} src={Bk} alt="back" />
                <h5 className={style.cBT}>Chat</h5>
              </div>
            </div>
          </div>
        </div>
        <hr className={`${style.hrSp}`}></hr>
        <Grid Container className={`${style.mpPBox} ${style.cSPu}`}>
          <Grid item className={`${style.cUserData} ${style.cGP}`}>
            <h4 className={style.cUserN}>Samuel, 29</h4>
            <h6 className={style.cHN}>Software Engingeer</h6>
            {/* <h6 className={style.cHL}>Ikeja</h6>
            <h6 className={style.cMDT}>FEBRUARY 14, 2021</h6> */}
            <h6 className={style.cMDT}>2:20 LEFT</h6>
            <div className={style.seenDate}>Located My date</div>
          </Grid>
          <Grid item className={`${style.cUserImage} ${style.cGP}`}></Grid>
        </Grid>
      </div>

      <ChatComponent />
    </div>
  );
};

export default Search;
