import React, { useEffect, useState } from "react";
import axios from "axios";

const AboutAdd = () => {
  const [payload, setPayload] = useState({
    description: "",
    name: "",
    dateOfBirth: "",
    address: "",
    zipCode: "",
    emailId: "",
    phone: "",
    tags: "",
    image: "",
  });

  const handleInputChange = (e) => {
    setPayload({
      ...payload,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const config = {     
        headers: { 'content-type': 'multipart/form-data' }
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("description", payload.description);
    formData.append("name", payload.name);
    formData.append("dateOfBirth", payload.dateOfBirth);
    formData.append("address", payload.address);
    formData.append("zipCode", payload.zipCode);
    formData.append("emailId", payload.emailId);
    formData.append("phone", payload.phone);
    formData.append("tags", payload.tags);
   
    console.log("pay..", formData);

    axios
      .post("http://localhost:4000/create-about-me", formData,config)
      .then((response) => {
        if (response) {
          console.log("reord insert");
          setPayload({
            description: "",
            name: "",
            dateOfBirth: "",
            address: "",
            zipCode: "",
            emailId: "",
            phone: "",
            tags: "",
            image: "",
          });
        } else {
          console.log("record insert");
        }
      });
  };

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <form>
          <fieldset>
            <legend>About ME</legend>

            <div className="form-group">
              <label htmlFor="exampleTextarea">Description</label>
              <textarea
                className="form-control"
                id="description"
                rows="3"
                onChange={handleInputChange}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">DateOfBirth</label>
              <input
                type="date"
                className="form-control"
                id="dateOfBirth"
                placeholder="dateofbirth"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                placeholder="address"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">zipCode</label>
              <input
                type="Number"
                className="form-control"
                id="zipCode"
                placeholder="zipcode"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input
                type="email"
                className="form-control"
                id="emailId"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">PhoneNo</label>
              <input
                type="Number"
                className="form-control"
                id="phone"
                placeholder="PhoneNo"
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Tags</label>
              <input
                type="text"
                className="form-control"
                id="tags"
                placeholder="Tags"
                onChange={handleInputChange}
              />
            </div>

            {/* <div className="form-group">
                    <label htmlFor="exampleTextarea">Example textarea</label>
                    <textarea className="form-control" id="exampleTextarea" rows="3"></textarea>
                </div> */}
            <div className="form-group">
              <label htmlFor="formFile" className="form-label">
                Profile Image
              </label>
              <input
                className="form-control"
                type="file"
                id="image"
                onChange={handleChange}
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
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

export default AboutAdd;
