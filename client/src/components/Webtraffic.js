import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import "../App.css";
import { useHistory } from "react-router";

export default function PaymentUpdate() {
  const [orders, setOrders] = useState([])

    Axios.defaults.withCredentials = true;
    let history = useHistory();

    useEffect(() => {
      Axios
          .get("/api/traffic",{})
          .then(res => {
            if(res.data === false){history.push('/')}
              console.log(res)
              setOrders(res.data)
          })
          .catch(err => {
              console.log(err)
          })
  }, [])
  
    return (
      <div className="webtraffic">
      <h1 className="traffic">Logged in Users</h1>
      {orders.map((order) => (
        <div className="traffic-traffic">
          <div>Usernmae: {order.username}</div>
          <br></br>
        </div>
      ))}
      <div>Total Active Users in Last 7 days: {orders.length} </div>
    </div>
    );
}
