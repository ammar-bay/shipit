import React from "react";
import { useHistory } from "react-router";
import Axios from "axios";

export default function NormalUser() {
  let history = useHistory();

  const orderplace = () => {
    history.push(`/orderplace`);
  }

  const feedback = () => {
    history.push(`/feedback`);
  }
  const orderhistory = () => {
    history.push(`/orderhistory`);
  }
  const ordertrack = () => {
    history.push(`/ordertrack`);
  }
  const calculatefare = () => {
    history.push(`/calculatefare`);
  }

  const logOut = () => {
    Axios.post('/api/deletecookie').then(res =>{
      history.push('/')  
    })
    
  }

  return (
    <div className="menu">    
      <button onClick={orderplace}>Place Order</button>
      <button onClick={ordertrack}>Track Order</button>
      <button onClick={orderhistory}>Order History</button>
      <button onClick={feedback}>Feedback</button>
      <button onClick={calculatefare}>Calculate Fare</button>
      <button onClick={logOut}>Log Out</button>
    </div>
  );
}
