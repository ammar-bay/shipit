import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import "../App.css";
import { useHistory } from "react-router";

export default function PaymentUpdate() {
  const [orders, setOrders] = useState([])
  var tot_profit = useState(0);

    Axios.defaults.withCredentials = true;
    let history = useHistory();

    useEffect(() => {
      Axios
          .get("/api/revenuereport",{})
          .then(res => {
            if(res.data === false){history.push('/')}
              console.log(res)
              setOrders(res.data)
              
          })
          .catch(err => {
              console.log(err)
          })
  }, [])
  const Total =(props) =>{
    const numbers = props.employees;
    const saloTotal = numbers.reduce((totalHolder,m) => totalHolder + m.total_charge*0.7,0);
    return(
          <>
             <p>Total Profit For all orders: {saloTotal}</p>
          </>
    )}

  return (
    <div className="revreport">

    <h1 className="revenue">Revenue For All Orders</h1>
    
    {orders.map((order) => (
      <div className="rev-rev">
        <div>Order Number: {order.O_ID}</div>
        <div>Total Money Collected: {order.total_charge}</div>
        <div>Profit: {order.total_charge*0.7}</div>
        <br></br>
      </div>
    ))}
    <div><Total  employees={orders} /> </div>
  </div>
  );
}