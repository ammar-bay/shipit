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
      amount: 0,
    };
  
    const validationSchema = Yup.object().shape({
      amount: Yup.number().min(0).max(100000)
    });
  

    const verifycharge = () => {
        Axios.post("/api/paymentup", {
        tot_charge : tot_charge
      }).then((response) => {
        if(response.data === false){history.push('/')}
        if (response.data === true)
        {
          history.push("/dp");
        }
      });
      };

    return (
        <div className="App">
      <div className="register">
        <h1>Payment Update</h1>
            <button onClick={verifycharge}> Update</button>
      </div>
    </div>
    );
}
