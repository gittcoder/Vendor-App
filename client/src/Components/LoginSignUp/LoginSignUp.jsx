import React, { Component } from "react";

import "./SignUpBoth.css";
import "./LoginSignUpStyle.css";
import history from "../../Utils/history";
import { login } from "../../Utils/apiConnect";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

class LoginSignUp extends Component {
  componentDidMount() {
    if (localStorage.getItem("user") !== null) {
      if (localStorage.getItem("privilege" === "normal"))
        history.push("/dashboard");
    }
  }

  state = {
    currentState: "normal",
    UserName: "Email",
    Password: "Password",
    Gauth: false,
    Token: "abcd",
    FName: "abcd",
    LName: "abcd",
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submitData = (event) => {
    event.preventDefault();
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
    const { UserName, Password, Gauth, Token } = this.state;

    login(UserName, Password, Gauth, Token);
  };
  subData = () => {
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
    const { UserName, Password, Gauth, Token, FName, LName } = this.state;

    login(UserName, Password, Gauth, Token, FName, LName);
  };

  render() {
    return (
      <div className="signin-signup-container">
        <div className="forms-container">
          <div className="signin-signup">
            <form action="#" className="sign-in-form">
              <h2 className="title" style={{color:"white"}}>Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input
                  type="text"
                  placeholder={this.state.UserName}
                  onChange={this.handleChange("UserName")}
                />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input
                  type="password"
                  placeholder={this.state.Password}
                  onChange={this.handleChange("Password")}
                />
              </div>
              <input
                type="submit"
                value="Login"
                className="login-page-btn solid"
                onClick={this.submitData}
              />
              <p className="social-text">Or</p>
              <br></br>
              <div className="social-media">
                {
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      let cred = jwtDecode(credentialResponse.credential);
                      console.log(cred);
                      this.setState({
                        UserName: cred.email,
                        Password: cred.sub,
                        Gauth: true,
                        Token: cred.sub,
                        FName: cred.given_name,
                        LName: cred.family_name,
                      });
                      this.subData();
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                }
                
              </div>
                <br></br>
           
        
              <a href="#" className="social-text" style={{textDecoration:"underline"}}  onClick={()=>history.push("/SignUp")}>Dont have an account ? </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginSignUp;
