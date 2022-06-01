import { Dropdown } from "bootstrap";
import React, { useState } from "react";
import { DropdownButton } from "react-bootstrap";

function Login() {
  const [signUp, setshowsignUp] = useState(false);
  const [userType, setuserType] = useState("CUSTOMER");

  const toggleSignUp = () => {
    setshowsignUp(!signUp);
  };

  const handleSelect = (e) => {
    setuserType(e);
  };
  return (
    <div className="bg-primary d-flex justify-content-center align-items-center vh-100">
      <div className="card m-5 p-5">
        <div className="row">
          <div className="col">
            {!signUp ? (
              <div className="login">
                <form>
                  <h4 className="text-center p-3"> Login</h4>
                  <input
                    className="input-group m-2 form-control"
                    type="text"
                    placeholder="Enter your UserID"
                  />
                  <input
                    className="input-group m-2 form-control"
                    type="password"
                    placeholder="Enter Password"
                  />
                  <button className="btn btn-primary m-2 d-flex justify-content-center align-items-center">
                    Login
                  </button>
                  <div
                    className="text-center text-info"
                    onClick={() => toggleSignUp()}
                  >
                    Not a member? Signup
                  </div>
                </form>
              </div>
            ) : (
              <div className="signup">
                <form>
                  <h4 className="text-center p-3"> Signup</h4>
                  <input
                    className="input-group m-2 form-control"
                    type="text"
                    placeholder="Enter your Name"
                  />
                  <input
                    className="input-group m-2 form-control"
                    type="text"
                    placeholder="Enter your userID"
                  />
                  <input
                    className="input-group m-2 form-control"
                    type="email"
                    placeholder="Enter your email"
                  />
                  <input
                    className="input-group m-2 form-control"
                    type="password"
                    placeholder="Enter Password"
                  />

                  <div className="input-group m-1">
                    <span className="text-muted">USer Type</span>
                    <DropdownButton
                      align="end"
                      title={userType}
                      variant="light"
                      className="mx-1"
                      onSelect={handleSelect}
                    >
                      <Dropdown.Item eventKey="CUSTOMER">
                        Customer
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="CUSTOMER">
                        Engineer
                      </Dropdown.Item>
                    </DropdownButton>
                  </div>
                  <button className="btn btn-primary m-2 d-flex justify-content-center align-items-center">
                    Signup
                  </button>
                  <div
                    className="text-center text-info"
                    onClick={() => toggleSignUp()}
                  >
                    Already a member? Login
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
