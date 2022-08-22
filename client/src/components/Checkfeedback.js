import React, {useEffect, useState} from 'react';
import "../App.css";
import Axios from "axios";
import { useHistory } from "react-router";

function CheckFeedback() {
    const [feedback, setFeedback] = useState([])
    let history = useHistory();
    useEffect(() => {
        Axios
            .post("/api/checkfeedback")
            .then(res => {
              if (res.data === false){history.push('/')}
                console.log(res.data)
                setFeedback(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
      <div className="track-order">
        <h1 className="aorders">Customer Feedback</h1>
        {feedback.map((fb) => (
          <div className="active-orders">
            <div>Feedback ID: {fb.F_ID}</div>
            <div>Customer ID: {fb.C_ID}</div>
            <div>Comments: {fb.comments}</div>
            <br></br>
          </div>
        ))}
      </div>
    );
}

export default CheckFeedback
