import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import "../App.css";
import { useHistory } from "react-router";

export default function PaymentUpdate() {
    const [tot_charge, setcharge] = useState("");

    Axios.defaults.withCredentials = true;
    let history = useHistory();
    const initialValues = {
      status: "",
    };
  
    const validationSchema = Yup.object().shape({
      status: Yup.string().min(0).required()
    });
  

    const verifystatus = (data) => {
      console.log("GOING");
        Axios.post("/api/delivered", {
        data
      }).then((response) => {
        if(response.data === false){history.push('/')}
        else
        {
          history.push("/dp");
        }
      });
      };

    return (
        <div className="App">
      <div className="register">
        <h1>Status Update</h1>
            <button onClick={verifystatus}> Update</button>
      </div>
    </div>
    );
}
