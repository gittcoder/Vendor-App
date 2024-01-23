import React, { Component } from "react";
import history from "../../Utils/history";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { DeleteVendor } from "../../Utils/apiConnect";

import "./Dashboard-css.css";



class Dashboard extends Component {
  state = {
    vendors: [],
    
    nav: false,
    name:"",
    accno:"",
    bank:"",
    add1:"",
    add2:"",
    country:"",
    city:"",
    zip:"",
    display: "0",
    deleteId:0
  };

  handleDelete=(event)=>{
    this.setState({nav:false})
    DeleteVendor(this.state.deleteId)
     

  }

  handleAdd = (event) => {
    event.preventDefault();
    this.state.vendors.map((item) => {
      if (item._id === this.state.addCer) {
        // this.setState({
        //   added:[...this.state.added,this.state.addCer],
        //   shared:this.state.shared+","+this.state.addCer
        // });
        this.setState({
          added: [
            ...this.state.added,
            { _id: item._id, orgname: item.orgName, title: item.courseName },
          ],
        });
      }
    });

    console.log(this.state.addCer);
  };

  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   if (this.state.currentState === "validate") {
  //     return;
  //   }
  //   this.setState({ currentState: "load" });
  //   let shared = "";
  //   this.state.added.map((item) => {
  //     shared += item._id + ":" + item.title + ",";
  //   });
  //   console.log(localStorage.getItem("orgname"));
  //   AddVendor(
  //     localStorage.getItem("user"),
  //     localStorage.getItem("pwd"),
  //     shared,
  //     this.state.requests[this.state.reqid]["_id"]
  //   );

    // let candidateName = `${firstname} ${Message}`;
    // let assignDate = new Date(assignedOn).getTime();
    // generatevendor(
    //   candidateName,
    //   coursename,
    //   organization,
    //   assignDate,
    //   parseInt(duration),
    //   emailId
    // )
    // .then(data => {
    //   if (data.data !== undefined)
    //     this.setState({
    //       currentState: "validate",
    //       User: data.data.User
    //     });
    // })
    // .catch(err => console.log(err));
  // };

  handleRemove = (x) => (event) => {
    console.log("Inside remove");
    event.preventDefault();
    let c = [];
    this.state.added.map((item, index) => {
      if (index !== x) {
        c.push(item);
      }
    });
    this.setState({ added: c });
  };

  handleChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidMount() {
    if (localStorage.getItem("user") === null) {
      history.push("/login");
    }

    const getHeader = {
      headers: {
        Accept: "application/json",
      },
    };
    const postHeader = {
      method: "POST",
      headers: {
        ...getHeader,
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      },
    };
    console.log(localStorage.getItem("user"));
    fetch(`http://localhost:3001/getVendors`, {
      ...postHeader,
      body: JSON.stringify({
        email: localStorage.getItem("user"),
        pass: localStorage.getItem("pwd"),
        gauth: localStorage.getItem("gauth"),
        token:localStorage.getItem("Token"),
      }),
    })
      .then(async (res) => {
        if (res.status === 200) {
          await res.json().then((body) => {
            // let c = [];
            localStorage.setItem("vendors",body["0"]["vendors"]);
            let v= JSON.parse(body["0"]["vendors"]);
            console.log(body["0"]);
          
            
            this.setState({ vendors: v});
            console.log(this.state.vendors);
            
          });

        
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    return (
      <div
        className="dashboard-page"
        style={{
          display: "flex",
          flexDirection: "column",
          flexFlow: "column wrap",
        }}
      >
        <div className="vendors-dashboard">
          <div className="dashboard-heading">
          
          <div
                    className="button-add-vendor"
                    id="button-6"
                    onClick={() => {
                      history.push("/AddVendor");
                    }}
                  >

                    <a className="add-vendor" >
                      Add Vendor
                    </a>
                  </div>
                  </div>
          
         
          {this.state.vendors.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexFlow: "row wrap",
                backgroundColor: "#2096F3",
                margin: "10px 10px 10px",
                borderRadius: "10px",
                width: "90%",
                position: "relative",
                top: "120%",
                left: "6%",
                height: "auto",
              }}
            >
              <span
                style={{ color: "white" ,padding:"40px"}}
                className="vendors-view-dashboard"
              >
                No Records Found..!
              </span>
            </div>
          ) : (
            <div className="vendor-list-dashboard">
              {this.state.vendors.map((item, index) => (
                <div
                  className={"v" + index+ " "+ "dashboard-user-vendor" } 
                  key={index}
                >
                 
                
                <div className="vendor-details-view-expanded">
                 
                 <p className="view-org-name" style={{ fontSize: "15px" }}>
                   Vendor Name : {item.Vendor}
                    <EditIcon className="icon-item-edit" onClick={()=>{history.push("/EditVendor/"+index)}}/>
                    <DeleteIcon className="icon-item-delete" onClick={()=>{this.setState({nav:true,deleteId:index})}}/>
                 </p>
                 
                 <p className="view-org-name" style={{ fontSize: "15px" }}>
                   Account Number : {item.Account}
                 </p>
                 <p className="view-org-name" style={{ fontSize: "15px" }}>
                   Bank Name : {item.Bank}
                 </p>
                 <p className="view-org-name" style={{ fontSize: "15px" }}>
                   Address :<br></br> {item.Address1},{item.Address2},{item.Country},{item.City},{item.Zip}
                
                </p>
               </div>
                  
                </div>
              ))}
            </div>
          )}
        </div>

        <Dialog
        open={this.state.nav}
        onClose={()=>{this.setState({nav:false})}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this Vendor ?"}
        </DialogTitle>
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
          <button onClick={()=>{this.setState({nav:false})}}>No</button>
          <button onClick={()=>this.handleDelete()} autoFocus>
            Yes
          </button>
        </DialogActions>
      </Dialog>

         
        </div>
      
    );
  }
}

export default Dashboard;
