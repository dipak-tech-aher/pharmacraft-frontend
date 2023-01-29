import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import DynamicTable from '../common/table/DynamicTable'
import { Link } from "react-router-dom";


const InvoiceView = () => {
  const [service, setService] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:4000/get-service").then((response) => {
      setService(response?.data?.serviceData);
    });
  }, []);
  const handleSubmit = (id) => {
    // history.push(`http://localhost:3000/edit-services`, {
    //   data: { serviceId: id },
    // });
    navigate('/edit-services', { state: { serviceId: id } })

    console.log("aa", id);
  };

  const handleCellRender = (cell, row) => {

    if (cell.column.Header === "System") {
      return (<span className="text-secondary cursor-pointer" id="CUSTOMERID" onClick={() => { handleOnCellClick(row) }}>{cell.value}</span>)
    }
    else {
      return (<span>{cell.value}</span>)
    }
  }

  const handleOnCellClick = (row) => {
    console.log('data.........', row.original)
    // setSystem(row.original.system)
  }
  return (
    <div class="content">
      <div className="row">
      <div className="col-md-4"></div>  
      <div className="col-md-4"></div>  
      <div className="col-md-4"><button className="btn btn-primary" style={{float:"right"}}><Link className="nav-link align-middle px-0" to="/add-invoice">
            <span >Create-Invoice</span>
          </Link></button></div>  
      </div>
      <table className="table table-hover">
      <thead>
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {service.map((e) => {
          return (
            <tr className="table-active">
              <th scope="row">{e?.title}</th>
              <td>{e?.description}</td>
              <td>
                {" "}
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
          );
        })}
      </tbody>
    </table>

    </div>
  );
};
export default InvoiceView;

export const InvoiceColumns = [
  {
    Header: "Invoice Id",
    accessor: "_id",
    disableFilters: true
  },
  // {
  //     Header: "Status",
  //     accessor: "code01",
  //     disableFilters: true
  // },
  // {
  //     Header: "Speed",
  //     accessor: "code02",
  //     disableFilters: true
  // },
  // {
  //     Header: "Quota",
  //     accessor: "code03",
  //     disableFilters: true
  // },
  // {
  //     Header: "Ont Password",
  //     accessor: "code04",
  //     disableFilters: true
  // },
  // {
  //     Header: "Code",
  //     accessor: "code",
  //     disableFilters: true
  // },
  // {
  //     Header: "Description",
  //     accessor: "code06",
  //     disableFilters: true
  // },
  // {
  //     Header: "Usage",
  //     accessor: "code07",
  //     disableFilters: true
  // },
  // {
  //     Header: "Summary details",
  //     accessor: "code08",
  //     disableFilters: true
  // },
  // {
  //     Header: "Message",
  //     accessor: "message",
  //     disableFilters: true
  // }
]