import React,{useState,useEffect} from "react";
import axios from "axios";
import {useLocation,useNavigate} from "react-router-dom";

const AboutEdit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("sssss...", state);
  const [payload, setPayload] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:4000/get-aboutById", state)
      .then((response) => {
        setPayload(response?.data?.AboutData);
      });
  }, []);

  const handleInputChange = (e) => {
    setPayload({
      ...payload,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
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
    formData.append("_id", payload._id);
    formData.append("existingImage", payload.image);

    console.log("pay..", formData);

    axios
      .put("http://localhost:4000/update-about-me", formData, config)
      .then((response) => {
        if (response) {
          console.log("reord updated");
          navigate("/view-abouts");
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
          console.log("record not updated");
        }
      });
  };

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    console.log("e.target.files[0]....", e.target.files[0]);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <form>
          <fieldset>
            <legend>My Project</legend>

            <div className="form-group">
              <label htmlFor="exampleTextarea">Description</label>
              <textarea
                className="form-control"
                id="description"
                defaultValue={payload?.description}
                rows="3"
                placeholder="Description"
                onChange={handleInputChange}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea">Name</label>
              <input
                className="form-control"
                defaultValue={payload?.name}
                id="name"
                placeholder="Name"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea">Date of birth</label>
              <input
                className="form-control"
                defaultValue={payload?.dateOfBirth}
                id="dateOfBirth"
                placeholder="Date of birth"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea">Address</label>
              <input
                className="form-control"
                defaultValue={payload?.address}
                id="address"
                placeholder="Address"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea">ZipCode</label>
              <input
                className="form-control"
                defaultValue={payload?.zipCode}
                id="zipCode"
                placeholder="ZipCode"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea">emailId</label>
              <input
                className="form-control"
                defaultValue={payload?.emailId}
                id="emailId"
                placeholder="emailId"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea">phone</label>
              <input
                className="form-control"
                defaultValue={payload?.phone}
                id="phone"
                placeholder="phone"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea">tags</label>
              <input
                className="form-control"
                defaultValue={payload?.tags}
                id="tags"
                placeholder="tags"
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="exampleTextarea">Image</label>
              <img
                src={"http://localhost:4000/public/" + payload?.image}
                height="20%"
                width="50%"
              ></img>
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

export default AboutEdit;
