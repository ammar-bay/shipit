import Axios from "axios";
import React, { useState,useEffect } from "react";
import { useHistory } from "react-router";

export default function Calculatefare()
{
    const [weight, setweight] = useState(-1);
    const [fare, setfare] = useState(0);
    Axios.defaults.withCredentials = true;
    let history = useHistory();

    let comp;
    if (weight>=0) {
        comp = <p1>Estimate Fare for weight {weight}kg is {fare}</p1> 
      }

    return (
        <div className="cal_fare">
            <h1> Calculate Fare </h1>
            <div className="number_inputs">
                <p1>Select Approximate Weight in Kilograms (0-10) </p1>
                <br></br>
                <input
                type="number"
                value={weight && Math.max(0, weight)}
                onChange={ e => 
                    { 
                    if(e.target.value<=10 && e.target.value>=0){
                        setweight(e.target.value);
                        setfare(200+e.target.value*500/10)}
                    else{
                        setweight(0);
                        setfare(200+0*500/10)
                    }
                }}
                placeholder="Input Weight"
                />
            </div>
            <div className="x">
            {comp} 
            </div>
            <button onClick={()=>{
            history.push("/normaluser");
          }}> Back </button>
        </div>   
        );       
};