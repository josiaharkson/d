import React, { useEffect, useState } from "react";
import moment from "moment";
import Card from "react-bootstrap/Card";
import verified from "../../Assets/images/verified.png";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

import { useDispatch, useSelector } from "react-redux";
import { getUserDateProfile } from "../../Redux/actions/user";
import { useParams, useHistory } from "react-router-dom";
import { getAge } from "../../Utils";
import { updateDateProfile } from "../../Redux/actions/user";
import Bk from "../../Assets/images/bk.png";

import style from "./style.module.css";

const Search = () => {
  const [show, setShow] = useState(false);
  const [showA, setShowA] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getUserDateProfile({ id }));
  }, [dispatch, id]);

  const dateProfile = useSelector((state) => state.dateProfile);
  const { dateProfile: data } = dateProfile;
  console.log(data);
  const [time, setTime] = useState(data?.time);
  const [rDate, setRDate] = useState(data?.date.split("T")[0]);
  const [text, setText] = useState("");

  const setDateFn = () => {
    const requestData = {
      userId: id,
      date: rDate,
      time: time,
      location: "Ikeja",
      requests: text,
    };

    dispatch(updateDateProfile(requestData)).then((e) => {
      if (!e) {
        setShowA(!showA);
        setTimeout(() => history.push(`/reservation/${id}/detail`), 3000);
      }
    });
    setShow(false);
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
                  onClick={() => history.push("/matches")}
                >
                  <img className={style.bk} src={Bk} alt="back" />
                  <h5 className={style.cBT}> Reservation Details</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Card className={style.datePCard}>
        <Card.Header className={style.profileHead}>
          <Container fluid className={style.datePDataCard}>
            <Row>
              <Col>
                <div>
                  <img
                    src={verified}
                    className={style.datePVerified}
                    alt="Verified"
                  />
                </div>
              </Col>
              <Col className={style.datePBox}>
                <div>
                  <h4 className={style.datePName}>
                    {" "}
                    {data?.userB.firstname},{" "}
                    {getAge(new Date(data?.userB.dob))}
                  </h4>
                </div>
                <div>
                  <h5 className={style.datePProfession}>
                    {" "}
                    {data?.userB.occupation}
                  </h5>
                </div>
                <div>
                  <h5 className={style.datePLocation}>
                    {" "}
                    Lives in {data?.userB.city}
                  </h5>
                </div>
              </Col>
            </Row>
          </Container>
        </Card.Header>
        <hr className={style.hr}></hr>
        <div>
          <Row>
            <Col>
              <div className={style.datePDate}>
                <h1
                  className={style.datePDateTex02}
                  onClick={() => history.push(`/location/${id}?update=true`)}
                >
                  Modify Location
                </h1>
              </div>
            </Col>
            <Col>
              <div className={style.datePDate} onClick={handleShow}>
                <h1 className={style.datePDateTex02}>Modify Date</h1>
              </div>
            </Col>
          </Row>

          <div className={style.datePDI}>
            <h2 className={style.datePLName}>{data?.name} </h2>
            <h5 className={style.datePLL}> {data?.city}</h5>
            <h5 className={style.datePLA}> {data?.address}</h5>
            <h5 className={style.datePLD}>
              {" "}
              {moment(data?.date, "YYYY-MM-DD").format("Do MMMM, YYYY")}
            </h5>
            <h5 className={style.datePLT}>
              {" "}
              {moment(data?.time, "HH:mm:ss").format("hh:mm A")}
            </h5>
          </div>

          <div>
            <div className={style.datePNav}>
              <a
                href={`https://www.google.com/search?q=${data?.name} ${data?.address}`}
                target="_blank"
              >
                <h1 className={style.datePDateTex}>NAVIGATE</h1>
              </a>
            </div>
            <div
              className={style.datePLoc}
              onClick={() => history.push(`/chat/${id}`)}
            >
              <h1 className={style.datePDateTex}>LOCATE MY DATE</h1>
            </div>
          </div>
        </div>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center" }}>
            Change Date or Time
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form>
              <Form.Group as={Row} controlId="formHorizontalDate">
                <Form.Label column sm={2}>
                  Date
                </Form.Label>
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
                <Form.Label column sm={2}>
                  Time
                </Form.Label>
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
          <Button variant="primary" onClick={setDateFn}>
            {dateProfile.loading ? (
              <>
                <Spinner
                  as="span"
                  animation="grow"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Search;
