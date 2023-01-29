import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const InvoiceAdd = () => {
  const navigate = useNavigate();
  const initialPayload = {
    title: "",
    description: "",
  };

  const [payload, setPayload] = useState(initialPayload);

  const handleInputChange = (e) => {
    setPayload({
      ...payload,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    axios
      .post("http://localhost:4000/create-service", payload)
      .then((response) => {
        if (response?.data) {
          console.log("record insert");
          navigate('/view-services')
          setPayload({});
        }
      });
  };

  return (
    <div class="content">
      <div className="row">
        <div className="col-md-6">
          <form>
            <fieldset>
              <legend>Create Invoice</legend>
              <div className="form-group">
                <label htmlFor="exampleInputPassword1">Title</label>
                <input
                  type="text"
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
                  id="description"
                  rows="3"
                  placeholder="Description"
                  onChange={handleInputChange}
                ></textarea>
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
    </div>
  );
};

export default InvoiceAdd;
