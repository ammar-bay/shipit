import React, { useEffect} from "react";
import Axios from "axios";

export default function Main() {
  console.log("MAIN PAGE");
  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("/api/login").then((response) => {
      if (response.data.loggedIn === true) {
      }
    });
  }, []);

  return (
    <div>
    </div>
  );
}
