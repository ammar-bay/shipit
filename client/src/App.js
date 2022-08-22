import React from 'react';
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import "./App.css";
import Main from "./pages/Main";
import Registration from "./pages/Registration";
import Login from './pages/Login';

import NormalUser from "./components/NormalUser";
import DP from "./components/DP";
import Admin from "./components/Admin";
import Ordertrack from './components/ordertrack';
import Orderplace from './components/orderplace';
import Orderhistory from './components/orderhistory';
import Feedback from './components/feedback';
import Calculatefare from './components/calculatefare';
import RegistrationDP from './components/RegistrationDP';
import Checkfeedback from './components/Checkfeedback';
import FavDest from './components/FavDest';
import Pendingorders from './components/Pendingorders';
import RevenueReport from './components/RevenueReport';
import Webtraffic from './components/Webtraffic';
import Deliveryupdate from './components/Deliveryupdate';
import Homedeliveryupdate from './components/Homedeliveryupdate';
import PaymentUpdate from './components/Paymentupdate';
import Packageweightverification from './components/Packageweightverification';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact render={() => <Login />} />
        <Route path="/registration" exact render={() => <Registration />} />
        <Route path="/registrationdp" exact render={() => <RegistrationDP />} />
        <Route path="/main" exact render={() => <Main />} />
        <Route path="/normaluser" exact render={() => <NormalUser />} />
        <Route path="/dp" exact render={() => <DP />} />
        <Route path="/admin" exact render={() => <Admin />} />
        <Route path="/orderplace" exact render={() => <Orderplace />} />
        <Route path="/orderhistory" exact render={() => <Orderhistory />} />
        <Route path="/ordertrack" exact render={() => <Ordertrack />} />
        <Route path="/feedback" exact render={() => <Feedback />} />
        <Route path="/calculatefare" exact render={() => <Calculatefare />} />
        <Route path="/checkfeedback" exact render={() => <Checkfeedback />} />
        <Route path="/favdest" exact render={() => <FavDest />} />
        <Route path="/pendingorders" exact render={() => <Pendingorders />} />
        <Route path="/webtraffic" exact render={() => <Webtraffic />} />
        <Route path="/revenuereport" exact render={() => <RevenueReport />} />
        <Route path="/deliveryupdate" exact render={() => <Deliveryupdate />} />
        <Route path="/paymentupdate" exact render={() => <PaymentUpdate />} />
        <Route path="/homedeliveryupdate" exact render={() => <Homedeliveryupdate />} />
        <Route path="/packageweightverification" exact render={() => <Packageweightverification />} />

      </Switch>
    </Router>
  );
}

export default App;
