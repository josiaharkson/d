import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import verified from "../../Assets/images/verified.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Grid from "@material-ui/core/Grid";

import { useDispatch, useSelector } from "react-redux";
import { getMatchProfile } from "../../Redux/actions/user";
import { useParams, useHistory } from "react-router-dom";
import { getAge, getTimeLeft } from "../../Utils";

import style from "./style.module.css";

import Bk from "../../Assets/images/bk.png";

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  let { id } = useParams();

  useEffect(() => {
    dispatch(getMatchProfile(id));
  }, [id, dispatch]);

  const matchData = useSelector((state) => state.matchProfile);
  const { profile = {} } = matchData;
  const { Profile = {} } = profile;
  const timeLeft = getTimeLeft(profile.createdAt);

  return (
    <div className="">
      <div className="mpTop">
        <div className={style.headr}>
          <div>
            <div className={style.cbackDiv}>
              <div className="">
                <div
                  className={style.cback02}
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/matches")}
                >
                  <img className={style.bk} src={Bk} alt="back" />
                  <h5 className={style.cBT}> Match Details</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={style.boxbd}>
        <div className={style.ppPBox}>
          <div className={style.boxbd01}>
            <Card.Header
              className={style.mHeaderM}
              style={{
                backgroundImage: `url(${
                  Profile.photos?.length > 1
                    ? Profile.photos[1]
                    : Profile.photos
                } )`,
                backgroundSize: "cover",
              }}
            >
              <div className={style.likedd}>
                <h5 className={style.pdltx}>MATCHED</h5>
              </div>
              <div className={style.pdtimer}>
                <h5 className={style.pdCounter}>{timeLeft}hrs</h5>
                <h6 className={style.pdCT}>TO EXPIRATION</h6>
              </div>
              <div className={style.pdDate}>
                <h1
                  className={style.pdDateTex}
                  onClick={() => history.push(`/location/${id}`)}
                >
                  GO ON DATE
                </h1>
              </div>
              <Container fluid className={style.pdDataCard}>
                <Row>
                  <Col>
                    <div>
                      <img
                        src={verified}
                        className={style.pdVerified}
                        alt="Verified"
                      />
                    </div>
                  </Col>
                  <Col className={style.pdBox}>
                    <div>
                      <h4 className={style.pdName}>
                        {" "}
                        {Profile.firstname}, {getAge(new Date(Profile.dob))}
                      </h4>
                    </div>
                    <div>
                      <h5 className={style.pdProfession}>
                        {" "}
                        {Profile.occupation}{" "}
                      </h5>
                    </div>
                    <div>
                      <h5 className={style.pdLocation}>
                        {" "}
                        Lives in {Profile.city}
                      </h5>
                    </div>
                  </Col>
                </Row>
              </Container>
            </Card.Header>
          </div>
        </div>

        <Card className="pdCard">
          <Card.Body>
            <div className={(style.mpPBox, style.ppPT)}>BIO</div>
            <div className={style.mpPBox}>
              <div className={style.mpPSP}>
                <p className={style.ppPP}>{Profile.bio}</p>
              </div>
            </div>
            <hr></hr>
            <div className={style.mpPBox}>
              <div>
                <h5 className={style.pppT}>Religion:</h5>
                <h3 className={style.pppA}>{Profile.religion}</h3>
              </div>
              <div className={style.mpPSP}>
                <h5 className={style.pppT}>State Of Origin:</h5>
                <h3 className={style.pppA}>{Profile.state}</h3>
              </div>
            </div>
            <div className={style.mpPBox}>
              <div>
                <h5 className={style.pppT}>Height:</h5>
                <h3 className={style.pppA}>{Profile.height}</h3>
              </div>
              <div className={style.mpPSP}>
                <h5 className={style.pppT}>Tribe:</h5>
                <h3 className={style.pppA}>{Profile.tribe}</h3>
              </div>
            </div>
            <div className={style.mpPBox}>
              <div>
                <h5 className={style.pppT}>Skin Tone:</h5>
                <h3 className={style.pppA}>{Profile.skintone}</h3>
              </div>
              <div className={style.mpPSP}>
                <h5 className={style.pppT}>Body Type:</h5>
                <h3 className={style.pppA}>{Profile.bodytype}</h3>
              </div>
            </div>
            <div className={style.mpPBox}>
              <div>
                <h5 className={style.pppTR}>I Am Looking For:</h5>
                <h3 className={style.pppAR}>{Profile.lookingfor}</h3>
              </div>
            </div>
            <div className={style.mSpace}></div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Search;
