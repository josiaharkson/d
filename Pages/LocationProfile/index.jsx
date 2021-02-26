import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import verified from "../../Assets/images/verified.png";
import Star from "../../Assets/images/star.png";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import Toast from "react-bootstrap/Toast";
import Bk from "../../Assets/images/bk.png";

import style from "./style.module.css";

import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { setDate, updateDateProfile } from "../../Redux/actions/user";

const LocationProfile = () => {
  const [time, setTime] = useState("");
  const [rDate, setRDate] = useState("");
  const [text, setText] = useState("");
  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);
  const [showB, setShowB] = useState(true);

  const history = useHistory();
  const urlParams = new URLSearchParams(window.location.search);
  const update = urlParams.get("update");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const placesData = useSelector((state) => state.location);
  const reservation = useSelector((state) => state.reservation);
  const dateProfile = useSelector((state) => state.dateProfile);
  const { places = {} } = placesData;
  const { data = {}, nextPage: nextPageToken, loading } = places;

  let { id, userId } = useParams();
  const showData = data.find((i) => i.place_id === id);
  const dispatch = useDispatch();

  const toggleShowA = () => setShowA(!showA);
  const toggleShowB = () => setShowB(!showB);

  console.log(dateProfile, "<<<< update  >>>>");

  const setDateFn = () => {
    const requestData = {
      userId: userId,
      name: showData.name,
      address: showData.formatted_address,
      date: rDate,
      time: time,
      location: "Ikeja",
      requests: text,
    };
    dispatch(setDate(requestData)).then((e) => {
      if (!e) {
        setShowA(!showA);
        setTimeout(() => history.push(`/reservation/${userId}/detail`), 3000);
      }
    });
  };

  const updateLocation = () => {
    const requestData = {
      userId: userId,
      name: showData.name,
      address: showData.formatted_address,
      date: rDate,
      time: time,
      location: "Ikeja",
      requests: text,
    };

    dispatch(updateDateProfile(requestData)).then((e) => {
      if (!e) {
        // setShow(true)
        setShowA(!showA);
        setTimeout(() => history.push(`/reservation/${userId}/detail`), 3000);
      }
    });
  };

  return (
    <div className={style.pdSearchParams}>
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
                  <h5 className={style.cBT}> Location Details</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card className={style.pdCard}>
        <Card.Header className={style.profileHead}>
          <Container fluid className={style.lPDataCard}>
            <Row>
              <Col className={style.lPBOX}>
                <div>
                  <h5 className={style.lPMoney}>
                    {[...Array(showData.price_level).keys()].map((i) => "₦")}
                  </h5>
                </div>
                <div>
                  <h4 className={style.lPName}> {showData.name}</h4>
                </div>
                <div>{/* <h5 className="lPLocation"> Ikeja</h5> */}</div>
                <div>
                  <Row>
                    <img
                      src={Star}
                      className={style.starRate}
                      alt="Star Rating"
                    />
                    <h5 className={style.lPRating}> {showData.rating}</h5>
                    <h5 className={style.lPReview}> Reviews On Google</h5>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <div className={style.dataBody}>
          <div>
            <h4 className={style.lPALabel}>ADDRESS</h4>
            <h4 className={style.lPDD}>{showData.formatted_address}</h4>
            <hr />
            <div>
              <Row>
                <Col>
                  <div className={style.lPAL02}>HOURS</div>
                </Col>
                <Col>
                  <Row>
                    <Col className={style.lPHD}>
                      {" "}
                      Open now:{" "}
                      {showData?.opening_hours?.open_now ? "Yes" : "No"}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
            <div>
              <a
                href={`https://www.google.com/search?q=${showData.name} ${showData.formatted_address}`}
                target="_blank"
              >
                Find out more!
              </a>
            </div>
            <div>
              <div
                className={style.lPB}
                onClick={() => (update ? updateLocation() : handleShow())}
              >
                <h1 className={style.lPTx}>
                  {update ? (
                    dateProfile.loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="grow"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Loading...
                      </>
                    ) : (
                      "Update Location"
                    )
                  ) : (
                    "SET DATE"
                  )}
                </h1>
              </div>
            </div>
          </div>
          <Modal show={show} onHide={handleClose}>
            {!showA ? (
              !update ? (
                <>
                  <Modal.Header closeButton>
                    <Modal.Title style={{ textAlign: "center" }}>
                      Choose a Date and Time
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Container>
                      <Form>
                        <Form.Group as={Row} controlId="formHorizontalDate">
                          <Col sm={10}>
                            <Form.Control
                              value={rDate}
                              onChange={(e) => setRDate(e.target.value)}
                              type="date"
                              placeholder="DATE"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group as={Row} controlId="formHorizontalTime">
                          <Col sm={10}>
                            <Form.Control
                              value={time}
                              onChange={(e) => setTime(e.target.value)}
                              type="time"
                              placeholder="DATE"
                            />
                          </Col>
                        </Form.Group>
                        <Form.Group controlId="exampleForm.ControlTextarea1">
                          <Form.Label>Got Any Special Request</Form.Label>
                          <Form.Control
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            as="textarea"
                            rows={3}
                          />
                        </Form.Group>
                      </Form>
                    </Container>
                  </Modal.Body>
                  <Modal.Footer>
                    {/* <Button variant="secondary" onClick={handleClose}>
            Close
          </Button> */}
                    <Button variant="primary" onClick={setDateFn}>
                      {reservation.loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Saving...
                        </>
                      ) : (
                        "Set Date"
                      )}
                    </Button>
                  </Modal.Footer>
                </>
              ) : null
            ) : (
              <Toast show={showA} onClose={toggleShowA}>
                <Toast.Header>
                  <img
                    src="holder.js/20x20?text=%20"
                    className="rounded mr-2"
                    alt=""
                  />
                  <strong className="mr-auto"></strong>
                  {/* <small>11 mins ago</small> */}
                </Toast.Header>
                <Toast.Body>
                  <h4>Date set Succesfully!</h4>
                  <p>Your Date will be notified shortly! </p>
                </Toast.Body>
              </Toast>
            )}
          </Modal>
        </div>
      </Card>
    </div>
  );
};

export default LocationProfile;
