import React from "react";
import { useHistory } from "react-router";
import Axios from "axios";

export default function Admin() {
  let history = useHistory();

  const DP = () => {
    history.push(`registrationdp`);
  }
  const FPO = () => {
    history.push(`pendingorders`);
  }
  const QFD = () => {
    history.push(`favdest`);
  }
  const VWT = () => {
    history.push(`webtraffic`);
  }
  const GRR = () => {
    history.push(`revenuereport`);
  }
  const CCF = () => {
    history.push(`checkfeedback`);
  }

  const logOut = () => {
    Axios.post('/api/deletecookie');
    history.push('/')
  }

  return (
    <div>
      <h1 className="ad">Admin</h1>
      <div className="adminbut">
        <button onClick={DP}>Register a DP</button>
        <button onClick={FPO}>Find Pending orders</button>
        <button onClick={QFD}>Query fav Dest</button>
        <button onClick={VWT}>View Website Traffic</button>
        <button onClick={GRR}>Generate Revenue Report</button>
        <button onClick={CCF}>Check Customer Feedback</button>
        <button onClick={logOut}>Log Out</button>
      </div>
    </div>
  );
}
