import React , {useState} from "react";
import Axios from "axios";
import "../App.css";
import { useHistory } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Registration() {
  let history = useHistory();
  const [status, setStatus] = useState(false);
  const [check, setcheck] = useState(true);


  Axios.defaults.withCredentials = true;

  const initialValues = {
    username: "",
    phone: "",
    name: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    phone: Yup.string().required(),
    name: Yup.string().required(),
  });

  const onSubmit = (data) => {
    Axios.post("/api/register", data).then((response) => {
      console.log(data);
      if(response.data==="FALSE"){
        setcheck(false)
      }
      else if(response.data){
        setcheck(true);
        console.log("hellooo");
        setStatus(false);
        history.push("/");
      }
      else{
        setStatus(true);
      }
    });
  };

  return (
    <div className="App">
      <div className="register">
        <h1>Registration</h1>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          <Form className="formContainer">
            <Field
              autoComplete="off"
              id="inputCreatePost"
              name="username"
              placeholder="Username"
            />

            <Field
              autoComplete="off"
              type="text"
              id="inputCreatePost"
              name="name"
              placeholder="Name"
            />

            <Field
              autoComplete="off"
              type="text"
              id="inputCreatePost"
              name="phone"
              placeholder="Contact Number"
            />

            <Field
              autoComplete="off"
              type="password"
              id="inputCreatePost"
              name="password"
              placeholder="Password"
            />

            <button type="submit"> Register</button>
          {!check ? <div> username already exists</div> : <div></div>}


            <br></br>

            <ErrorMessage name="password" component="span" />
            {status === true && (
              <label className="exist">Username Already exist</label>
            )}
            <br></br>
            <ErrorMessage name="username" component="span" />
            <br></br>
            <ErrorMessage name="name" component="span" />
            <br></br>
            <ErrorMessage name="phone" component="span" />
          </Form>
        </Formik>
      </div>
    </div>
  );
}
