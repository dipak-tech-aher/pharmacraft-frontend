import React,{useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const AboutView=()=>{
    const [about, setAbout] = useState([]);
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get("http://localhost:4000/get-about-me").then((response) => {
        setAbout(response?.data?.AboutData);
      });
    }, []);
  
    const handleSubmit = (id) => {
      navigate("/edit-abouts", { state: { aboutId: id } });
      console.log("idddddd", id);
    };

    return (
        <table class="table table-hover">
  <thead>
    <tr>
      <th scope="col">Description</th>
      <th scope="col">Name</th>
      <th scope="col">Date of birth</th>
      <th scope="col">Address</th>
      <th scope="col">ZipCode</th>
      <th scope="col">emailId</th>
      <th scope="col">phone</th>
      <th scope="col">tags</th>
    </tr>
  </thead>
  <tbody>
   { 
    about.map((e)=>{
        return  <tr class="table-active">
        <th scope="row">{e?.description}</th>
        <td>{e?.name}</td>
        <td>{e?.dateOfBirth}</td>
        <td>{e?.address}</td>
        <td>{e?.zipCode}</td>
        <td>{e?.emailId}</td>
        <td>{e?.phone}</td>
        <td>{e?.tags}</td>
        <td>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    handleSubmit(e?._id);
                  }}
                >
                
                  Edit
                </button>
              </td>
      </tr>



    })
   
   
  }
   
  </tbody>
</table>


    )


}

export default AboutView;