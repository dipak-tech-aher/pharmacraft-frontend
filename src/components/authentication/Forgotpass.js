import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation} from "react-router-dom";
import { Link } from "react-router-dom";


const Forgotpass = (props) => {
  const { state } = useLocation();
  const navigate =useNavigate()

  console.log("ssss", state);

  const initialPayload = {
    password: "",
    confirm: "",
  };

  const [payload, setPayload] = useState(initialPayload);

  const handleInputChange = (e) => {
    setPayload({
      ...payload,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    console.log("ppp..", payload);

    if (payload.password === payload.confirm) {
      payload.email = state?.email;

      console.log("pppppp", payload);
      axios
        .put("http://localhost:4000/reset-password", payload)
        .then((response) => {
            
            console.log("rrr",response)
            if(response){
                navigate("/login")


            }
            

        });

    }
  };

  return (
    <div className="row">
      <div className="col-md-4"></div>
      <div className="col-md-4">
        <form>
          <fieldset>
            <legend style={{ textAlign: "center" }}>LOGIN</legend>

            {/* <div className="form-group">
              <label htmlFor="exampleInputPassword1">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                placeholder="email"
                // onChange={handleInputChange}
              />
            </div> */}

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
            <div className="form-group">
              <label htmlFor="exampleTextarea">confirm password</label>
              <input
                className="form-control"
                id="confirm"
                rows="3"
                placeholder="confirm password"
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
              <Link to={{ pathname: "/forgot-password" }}>Back</Link>

                 {/* <a href="#"> Forgot password?</a> */}
              </span>
            </div>
            <div></div>
          </fieldset>
        </form>
      </div>
      <div className="col-md-4"></div>
    </div>
  );
};

export default Forgotpass;
