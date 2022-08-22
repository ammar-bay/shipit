import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import "../App.css";
import { useHistory } from "react-router";

export default function PaymentUpdate() {
    const [custlist, setcustlist] = useState([]);
    const [custid, setcustid] = useState([]);

    Axios.defaults.withCredentials = true;
    let history = useHistory();
    const initialValues = {
      weight: 0
    };


    const validationSchema = Yup.object().shape({
      weight: Yup.number().min(0).max(10)
    });
  

    const verifyupdate = (data) => {
        Axios.post("/api/Packageweightverification", {
        data
      }).then((response) => {
        if(response.data === false){history.push('/')}
        if (response.data === true)
        {
          history.push("/dp");
        }
      });
      };

      useEffect(() => {
        Axios
            .get("/api/packageweight")
            .then(res => {
                console.log(res)

              if(res.data === false){history.push('/')}
                console.log(res)
                setcustlist(res.data)
                console.log("HELOO");
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div className="App">
      <div className="register">
        <h1>Weight Update</h1>
            <button onClick={verifyupdate}> Update</button>
      </div>
    </div>
    );
  }

