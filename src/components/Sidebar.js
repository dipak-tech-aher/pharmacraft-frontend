import { render } from "@testing-library/react";
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <a href="#!">
        <span>ADMIN</span>
      </a>
      <ul id="menu">
        <li>
          <Link className="nav-link align-middle px-0" to="/dashboard">
            <span >Dashboard</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link align-middle px-0" to="/invoice">
            <span >Invoice</span>
          </Link>
        </li>

       

        {/* <li>
          <a
            href="#submenu02"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle "
          >
            <i className="fs-4 bi-bootstrap"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Products</span>
          </a>
          <ul
            className="collapse nav flex-column ms-1"
            id="submenu02"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <Link to="/view-product" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline">View product</span>{" "}
              </Link>
            </li>
            <li>
              <Link to="/add-product" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline">Add product</span>{" "}
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href="#submenu03"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle "
          >
            <i className="fs-4 bi-bootstrap"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Projects</span>
          </a>
          <ul
            className="collapse nav flex-column ms-1"
            id="submenu03"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <Link to="/view-projects" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline">View projects</span>{" "}
              </Link>
            </li>
            <li>
              <Link to="/add-projects" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline">Add projects</span>{" "}
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href="#submenu04"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle "
          >
            <i className="fs-4 bi-bootstrap"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Blogs</span>
          </a>
          <ul
            className="collapse nav flex-column ms-1"
            id="submenu04"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <Link to="/view-blogs" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline">View Blogs</span>{" "}
              </Link>
            </li>
            <li>
              <Link to="/add-bolgs" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline">Add Blogs</span>{" "}
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href="#submenu05"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle "
          >
            <i className="fs-4 bi-bootstrap"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">Contact</span>
          </a>
          <ul
            className="collapse nav flex-column ms-1"
            id="submenu05"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <Link to="/view-contacts" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline">View contacts</span>{" "}
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <a
            href="#submenu06"
            data-bs-toggle="collapse"
            className="nav-link px-0 align-middle "
          >
            <i className="fs-4 bi-bootstrap"></i>{" "}
            <span className="ms-1 d-none d-sm-inline">About</span>
          </a>
          <ul
            className="collapse nav flex-column ms-1"
            id="submenu06"
            data-bs-parent="#menu"
          >
            <li className="w-100">
              <Link to="/view-abouts" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline">View abouts</span>{" "}
              </Link>
            </li>
            <li>
              <Link to="/add-abouts" className="nav-link px-0">
                {" "}
                <span className="d-none d-sm-inline">Add abouts</span>{" "}
              </Link>
            </li>
          </ul>
        </li> */}
      </ul>
    </div>
  );
};

export default Sidebar;
