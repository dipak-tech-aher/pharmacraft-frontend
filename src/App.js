import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  Outlet,
  useParams,
  NavLink,
  useNavigate,
  useLocation,
} from "react-router-dom";
import Services from "./components/Services";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";
import Login from "./components/authentication/Login";
import Dashboard from "./components/dashboard/Dashboard";
import Forgotpass from "./components/authentication/Forgotpass";
import Forgotpassword from "./components/authentication/Forgotpassword";
import InvoiceView from "./components/invoice/invoice-view";
import InvoiceAdd from "./components/invoice/Invoice-add";
const App = () => {
  const location = useLocation();
  return (
    <React.StrictMode>
      {/* <div className="container-fluid">
        <div className="row flex-nowrap"> */}
        <body>
          {location.pathname == "/login"  || location.pathname == "/forgot-pass" || location.pathname == "/forgot-password" ?"" : <Sidebar /> }
          
          <Routes>
            <Route path="/" element={<Navigate replace to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/invoice" element={<InvoiceView />} />
            <Route path="/add-invoice" element={<InvoiceAdd />} />
            <Route path="/forgot-pass" element={<Forgotpass />} />
            <Route path="/forgot-password" element={<Forgotpassword />} />
          </Routes>
          </body>
        {/* </div>
      </div> */}
    </React.StrictMode>
  );
};

export default App;
