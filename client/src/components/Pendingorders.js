import React, {useEffect, useState} from 'react';
import "../App.css";
import Axios from "axios";
import { useHistory } from "react-router";

function Pendingorders() {
    const [orders, setOrders] = useState([])
    let history = useHistory();
    useEffect(() => {
        Axios
            .post("/api/pendingorders")
            .then(res => {
              if(res.data === false){history.push("/")}
                console.log(res)
                setOrders(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="pending">
        <h1 className="p-orders">Pending Orders</h1>
        {orders.map((order) => (
          <div className="pend-orders">
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

export default Pendingorders
