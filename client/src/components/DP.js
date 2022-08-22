import React, {useEffect, useState} from 'react';
import { useHistory } from "react-router";
import Axios from "axios";

export default function DP() {
  const [orders, setOrders] = useState([])
  let history = useHistory();

  useEffect(() => {
    Axios.post("/api/dporder")
      .then((res) => {
        if (res.data === false) {
        console.log("IBRHAIM")  
          history.push("/");
        }
        console.log("AMMAR")
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const UDP = () => {
    history.push(`/deliveryupdate`);
  };
  const PU = () => {
    history.push(`/paymentupdate`);
  };
  const HDU = () => {
    history.push(`/homedeliveryupdate`);
  };
  const PWV = () => {
    history.push(`/packageweightverification`);
  };

  const logOut = () => {
    Axios.post("/api/deletecookie");
    history.push("/");
  };

  return (
    <div className="dp-order">
       <div className="dpfinal">
         <h3 className="order-details">Order Details</h3>
       {orders.map((order) => (
          <div className="dp-orders">
            <div>Order ID: {order.O_ID}</div>
            <div>Order Date: {order.order_date}</div>
            <div>Item Type: {order.item_type} </div>
            <div>Package Weight: {order.weight}</div>
            <div>Pickup Address: {order.pick_up_address}</div>
            <div>Destination Address: {order.destination_address}</div>
            <div>Total Charge: {order.total_charge}</div>
            <br></br>
          </div>
        ))}
       </div>
    <div className="dp">
      <button onClick={PWV}>Verify Package Weight</button>
      <button onClick={UDP}>Pickup Update</button>
      <button onClick={PU}>Payment Update</button>
      <button onClick={HDU}>Delivery Update</button>
      <button onClick={logOut}>Log Out</button>
    </div>
    </div>
  );

}