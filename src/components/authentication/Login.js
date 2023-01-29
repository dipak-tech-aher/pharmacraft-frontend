import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { properties } from "../../properties";


const Login = () => {
  const navigate = useNavigate();

  const initialPayload = {
    email: "",
    password: "",
  };

  const [payload, setPayload] = useState(initialPayload);

  const handleInputChange = (e) => {
    setPayload({ ...payload, [e.target.id]: e.target.value });
  };
  const handleSubmit = () => {
    console.log("pp", payload);
    console.log("process.env.API_ENDPOINT..", properties.API_ENDPOINT);
    axios.post(`${properties.API_ENDPOINT}/login`, payload).then((response) => {
      console.log("res", response);
      if (response?.data?.loginData?.message === "login successful") {
        console.log("login succs");
        navigate("/dashboard");
      }
    });
  };
  return (
    // JSX code for login form

    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <form>
          <fieldset>
            <legend style={{ textAlign: "center" }}>LOGIN</legend>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="email"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleTextarea">password</label>
              <input
                className="form-control"
                id="password"
                rows="3"
                placeholder="password"
                onChange={handleInputChange}
              />
            </div>
            <center>
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => {
                  handleSubmit(e);
                }}
              >
                Submit
              </button>
            </center>
            <div>
              
              <span className="psw">
              <Link to={{ pathname: "/forgot-password" }}>Forgot password?</Link>

                 {/* <a href="#"> Forgot password?</a> */}
              </span>
            </div>
          </fieldset>
        </form>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};
export default Login;
