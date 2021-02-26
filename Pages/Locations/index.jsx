import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import LocationCard from "../../Components/UserCard/locationCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { useHistory } from "react-router-dom";
import NaijaStates from "naija-state-local-government";
import { Snackbar } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import Bk from "../../Assets/images/bk.png";

import { useParams } from "react-router-dom";
import next from "../../Assets/images/next.png";
import prev from "../../Assets/images/prev.png";
import style from "./style.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getGooglePlaces } from "../../Redux/actions/user";

const SearchResults = () => {
  const initialState = {
    state_: "",
    city: "",
    category: "",
  };
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [state, setState] = useState(initialState);
  const [cities, setCities] = useState([]);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const history = useHistory();

  const { userId } = useParams();

  const handleClose = () => {
    setOpen(false);
  };

  const searchLocations = () => {
    const { city, category } = state;

    if (city === "" || category === "") {
      setOpen(true);
      setError("Please select a state, city and category");
      return;
    }
    dispatch(getGooglePlaces(city, category));
  };

  const placesData = useSelector((state) => state.location);

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setState({ ...state, [name]: value });
    setError("");
    if (name === "state" && value !== "- Select State -") {
      setCities(NaijaStates.lgas(value).lgas);
    }
  };

  const { places = {}, loading } = placesData;
  const { nextPage: nextPageToken } = places;
  const locationChunk = [];
  const chunk = 6;

  const urlParams = new URLSearchParams(window.location.search);
  const update = urlParams.get("update");

  for (let i = 0; i < placesData?.places?.data?.length; i += chunk) {
    locationChunk.push(placesData.places.data.slice(i, i + chunk));
  }

  const nextPage = () =>
    setPage(page >= locationChunk.length ? locationChunk.length : page + 1);
  const pervPage = () => setPage(page <= 0 ? 0 : page - 1);
  const loadMore = () =>
    dispatch(getGooglePlaces(state.city, state.category, nextPageToken));
  const stateList = NaijaStates.states();
  //

  return (
    <div>
      <div>
        <div className={style.headr}>
          <div>
            <div className={style.cbackDiv}>
              <div className="">
                <div
                  className={style.cback02}
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/match/:id")}
                >
                  <img className={style.bk} src={Bk} alt="back" />
                  <h5 className={style.cBT}> Match Details</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert severity="warning">{error}</Alert>
      </Snackbar>
      <Card className={style.scard} style={{ minHeight: "100vh" }}>
        <Card.Body>
          <Container style={{ borderRadius: "55px", width: "%" }}>
            {/* {error ? <div style={{ color: 'yellow', fontSize: '15px', textAlign: 'center' }}>{error}</div> : null} */}
            <Form>
              <div className={style.mpPBox}>
                <div>
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className={style.lSP}
                  >
                    <Form.Label
                      style={{ color: "white", fontSize: "15px" }}
                    ></Form.Label>
                    <Form.Control
                      className={style.stx}
                      as="select"
                      name="state"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>- Select State -</option>
                      {stateList.map((s) => (
                        <option selected={s === "Kosofe" ? "selected" : ""}>
                          {s}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
                <div>
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className={style.lSP}
                  >
                    <Form.Label
                      style={{ color: "white", fontSize: "15px" }}
                    ></Form.Label>
                    <Form.Control
                      className={style.stx}
                      as="select"
                      name="city"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>- Select City -</option>
                      {cities.map((c) => (
                        <option>{c}</option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
                <div>
                  <Form.Group
                    controlId="exampleForm.ControlSelect1"
                    className={style.lSP}
                  >
                    <Form.Label
                      style={{ color: "white", fontSize: "15px" }}
                    ></Form.Label>
                    <Form.Control
                      as="select"
                      className={style.stx}
                      name="category"
                      onChange={(e) => handleChange(e)}
                    >
                      <option>- Select Location Category -</option>
                      <option>Beach</option>
                      <option>Bar</option>
                      <option>Restaurants</option>
                      <option>Cinema</option>
                    </Form.Control>
                  </Form.Group>
                </div>
              </div>
            </Form>
            <hr></hr>
            <div className={style.mpPBox}>
              <div>
                <div className="">
                  {!placesData?.places?.data ? (
                    <h1 className={style.lSB} onClick={searchLocations}>
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Searching...
                        </>
                      ) : (
                        "Search"
                      )}
                    </h1>
                  ) : null}
                </div>
              </div>
            </div>

            <Row>
              {locationChunk[page]?.map((d) => {
                return (
                  <Col md={4}>
                    <LocationCard
                      img={d.photo}
                      userId={userId}
                      update={update}
                      data={d}
                      style={{ height: "height: 30vh" }}
                    />
                  </Col>
                );
              })}
              {page + 1 >= locationChunk.length ? (
                (locationChunk[page] && locationChunk[page].length < 6) ||
                (locationChunk[page] && locationChunk[page].length === 0) ? (
                  <Col md={4}>
                    <Card
                      border="primary"
                      style={{ cursor: "pointer" }}
                      className={style.sCard}
                      onClick={() => loadMore()}
                    >
                      <Card.Body>
                        <div
                          style={{
                            textAlign: "center",
                            margin: "70% auto",
                            fontSize: "20px",
                          }}
                        >
                          {loading ? (
                            <>
                              <Spinner animation="grow" variant="secondary" />{" "}
                              Loading...
                            </>
                          ) : (
                            "Load More"
                          )}
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ) : null
              ) : null}
            </Row>
            <Row
              style={{
                width: "49%",
                marginTop: "20px",
                position: "absolute",
                bottom: "15px",
              }}
            >
              <Col md={2} onClick={() => pervPage()}>
                {page > 0 ? (
                  <img
                    style={{ width: "50%", cursor: "pointer" }}
                    src={prev}
                    alt="Prev"
                  />
                ) : null}
              </Col>

              {(
                locationChunk[page] && locationChunk[page].length >= 6
                  ? page >= locationChunk.length
                  : page + 1 >= locationChunk.length
              ) ? null : (
                <Col md={6} onClick={() => nextPage()}>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <img
                    style={{ width: "40%", cursor: "pointer" }}
                    src={next}
                    alt="Next"
                  />
                </Col>
              )}
            </Row>
          </Container>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SearchResults;
