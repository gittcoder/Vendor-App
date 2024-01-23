import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import {EditVendors} from "../../Utils/apiConnect";
import "./SignUpCss.css";
import { login } from "../../Utils/apiConnect";


const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    [theme.breakpoints.up("sm")]: { width: 250 },
    [theme.breakpoints.down("sm")]: { width: 200 }
  },
  dense: {
    marginTop: 16
  },
  menu: {
    width: 200
  },
  paper: {
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing.unit,
      padding: `${theme.spacing.unit * 2}px`
    },
    minHeight: "75vh",
    maxWidth: "95%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit * 4}px ${theme.spacing.unit * 8}px ${theme
      .spacing.unit * 3}px`
  },
  rightpaper: {
    [theme.breakpoints.up("sm")]: {
      maxHeight: "75vh"
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: "95%",
      margin: theme.spacing.unit * 2
    },
    maxWidth: "60%",
    minWidth: "60%",
    margin: theme.spacing.unit * 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  verificationBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyItems: "center",
    height: "100%",
    marginTop: theme.spacing.unit * 3
  },
  courseField: {
    [theme.breakpoints.up("sm")]: {
      width: "60%"
    },
    [theme.breakpoints.down("sm")]: {
      minWidth: "80vw"
    }
  },
  submitBtn: {
    marginLeft: "50px"
  }
});

class EditVendor extends React.Component {
componentDidMount()
{
    const id = this.props.match.params.id;
    let v = JSON.parse(localStorage.getItem("vendors"));
    this.setState({
        name:v[id].Vendor,
        accno:v[id].Account,
        bank:v[id].Bank,
        add1:v[id].Address1,
        add2:v[id].Address2,
        city:v[id].City,
        country:v[id].Country,
        zip:v[id].Zip
    });
}

  state = {
    name:"",
    accno:"",
    bank:"",
    add1:"",
    add2:"",
    city:"",
    country:"",
    zip:"",
      currentState:"normal"
  };

  subData = ()=> {
    // event.preventDefault();
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
    const {
      User,
      pass,
      Gauth,
      Token
    } = this.state;
    
    login(
      User,
      pass,
      Gauth,
      Token
    )
      
     
  };

    

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  submitData = event => {
    event.preventDefault();
    if (this.state.currentState === "validate") {
      return;
    }
    this.setState({ currentState: "load" });
    const {
      name,
      accno,
      bank,
      add1,
      add2,
      city,
      country,
      zip
    } = this.state;
    EditVendors(
        this.props.match.params.id,
      name,
      accno,
      bank,
      add1,
      add2,
      city,
      country,
      zip

    )

  };

  render() {
    const { classes } = this.props;
    const {
      name,
      accno,
      bank,
      add1,
      add2,
      city,
      country,
      zip,
      currentState
    } = this.state;
    return (
      <div className="SignUp-Body">
      <div className="sign-up-container">
        <div className="sign-up-title">Edit Vendor Details</div>
        <div className="sign-up-content">
          <form action="#" className={classes.container + " form"}
          autoComplete="off"
          onSubmit={this.submitData}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Vendor Name</span>
                <input type="text" placeholder="Vendor Name" required
                id="firstname"
                value={name}
                onChange={this.handleChange("name")}
                className={classes.textField}
                />
              </div>
              <div className="input-box">
                <span className="details">Bank Account Number</span>
                <input type="text" placeholder="Enter Bank Account Number" required
                id="lastname"
                className={classes.textField}
                value={accno}
                onChange={this.handleChange("accno")}
                
                />
              </div>
              
              <div className="input-box">
                <span className="details">Bank Name</span>
                <input type="text" placeholder="Enter Bank Name" required  
                id="email"
                      className={classes.textField}
                      value={bank}
                      onChange={this.handleChange("bank")}
                />
              </div>
              <div className="input-box">
                <span className="details">Address Line 1</span>
                <input type="text" placeholder="Address Line 1" required
                id="firstname"
                value={add1}
                onChange={this.handleChange("add1")}
                className={classes.textField}
                />
              </div>
              <div className="input-box">
                <span className="details">Address Line 2</span>
                <input type="text" placeholder="Enter Address Line 2" required
                id="lastname"
                className={classes.textField}
                value={add2}
                onChange={this.handleChange("add2")}
                
                />
              </div>
             
              <div className="input-box">
                <span className="details">Country</span>
                <input type="text" placeholder="Country" required
                id="pwd"
                      className={classes.textField}
                      value={country}
                      onChange={this.handleChange("country")}
                />
              </div>
              <div className="input-box">
                <span className="details">City</span>
                <input type="text" placeholder="Enter Bank Name" required  
                id="email"
                      className={classes.textField}
                      value={city}
                      onChange={this.handleChange("city")}
                />
              </div>
              <div className="input-box">
                <span className="details">Zip Code</span>
                <input type="text" placeholder="Enter Zip Code" required
                id="firstname"
                value={zip}
                onChange={this.handleChange("zip")}
                className={classes.textField}
                />
              </div>

           
            </div>
            
            <div className= "submit-button-reg">
            <div className="sign-up-button"  >
              <input type="submit" value="Save"
              currentState={currentState}
              className={classes.submitBtn } />
            </div>
     
            
          
           
            
            </div>

          </form>
        </div>
      </div>
      
    
    </div>
    );
  }
}

EditVendor.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditVendor);
