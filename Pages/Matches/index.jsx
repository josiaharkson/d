import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import SearchCard from "../../Components/UserCard/serachCard";
import MatcheddCard from "../../Components/UserCard/matcheCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import img from "../../Assets/images/user01.png";
import next from "../../Assets/images/next.png";
import prev from "../../Assets/images/prev.png";
import "./style.css";

import { useDispatch, useSelector } from "react-redux";
import { getMatches } from "../../Redux/actions/user";

const SearchResults = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMatches());
  }, [dispatch]);

  const matchData = useSelector((state) => state.matchData);
  const { matches = [], loading } = matchData;

  return (
    <div>
      <Card className="scard">
        <Card.Body>
          <Container className="SearchResult_card">
            <Row className="">
              {loading ? (
                <Col>
                  <p
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "20px",
                    }}
                  >
                    Loading your matches...
                  </p>
                </Col>
              ) : matches.length > 0 ? (
                matches.map((data) => {
                  return (
                    <Col xs={6} sm={6} md={3} lg={3}>
                      <MatcheddCard
                        img={img}
                        id={1}
                        data={data}
                        style={{ height: "height: 30vh" }}
                      />
                    </Col>
                  );
                })
              ) : (
                <Col>
                  <p
                    style={{
                      color: "#fff",
                      textAlign: "center",
                      marginTop: "20px",
                      fontSize: "20px",
                    }}
                  >
                    You have no matches yet.
                  </p>
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
