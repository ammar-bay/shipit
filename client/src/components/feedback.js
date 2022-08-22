import React from 'react'
import Axios from "axios"
import { useState } from "react";
import { useHistory } from "react-router";

function Feedback() {
    const [comments, setComments] = useState("");

    Axios.defaults.withCredentials = true;
    let history = useHistory();

    const submitFeedback = () => {
      Axios.post("/api/feedback", {
        comments : comments
      }).then(res => {
        if(res.data === false){history.push('/')}
        // history.goBack();
        history.push('/normaluser');
      });
    }


    return (
        <div className="fb">
            <h3>Leave a compliment or complaint! :))</h3>
            <textarea className="comment" form ="usrform"
              onChange={(e) => {
                setComments(e.target.value);
              }}
            />
            <button onClick={submitFeedback}>Submit Feedback</button>
        </div>
    )
}

export default Feedback
