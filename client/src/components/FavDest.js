import React, {useEffect, useState} from 'react';
import "../App.css";
import Axios from "axios";
import { useHistory } from "react-router";



function FavDest() {
    const [orders, setOrders] = useState([])
    let history = useHistory();
    useEffect(() => {
        Axios
            .post("/api/favdest")
            .then(res => {
              if (res.data === false){history.push('/')}
                console.log(res.data)
                setOrders(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
      <div className="fav-dests">
        <h1 className="fds">Favourite Destinations</h1>
        {orders.map((order) => (
          <div className="f-dests">
            <div>Destination Address: {order.destination_address}</div>
            <div>Count: {order.times}</div>
            <br></br>
          </div>
        ))}
      </div>
    );
}

export default FavDest