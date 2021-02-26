import React from "react";
import Form from "react-bootstrap/Form";
// import { useHistory } from "react-router-dom";
import NaijaStates from "naija-state-local-government";
import "./mpStyle.css";

const Index = ({ profileOptions, onChangeProfileOptions }) => {
  // const history = useHistory();
  const stateList = NaijaStates.states();
  return (
    <div>
      <Form>
        <div className="mpinfoBox">
          <div className="mpITC">
            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label style={{ color: "#ffe500", paddingTop: 20 }}>
                ABOUT ME
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="bio"
                value={profileOptions.bio}
                onChange={(e) => onChangeProfileOptions(e)}
              />
            </Form.Group>
          </div>
        </div>
        <div className="mpPBox">
          <div>
            <Form.Group controlId="religion" className="mpPInput02">
              <Form.Label style={{ color: "#ffe500" }}>Religion:</Form.Label>
              <Form.Control
                className="mpPInput"
                name="religion"
                as="select"
                value={profileOptions.religion}
                onChange={(e) => onChangeProfileOptions(e)}
              >
                <option
                  selected={
                    profileOptions.religion === "Christian" ? "selected" : ""
                  }
                >
                  Christian
                </option>
                <option
                  selected={
                    profileOptions.religion === "Islam" ? "selected" : ""
                  }
                >
                  Islam
                </option>
                <option
                  selected={
                    profileOptions.religion === "Judaism" ? "selected" : ""
                  }
                >
                  Judaism
                </option>
                <option
                  selected={
                    profileOptions.religion === "Hindu" ? "selected" : ""
                  }
                >
                  Hindu
                </option>
                <option
                  selected={
                    profileOptions.religion === "Other" ? "selected" : ""
                  }
                >
                  Other
                </option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="mpPSP">
            <Form.Group controlId="soo">
              <Form.Label style={{ color: "#ffe500" }}>
                State Of Origin:
              </Form.Label>
              <Form.Control
                className="mpPInput"
                name="state"
                value={profileOptions.state}
                onChange={(e) => onChangeProfileOptions(e)}
                as="select"
              >
                <option>- Select State -</option>
                {stateList.map((s) => (
                  <option
                    key={s}
                    selected={s === profileOptions.state ? "selected" : ""}
                  >
                    {s}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </div>
        </div>
        <div className="mpPBox">
          <div>
            <Form.Group controlId="religion" className="mpPInput02">
              <Form.Label style={{ color: "#ffe500" }}>Height:</Form.Label>
              <Form.Control
                className="mpPInput"
                name="height"
                // value={profileOptions.height}
                onChange={(e) => onChangeProfileOptions(e)}
                as="select"
              >
                <option
                  selected={
                    profileOptions.height === "5.0 Below" ? "selected" : ""
                  }
                >
                  5.0 Below
                </option>
                <option
                  selected={
                    profileOptions.height === "5.1 - 5.5" ? "selected" : ""
                  }
                >
                  5.1 - 5.5
                </option>
                <option
                  selected={
                    profileOptions.height === "5.5 - 6.0" ? "selected" : ""
                  }
                >
                  5.5 - 6.0
                </option>
                <option
                  selected={
                    profileOptions.height === "6.1 - Above" ? "selected" : ""
                  }
                >
                  6.1 - Above
                </option>
                <option
                  selected={
                    profileOptions.height === "Not Sure" ? "selected" : ""
                  }
                >
                  Not Sure
                </option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="mpPSP">
            <Form.Group controlId="soo">
              <Form.Label style={{ color: "#ffe500" }}>Tribe:</Form.Label>
              <Form.Control
                className="mpPInput"
                type="text"
                name="tribe"
                value={profileOptions.tribe}
                onChange={(e) => onChangeProfileOptions(e)}
              ></Form.Control>
            </Form.Group>
          </div>
        </div>
        <div className="mpPBox">
          <div>
            <Form.Group controlId="religion" className="mpPInput02">
              <Form.Label style={{ color: "#ffe500" }}>Skin Tone:</Form.Label>
              <Form.Control
                className="mpPInput"
                name="skintone"
                as="select"
                value={profileOptions.skinTone}
                onChange={(e) => onChangeProfileOptions(e)}
              >
                <option
                  selected={
                    profileOptions.skintone === "Dark" ? "selected" : ""
                  }
                >
                  Dark
                </option>
                <option
                  selected={
                    profileOptions.skintone === "Exotic" ? "selected" : ""
                  }
                >
                  Exotic
                </option>
                <option
                  selected={
                    profileOptions.skintone === "Caramel" ? "selected" : ""
                  }
                >
                  Caramel
                </option>
                <option
                  selected={
                    profileOptions.skintone === "Light" ? "selected" : ""
                  }
                >
                  Light
                </option>
                <option
                  selected={
                    profileOptions.skintone === "Rosy" ? "selected" : ""
                  }
                >
                  Rosy
                </option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="mpPSP">
            <Form.Group controlId="soo">
              <Form.Label style={{ color: "#ffe500" }}>Body Type:</Form.Label>
              <Form.Control
                className="mpPInput"
                name="bodytype"
                value={profileOptions.bodytype}
                onChange={(e) => onChangeProfileOptions(e)}
                as="select"
              >
                <option
                  selected={
                    profileOptions.bodytype === "Slim" ? "selected" : ""
                  }
                >
                  Slim
                </option>
                <option
                  selected={
                    profileOptions.bodytype === "Average" ? "selected" : ""
                  }
                >
                  Average
                </option>
                <option
                  selected={
                    profileOptions.bodytype === "Athletic" ? "selected" : ""
                  }
                >
                  Athletic
                </option>
                <option
                  selected={
                    profileOptions.bodytype === "Curvy" ? "selected" : ""
                  }
                >
                  Curvy
                </option>
                <option
                  selected={profileOptions.bodytype === "Big" ? "selected" : ""}
                >
                  Big
                </option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>
        <div className="mpPBox">
          <Form.Group controlId="soo">
            <Form.Label style={{ color: "#ffe500" }}>
              I Am Looking For:
            </Form.Label>
            <Form.Control
              className="mpPInput2"
              name="lookingfor"
              as="select"
              value={profileOptions.lookingfor}
              onChange={(e) => onChangeProfileOptions(e)}
            >
              <option
                selected={
                  profileOptions.lookingfor === "Serious Replationship"
                    ? "selected"
                    : ""
                }
              >
                Serious Relationship
              </option>
              <option
                selected={
                  profileOptions.lookingfor === "Marriage" ? "selected" : ""
                }
              >
                Marriage
              </option>
              <option
                selected={profileOptions.lookingfor === "Any" ? "selected" : ""}
              >
                Any
              </option>
            </Form.Control>
          </Form.Group>
        </div>
        <hr className="dSpace"></hr>
        <hr></hr>
        <div className="mpPBox mpPT " style={{ color: "#ffe500" }}>
          SOCIAL HARBITS
        </div>
        <div className="mpPBox">
          <div>
            <Form.Group controlId="drink" className="mpPInput02">
              <Form.Label style={{ color: "#ffe500" }}>
                Do you Drink Alchohol?:
              </Form.Label>
              <Form.Control
                className="mpPInput"
                name="drink"
                value={profileOptions.drink}
                onChange={(e) => onChangeProfileOptions(e)}
                as="select"
              >
                <option
                  selected={profileOptions.drink === "Never" ? "selected" : ""}
                >
                  Never
                </option>
                <option
                  selected={
                    profileOptions.drink === "Occationaly" ? "selected" : ""
                  }
                >
                  Occationaly
                </option>
                <option
                  selected={profileOptions.drink === "Yes" ? "selected" : ""}
                >
                  Yes
                </option>
              </Form.Control>
            </Form.Group>
          </div>
          <div className="mpPSP">
            <Form.Group controlId="smoke">
              <Form.Label style={{ color: "#ffe500" }}>
                DO YOU SMOKE?
              </Form.Label>
              <Form.Control
                className="mpPInput"
                name="smoke"
                value={profileOptions.smoke}
                onChange={(e) => onChangeProfileOptions(e)}
                as="select"
              >
                <option
                  selected={profileOptions.smoke === "Never" ? "selected" : ""}
                >
                  Never
                </option>
                <option
                  selected={
                    profileOptions.smoke === "Occationaly" ? "selected" : ""
                  }
                >
                  Occationaly
                </option>
                <option
                  selected={profileOptions.smoke === "Yes" ? "selected" : ""}
                >
                  Yes
                </option>
              </Form.Control>
            </Form.Group>
          </div>
        </div>
        <hr className="dSpace"></hr>
      </Form>
    </div>
  );
};

export default Index;
