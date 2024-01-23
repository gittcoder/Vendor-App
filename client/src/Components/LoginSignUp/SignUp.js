import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { SignUp } from "../../Utils/apiConnect";
import "./SignUpCss.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { login } from "../../Utils/apiConnect";

const styles = (theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up("sm")]: { width: 250 },
    [theme.breakpoints.down("sm")]: { width: 200 },
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing.unit,
      padding: `${theme.spacing.unit * 2}px`,
    },
    minHeight: "75vh",
    maxWidth: "95%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 8}px ${
      theme.spacing.unit * 3
    }px`,
  },
  rightpaper: {
    [theme.breakpoints.up("sm")]: {
      maxHeight: "75vh",
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "95%",
      margin: theme.spacing.unit * 2,
    },
    maxWidth: "60%",
    minWidth: "60%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${
      theme.spacing.unit * 3
    }px`,
  },
  verificationBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    height: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  courseField: {
    [theme.breakpoints.up("sm")]: {
      width: "60%",
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "80vw",
    },
  },
  submitBtn: {
    marginLeft: "50px",
  },
});

class GenerateForm extends React.Component {
  state = {
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    gender: "",
    pass: "",
    User: "",
    Gauth: "",
    Token: "",
    currentState: "normal",
  };

  subData = () => {
    // event.preventDefault();
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
    const { User, pass, Gauth, Token } = this.state;

    login(User, pass, Gauth, Token);
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
    const { firstname, lastname, email, pass } = this.state;
    SignUp(firstname, lastname, email, pass);
  };

  render() {
    const { classes } = this.props;
    const {
      firstname,
      lastname,
      email,
      phone,
      gender,
      pass,
      User,
      currentState,
    } = this.state;
    return (
      <div className="SignUp-Body">
        <div className="sign-up-container">
          <div className="sign-up-title">Registration</div>
          <div className="sign-up-content">
            <form
              action="#"
              className={classes.container + " form"}
              autoComplete="off"
              onSubmit={this.submitData}
            >
              <div className="user-details">
                <div className="input-box">
                  <span className="details">First Name</span>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    required
                    id="firstname"
                    value={firstname}
                    onChange={this.handleChange("firstname")}
                    className={classes.textField}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Last Name</span>
                  <input
                    type="text"
                    placeholder="Enter your last"
                    required
                    id="lastname"
                    className={classes.textField}
                    value={lastname}
                    onChange={this.handleChange("lastname")}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Email</span>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    required
                    id="email"
                    className={classes.textField}
                    value={email}
                    onChange={this.handleChange("email")}
                  />
                </div>

                <div className="input-box">
                  <span className="details">Password</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                    id="pwd"
                    className={classes.textField}
                    value={pass}
                    onChange={this.handleChange("pass")}
                  />
                </div>
                <div className="input-box">
                  <span className="details">Confirm Password</span>
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className="submit-button-reg">
                <div className="sign-up-button">
                  <input
                    type="submit"
                    value="Register"
                    currentState={currentState}
                    className={classes.submitBtn}
                  />
                </div>
                <p className="social-text">Or</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

GenerateForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenerateForm);
