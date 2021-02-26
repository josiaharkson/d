import React, { useEffect } from "react";
import ReservedCard from "../../Components/UserCard/reservedCard";
import Col from "react-bootstrap/Col";
import img from "../../Assets/images/user01.png";
import style from "./style.module.css";

import { useDispatch, useSelector } from "react-redux";
import { getAllReservation } from "../../Redux/actions/user";

import Grid from "@material-ui/core/Grid";


const SearchResults = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllReservation());
  }, [dispatch]);

  const matchData = useSelector((state) => state.matchData);
  const { matches = [] } = matchData;
  const reservationData = useSelector((state) => state.allReservation);
  const { allReservation = [], loading } = reservationData;

  return (
    <div className={style["SearchResult_root"]}>
      {/* {error} */}

      <Grid container spacing={2} className={style["SearchResult_card"]}>

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
                    Searching...
                  </p>
                </Col>
        ) :
        allReservation.length > 0 ?
        allReservation.map((data) => (
          <Grid item xs={6} sm={4} md={3} lg={3}>
            <ReservedCard img={img} id={1} data={data} />
          </Grid>
        )) : (
            <div>
                    <p
                      style={{
                        color: "#fff",
                        textAlign: "center",
                        marginTop: "20px",
                        fontSize: "20px",
                      }}
                    >
                      You have no reservations yet.
                    </p>
                  </div>
        )
      }
      </Grid>
    </div>
  );
};

export default SearchResults;
