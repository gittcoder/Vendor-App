import React, { Component } from "react";
import "./App.css";
// import SignIn from "./Components/LoginSignUp/SignIn";

import { Switch, Route } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Dashboard from "./Components/User/Dashboard";
import AddVendor from "./Components/Vendors/AddVendor";
import SignUp from './Components/LoginSignUp/SignUp'
import history from './Utils/history'
import { CookiesProvider } from "react-cookie";
import LoginSignUp from "./Components/LoginSignUp/LoginSignUp";
import { GoogleOAuthProvider } from '@react-oauth/google';
import EditVendor from "./Components/Vendors/EditVendor";



class App extends Component {
  render() {
    return (
      <div className="App" style={{ backgroundColor: "#fafafa" }}>
        <CookiesProvider>
        
        <NavBar />
        <GoogleOAuthProvider clientId="1020309297433-6hbpfttka96rb9hq48ah8sc3m3d0quqv.apps.googleusercontent.com">
        <Switch history={history}>
          <Route path="/login" component={LoginSignUp} />
          <Route path="/SignUp" component={SignUp} />
          <Route path="/AddVendor" component={AddVendor} />
          <Route path="/EditVendor/:id" component={EditVendor} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
        </GoogleOAuthProvider>
        </CookiesProvider>
      </div>
    );
  }
}

export default App;
