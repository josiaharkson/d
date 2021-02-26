// react libraries
import React from 'react';
import { useHistory } from 'react-router-dom';

const NotFound = (props) => {
    const history = useHistory()
  return (
      <div style={{ padding: '15%', textAlign: 'center'}}>
           <div>
        <div style={{ marginTop: '0'}} className="overlaya mpbackDiv">
          <div className="">
            <div
              className="cback02"
              style={{ cursor: "pointer" }}
              onClick={() => history.push("/")}
            >
              <h5 className="cBT">Back to homepage</h5>
            </div>
          </div>
        </div>
      </div>
          <h1>404</h1>
          <h4>Page not found</h4>
      </div>
  )
};

export default NotFound;
