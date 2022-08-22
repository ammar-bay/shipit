import React, { useState } from 'react';
import Axios from "axios";
import "../App.css";
import { useHistory } from "react-router";

export default function Orderplace() {
    const [item_type, setItemType] = useState("Non-fragile")
    const [weight, setWeight] = useState(-1)
    const [pickup, setPickup] = useState("DHA")
    const [dest, setDest] = useState("DHA")
    const [check, setcheck] = useState(true)

    Axios.defaults.withCredentials = true;
    let history = useHistory();
    const placeOrder = () => {
      if(weight>=0 && weight <=10 && pickup!=dest){
        setcheck(true);
        console.log("ORDER PLACED");
        Axios.post("/api/orderplace", {
          item_type: item_type,
          weight: weight,
          pickup: pickup,
          dest: dest,
        }).then((response) => {
          if(response.data === false){history.push('/')}
          history.push('/normaluser')
        });
      }
      else{
        if( pickup==dest){
          setcheck(false)
        }
      }
    };

    const onChangetypeSelectValue = (e) => {
      setItemType(e.target.value);
    };

    const onChangedesttypeSelectValue = (e) => {
      setDest(e.target.value);
    };

    const onChangepicktypeSelectValue = (e) => {
      setPickup(e.target.value);
    };

    return (
      <div className="App">
        <h2>Order Here</h2>
        <form>
          <div>
            ITEM TYPE: 
            <select id="list" onChange={onChangetypeSelectValue}>
              <option value="Non-fragile">Non-fragile</option>
              <option value="Fragile">Fragile</option>
            </select>
            </div>
          <input
            type="number"
            max="10"
            min="0"
            init="-1"
            placeholder="Package Weight"
            onChange={(e) => {
              setWeight(e.target.value);
            }}
          />
                    <div>
            PICK UP LOCATION: 
            <select id="pick" onChange={onChangepicktypeSelectValue}>
              <option value="DHA">DHA</option>
              <option value="IQBAL TOWN">IQBAL TOWN</option>
              <option value="JOHAR TOWN">JOHAR TOWN</option>
              <option value="VALENCIA">VALENCIA</option>
              <option value="ASKARI">ASKARI</option>
              <option value="MODEL TOWN">MODEL TOWN</option>
              <option value="CHAUBURJI">CHAUBURJI</option>
              <option value="GULBERG">GULBERG</option>
              <option value="BAHRIA TOWN">BAHRIA TOWN</option>
              <option value="CAVALARY">CAVALARY</option>
            </select>
            </div>
                    <div>
            DESTINATION: 
            <select id="dest" onChange={onChangedesttypeSelectValue}>
            <option value="DHA">DHA</option>
              <option value="IQBAL TOWN">IQBAL TOWN</option>
              <option value="JOHAR TOWN">JOHAR TOWN</option>
              <option value="VALENCIA">VALENCIA</option>
              <option value="ASKARI">ASKARI</option>
              <option value="MODEL TOWN">MODEL TOWN</option>
              <option value="CHAUBURJI">CHAUBURJI</option>
              <option value="GULBERG">GULBERG</option>
              <option value="BAHRIA TOWN">BAHRIA TOWN</option>
              <option value="CAVALARY">CAVALARY</option>
            </select>
            </div>
        </form>
          <button onClick={placeOrder}>Place Order</button>
          {!check ? <div> cant be same</div> : <div></div>}
      </div>
    );
}
