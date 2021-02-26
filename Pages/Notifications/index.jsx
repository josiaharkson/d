import React from "react";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import Bk from "../../Assets/images/bk.png";

import "./cStyle.css";

import Imgae_default_a from "../../Assets/images/user01.png";
import Imgae_default_b from "../../Assets/images/profileImage.jpg";
import Loading from "../../Components/LoadingComponent";

const Search = () => {
  const history = useHistory();
  const [isLoading, setIsloading] = React.useState(false);

  return (
    <div>
      <div className="nheadr">
        <div>
          <div className="nbackDiv">
            <div className="">
              <div
                className="cback02"
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/")}
              >
                <img className="bk" src={Bk} alt="back" />
                <h5 className="cBT">Locate My Date</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ color: '#746bc7', margin: '35% auto', textAlign: 'center'}}>
        <h3>You have no notifications yet</h3>
      </div>
      {/* <div className=" nNMT">
        <Grid Container className=" mpPBox it1 cSPu">
          <Grid item className="nUserImage  cGP"></Grid>
          <Grid item className="nUserData cGP">
            <h4 className="nUserN">Samuel, 29</h4>
            <h6 className="nHN">Babados Restaurant</h6>
            <h6 className="nMDT">5:00PM</h6>
          </Grid>
          <Grid item className="cUserData ">
            <div className="nspaceR">
              <div className="NewMessage"> New Message</div>
              <div>
                <h6 className="nTimeN">01h Ago</h6>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className=" nrNMT">
        <Grid Container className=" mpPBox it1 cSPu">
          <Grid item className="nUserImage  cGP"></Grid>
          <Grid item className="nUserData cGP">
            <h4 className="nrUserN">Samuel, 29</h4>
            <h6 className="nrHN">Babados Restaurant</h6>
            <h6 className="nrMDT">5:00PM</h6>
          </Grid>
          <Grid item className="cUserData ">
            <div className="nspaceR">
              <div className="rNewMessage"> New Message</div>
              <div>
                <h6 className="nrTimeN">01h Ago</h6>
              </div>
            </div>
          </Grid>
        </Grid>
      </div> */}
      {/* Missed date */}
      {/* <div className=" _nmrNMT">
        <Grid Container className=" mpPBox it1 cSPu">
          <Grid item className="_nmUserImage  cGP"></Grid>
          <Grid item className="nUserData cGP">
            <h4 className="_nmUserN">Samuel, 29</h4>
            <h6 className="_nmrHN">Babados Restaurant</h6>
            <h6 className="_nmrMDT">FEBRUARY 22 20201</h6>
          </Grid>
          <Grid item className="cUserData ">
            <div className="nspaceR">
              <div className="mMissed">Missed Date</div>
              <div>
                <h6 className="_nmrTimeN">01h Ago</h6>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className=" _rnmrNMT">
        <Grid Container className=" mpPBox it1 cSPu">
          <Grid item className="_nmUserImage  cGP"></Grid>
          <Grid item className="nUserData cGP">
            <h4 className="_rnmUserN">Samuel, 29</h4>
            <h6 className="_rnmrHN">Babados Restaurant</h6>
            <h6 className="_rnmrMDT">5:00PM</h6>
          </Grid>
          <Grid item className="cUserData ">
            <div className="nspaceR">
              <div className="_rmMissed">Missed Date</div>
              <div>
                <h6 className="_rnmrTimeN">01h Ago</h6>
              </div>
            </div>
          </Grid>
        </Grid>
      </div> */}
      {/* likes you */}
      {/* <div className=" _lnmrNMT">
        <Grid Container className=" mpPBox it1 cSPu">
          <Grid item className="_lnmUserImage  cGP"></Grid>
          <Grid item className="nUserData cGP">
            <h4 className="_nmUserN">Samuel, 29</h4>
            <h6 className="_nmrHN">Babados Restaurant</h6>
            <h6 className="_nmrMDT">FEBRUARY 22 20201</h6>
          </Grid>
          <Grid item className="cUserData ">
            <div className="nspaceR">
              <div className="_Likes">Likes You</div>
              <div>
                <h6 className="_nmrTimeN">01h Ago</h6>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
      <div className=" _rnmrNMT">
        <Grid Container className=" mpPBox it1 cSPu">
          <Grid item className="_lnmUserImage  cGP"></Grid>
          <Grid item className="nUserData cGP">
            <h4 className="_rnmUserN">Samuel, 29</h4>
            <h6 className="_rnmrHN">Babados Restaurant</h6>
            <h6 className="_rnmrMDT">5:00PM</h6>
          </Grid>
          <Grid item className="cUserData ">
            <div className="nspaceR">
              <div className="_rmMissed">Likes You</div>
              <div>
                <h6 className="_rnmrTimeN">01h Ago</h6>
              </div>
            </div>
          </Grid>
        </Grid>
      </div> */}
    </div>
  );
};

export default Search;
