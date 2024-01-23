import React,{Component} from "react";

import "./SignUpBoth.css";
import history from "../../Utils/history";
import { login } from "../../Utils/apiConnect";
// import './App.css';
import { GoogleLogin } from '@react-oauth/google';
// import jwt_decode from "jwt-decode";







class Container1 extends Component{

  componentDidMount()
  {
    if(localStorage.getItem("user")!==null)
    {
      if(localStorage.getItem("privilege"==="normal"))
      history.push("/dashboard");
      else
      history.push("/OrgHome")
    }
  }

  state={
    currentState: "normal",
    UserName:"Username",
    Password:"Password",
  }
  


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };


  // loginGoogle= event =>{
  //   event.preventDefault();
  //   console.log("yoo!!!");
  //   const a = useGoogleLogin({
  //     onSuccess: tokenResponse => console.log(tokenResponse),
  //   });
  // }

  submitData = event => {
    event.preventDefault();
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
    const {
      UserName,
      Password,
    } = this.state;
    
    login(
      UserName,
      Password
    )
      
     
  };


    render(){
  return (
    <div className="signin-signup-container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder={this.state.UserName} onChange={this.handleChange("UserName")} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder={this.state.Password} onChange={this.handleChange("Password")} />
            </div>
            <input type="submit" value="Login" className="login-page-btn solid" onClick={this.submitData} />
            <p className="social-text">Or</p>
            <div className="social-media">
          
           
             { <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>}
      
            </div>
          </form>
       
      </div>
    </div>
    </div>
  );
        }
}

export default Container1;
