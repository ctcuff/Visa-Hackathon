import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import About from "./components/about.component";
import Farms from "./components/farms.component";
import Shop from "./components/shop.component";
import Account from "./components/account.component";
import Merchant from "./components/merchant.component";
import FarmerManage from "./components/farmer.manage.component";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/farms" component={Farms} />
        <Route path="/shop" component={Shop} />
        <Route path="/account" component={Account} />
        <Route path="/merchant" component={Merchant} />
        <Route path="/farmermanage" component={FarmerManage} />
      </div>
    </Router>
  );
}

export default App;
