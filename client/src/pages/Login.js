import React, { useState } from "react";
import Axios from "axios";
import "../App.css";
import { useHistory } from "react-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("normaluser"); // default is normaluser

  Axios.defaults.withCredentials = true;
  let history = useHistory();

  const onChangeSelectValue = (e) => {
    setRole(e.target.value);
  };

  const login = () => {
    // Axios.post(`/login/${role}`, {
    Axios.post(`/api/login/${role}`, {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.message) {
        console.log(response.data.message);
      } else {
        history.push(`/${role}`);
      }
    });
  };

  return (
    <div className="App">
      <div>
        <img src="https://th.bing.com/th/id/OIP.AZ_2VgLxeAuO5-lkgIzWfQHaHa?pid=ImgDet&w=177&h=177&c=7" />
      </div>
      <div className="login">
        <h1>Login</h1>
        <input
          type="text"
          placeholder="Username..."
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password..."
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div>
          <div>
            <select id="list" onChange={onChangeSelectValue}>
              <option value="normaluser">Customer</option>
              <option value="admin">Admin</option>
              <option value="dp">Delivery Person</option>
            </select>
          </div>
          <button onClick={login}> Login </button>
          <button
            onClick={() => {
              history.push("/registration");
            }}
          >
            {" "}
            Signup{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
