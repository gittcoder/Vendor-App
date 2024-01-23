import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { fade } from "@material-ui/core/styles/colorManipulator";
import withStyles from "@material-ui/core/styles/withStyles";
import HomeIcon from "@material-ui/icons/Home";
import history from "../../Utils/history";
import { Button } from "@material-ui/core";
import navbarcss from "./navbarcss.css";


const styles = theme => ({
  root: {
    width: "100%"
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
    width: "100%"
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex"
    }
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  }
});

class NavBar extends React.Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    status:"Log In",
    display:"none",
    user:""
  };

  componentDidMount()
  {
    if(localStorage.getItem("user")==null)
    {
      this.setState({status:"Log In",display:"none"});
    }
    else
    {
      this.setState({status:"Log Out",display:"block"});
    }
  }


  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



    

    return (
      <div className={classes.root}>
        <AppBar position="static" color="primary">
          <Toolbar>
       
            <Typography
              className={classes.title}
              variant="h6"
              color="inherit"
              noWrap
            >


<div className="logo-securify-navbar">
             
              <span className="navbar-securify">Vendor App
              </span>

              </div>
            </Typography>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
            
          <div className="navbar-options" style={{display:"flex"}}>
              <span className="nav-username">{localStorage.getItem("user")===null?" ":localStorage.getItem("user")}</span>
              <Button variant="outlined" color="inherit" style={{color:"white",borderColor:"white"}}
              onClick={()=>{if(localStorage.getItem("user")===null)
              {
                history.push("/login")}
              else{localStorage.removeItem("user");
              localStorage.removeItem("pwd");
              localStorage.removeItem("gauth");
              localStorage.removeItem("Token");
              localStorage.removeItem("vendors");
                history.push("/login")}}}>
                {this.state.status}
              </Button>
              
              </div>
            </div>
          </Toolbar>
        </AppBar>
       
        
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
