import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

const ServiceEdit = (props) => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [payload, setPayload] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:4000/get-serviceById", state)
      .then((response) => {
        setPayload(response.data.serviceData);
      });
  }, []);

  const handleInputChange = (e) => {
    setPayload({
      ...payload,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    axios
      .put("http://localhost:4000/update-service", payload)
      .then((response) => {
        if (response?.data) {
          console.log("record updated");
          navigate("/view-services");
          setPayload({});
        }
      });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <form>
          <fieldset>
            <legend>Services</legend>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Title</label>
              <input
                type="text"
                defaultValue={payload?.title}
                className="form-control"
                id="title"
                placeholder="Title"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleTextarea">Description</label>
              <textarea
                className="form-control"
                defaultValue={payload?.description}
                id="description"
                rows="3"
                placeholder="Description"
                onChange={handleInputChange}
              >
              </textarea>
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              Submit
            </button>
          </fieldset>
        </form>
      </div>
      <div className="col-md-6"></div>
    </div>
  );
};

export default ServiceEdit;
