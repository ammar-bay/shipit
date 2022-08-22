import React, { useEffect, useState } from "react";
import Axios from "axios";
import "../App.css";
import { useHistory } from "react-router";

function Orderhistory() {
    const [orders, setOrders] = useState([])
    let history = useHistory();
    Axios.defaults.withCredentials = true;
    useEffect(() => {
        Axios
            .get("/api/orderhistory")
            .then(res => {
                console.log(res)
              if(res.data === false){history.push("/")}
                console.log(res)
                setOrders(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="past-orders">
        <h1 className="porders">Past Orders</h1>
        {orders.map((order) => (
          <div className="p-orders">
            <div>Order ID: {order.O_ID}</div>
            <div>Order Date: {order.order_date}</div>
            <div>Customer ID: {order.C_ID}</div>
            <div>Rider ID: {order.D_ID}</div>
            <div>Item Type: {order.item_type} </div>
            <div>Package Weight: {order.weight}</div>
            <div>Pickup Address: {order.pick_up_address}</div>
            <div>Destination Address: {order.destination_address}</div>
            <div>Delivery Status: {order.delivery_status}</div>
            <div>Total Charge: {order.total_charge}</div>
            <div>Payment Status: {order.payment_status}</div>
            <br></br>
          </div>
        ))}
      </div>
    )
}

export default Orderhistory