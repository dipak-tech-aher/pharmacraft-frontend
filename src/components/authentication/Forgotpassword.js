import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Forgotpassword=()=>{

    const navigate =useNavigate()


    const[payload,setPayload]=useState({email:""})

    const handleInputChange=(e)=>{
        setPayload({ ...payload, [e.target.id]: e.target.value });


    }

    const handleSubmit=()=>{

        //  navigate ("/forgot-pass",{state: {email:payload.email}}) ; 
        axios.post("http://localhost:4000/forgot-password",payload).then((response)=>{
            navigate ("/forgot-pass",{state: {email:payload.email}}) ; 

        console.log("resss",response)
        if(response?.data?.loginData != "nodata"){

            navigate("/forgot-pass")

        }



        })
    }

    return(

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
                
                
              </div>
            </fieldset>
          </form>
        </div>
        <div className="col-md-4"></div>
      </div>
    )



}

export default Forgotpassword;