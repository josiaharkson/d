import React,  { useState, useEffect }  from 'react';
import Card from 'react-bootstrap/Card';
import verified from '../../Assets/images/verified.png';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';


import { useDispatch, useSelector } from 'react-redux';
import { getMatchProfile } from '../../Redux/actions/user';
import { useParams, useHistory } from 'react-router-dom';
import { getAge, getTimeLeft } from '../../Utils';

import './ppPstyle.css';

const Search = () => {
  const dispatch = useDispatch();
  const history = useHistory()

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
                    <div className="topSpace">
                    <div className="backDiv">
                      <div className="menuSpace">
                          <div className="back" style={{ cursor: 'pointer' }}  onClick={() => history.push('/search/results')} > 
                            <div className="bkText">BACK</div> <h5 className="ssBarT">Settings</h5> 
                        </div>
                        <div> </div>
                    </div> 
                    </div>

                    </div>
            </div>
            <div className="ppPBox ">
                  <div >
                      <Card.Header className="mHeaderM" style={{ background: `url(${Profile.photos?.length > 1 ? Profile.photos[1]: Profile.photos } )` }}>
                            <div className="likedd">
                              <h5 className="pdltx">MATCHED</h5>
                            </div>
                            <div className="pdtimer">
                              <h5 className="pdCounter">{timeLeft}hrs</h5>
                              <h6 className="pdCT">TO EXPIRATION</h6>
                            </div>
                            <div className="pdDate">
                              <h1 className="pdDateTex" onClick={() => history.push(`/location/${id}`) }>GO ON DATE</h1>
                            </div>
                      <Container fluid className="pdDataCard">
                          <Row>
                            <Col>
                              <div>
                              <img src={verified}  className="pdVerified" alt="Verified"/> 
                              </div>
                            </Col>
                            <Col className="pdBox">
                              <div >
                              <h4 className="pdName"> {Profile.firstname}, {getAge(new Date(Profile.dob))}</h4>
                              </div>
                              <div >
                              <h5 className="pdProfession"> {Profile.occupation} </h5>
                              </div>
                              <div >
                              <h5 className="pdLocation"> Lives in {Profile.city}</h5>
                              </div>
                            </Col>
                          </Row>
                      </Container>
                  
                </Card.Header>
                              

                    </div>
          </div>

     <Card className="pdCard" >
      
      <Card.Body >
      <div className="mpPBox ppPT ">BIO</div>
              <div className="mpPBox">

                    <div className="mpPSP">
                    <p className="ppPP">
                    {Profile.bio || 'N/A'}
                    </p>
                    </div>
              </div>
              <hr></hr>
              <div className="mpPBox">
                    <div >
                        <h5 className="pppT">Religion:</h5>
                        <h3 className="pppA">CHRISTIAN</h3>
                    </div>
                    <div className="mpPSP">
                        <h5 className="pppT">State Of Origin:</h5>
                        <h3 className="pppA">PLATEAU</h3>
                    </div>
              </div>
              <div className="mpPBox">
                    <div >
                        <h5 className="pppT">Height:</h5>
                        <h3 className="pppA">5.1"-5.5"</h3>
                    </div>
                    <div className="mpPSP">
                        <h5 className="pppT">Tribe:</h5>
                        <h3 className="pppA">IGBO</h3>
                    </div>
              </div>
              <div className="mpPBox">
                    <div >
                        <h5 className="pppT">Skin Tone:</h5>
                        <h3 className="pppA">DARK</h3>
                    </div>
                    <div className="mpPSP">
                        <h5 className="pppT">Body Type:</h5>
                        <h3 className="pppA">CURVY</h3>
                    </div>
              </div>
              <div className="mpPBox">
                    <div >
                        <h5 className="pppTR">I Am Looking For:</h5>
                        <h3 className="pppAR">SERIOUS RELATIONSHIP</h3>
                    
                    </div>
              </div>
                  
                
                  <div className="mSpace"></div>
       
      </Card.Body>
    </Card>
    </div>
  )
}

export default Search;
