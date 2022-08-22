import React , {useState} from "react";
import Axios from "axios";
// import "../App.css";
import { useHistory } from "react-router";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function RegistrationDP() {
  let history = useHistory();
  const [status, setStatus] = useState(false);
  const [check, setcheck] = useState(true);

  Axios.defaults.withCredentials = true;

  const initialValues = {
    username: "",
    password: "",
    name:"",
    vehicle_num:"",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    name:Yup.string().min(4).max(20).required(),
    vehicle_num:Yup.string().min(5).max(8).required()
  });

  const onSubmit = (data) => {
    Axios.post("/api/registerdp", data).then((response) => {
      if(response.data === false){history.push('/')}
      else if(response.data === "FALSE"){
        setcheck(false);
      }

      // console.log(data);
      else if(response.data){
        setcheck(true);
        setStatus(false);
        history.push("/admin");
      }
      else{
        setStatus(true);
      }
    });
  };

  return (
    <div className="App">
     <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          {status === true &&
          <label className="exist">Username Already exist</label>}
          <ErrorMessage name="username" component="span" />
          <Field
            autoComplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. Ammar...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autoComplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />
          <label>Name: </label>
          <ErrorMessage name="name" component="span" />
          <Field
            autoComplete="off"
            type="text"
            id="inputCreatePost"
            name="name"
            placeholder="Your Name"
          />
          <label>Vehicle Number: </label>
          <ErrorMessage name="vehicle_num" component="span" />
          <Field
            autoComplete="off"
            type="text"
            id="inputCreatePost"
            name="vehicle_num"
            placeholder="Your Vehicle Num"
          />

          <button type="submit"> Register A DP</button>
          {!check ? <div> username already exists</div> : <div></div>}
        </Form>
      </Formik>
    </div>
    </div>
  );
}
