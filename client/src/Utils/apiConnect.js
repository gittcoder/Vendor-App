import { withRouter } from 'react-router-dom'
import React from "react";
import history from './history'
import { useCookies } from 'react-cookie'





const getHeader = {
  headers: {
    Accept: "application/json"
  }
};

const postHeader = {
  method: "POST",
  headers: {
  
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*"

  }
};

let host = "";

// host = "https://6512e81569c2460c636a9e49--lucky-zuccutto-2af8e0.netlify.app";
host="http://localhost:3001";
// host="https://securifybackend.onrender.com";

export const getCertificate = certificateId =>
  fetch(`${host}/certificate/data/${certificateId}`, getHeader)
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });

export const verifyCertificate = certificateId =>
  fetch(`${host}/certificate/verify/${certificateId}`, getHeader)
    .then(res => {
      if (res.status === 200) return true;
      else if (res.status === 401) return false;
    })
    .catch(err => {
      console.log(err);
    });

export const generateCertificate = (
  candidateName,
  courseName,
  orgName,
  assignDate,
  duration,
  emailId
) =>
// console.log("Hello");
  fetch(`${host}/certificate/generate`, {
    ...postHeader,
    body: JSON.stringify({
      candidateName,
      courseName,
      orgName,
      assignDate,
      duration,
      emailId
    })
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err);
    });


    export const SignUp =(firstname,
      lastname,
      email,
      pass
      
      ) =>
    {
      fetch(`${host}/signup`, {
        ...postHeader,
        body: JSON.stringify({
          firstname,
          lastname,
          email,
          pass
          
        })
      })
      .then(async res =>{ if(res.status===200)
        {
          await res.json().then(
            (body)=>{
              console.log(body.result);
              if(body.result=="Success")
              {
                localStorage.setItem('user',email)
                localStorage.setItem('pwd',pass)
                localStorage.setItem("privilege",body.privilege)
                history.push("/dashboard");
              }
            }
          )
        }})
        .catch(err => {
          console.log(err);
        });
    }



   export const login =(UserName,Password,Gauth,Token,fname,lname) =>
    {
      fetch(`${host}/login`, {
        ...postHeader,
        body: JSON.stringify({
          email:UserName,
          pass:Password,
          gauth:Gauth,
          token:Token,
          fname:fname,
          lname:lname
        })
      })
      .then(async res =>{ if(res.status===200)
        {
          await res.json().then(
            (body)=>{
              console.log(body.result);
              if(body.result=="Success")
              {
                localStorage.setItem('user',UserName)
                localStorage.setItem('pwd',Password)
                localStorage.setItem('gauth',Gauth)
                localStorage.setItem('Token',Token)
                localStorage.setItem("privilege",body.privilege)
                
              
                if(body.privilege==="normal")history.push("/dashboard");
                else{localStorage.setItem("orgname",body.orgname);history.push("/OrgHome")}
              }
            }
          )
        }})
        .catch(err => {
          console.log(err);
        });
    }

    
// login.propTypes = {
//   history: React.PropTypes.shape({
//     push: React.PropTypes.func.isRequired,
//   }),
// };

export const EditVendors =(
  index,
  name,
  accno,
  bank,
  add1,
  add2,
  city,
  country,
  zip
  ) =>
{

  fetch(`${host}/EditVendor`, {
    ...postHeader,
    body: JSON.stringify({
      email:localStorage.getItem("user"),
      pass:localStorage.getItem("pwd"),
      gauth:localStorage.getItem("gauth"),
      token:localStorage.getItem("Token"),
      index,
      name,
      accno,
      bank,
      add1,
      add2,
      city,
      country,
      zip
    
      
    })
  })
  .then(async res =>{ if(res.status===200)
    {
      await res.json().then(
        (body)=>{
          console.log(body.result);
          if(body.result=="Success")
          {
            history.push("/dashboard");
          }
        }
      )
    }})
    .catch(err => {
      console.log(err);
    });
}

export const DeleteVendor =(
  index
  ) =>
{

  fetch(`${host}/DeleteVendor`, {
    ...postHeader,
    body: JSON.stringify({
      email:localStorage.getItem("user"),
      pass:localStorage.getItem("pwd"),
      gauth:localStorage.getItem("gauth"),
      token:localStorage.getItem("Token"),
      index 
    })
  })
  .then(async res =>{ if(res.status===200)
    {
      await res.json().then(
        (body)=>{
          console.log(body.result);
          if(body.result=="Success")
          {
            history.push("/dashboard");
          }
        }
      )
    }})
    .catch(err => {
      console.log(err);
    });
}





export const AddVendors =(
  name,
  accno,
  bank,
  add1,
  add2,
  city,
  country,
  zip
  ) =>
{

  fetch(`${host}/AddVendor`, {
    ...postHeader,
    body: JSON.stringify({
      email:localStorage.getItem("user"),
      pass:localStorage.getItem("pwd"),
      gauth:localStorage.getItem("gauth"),
      token:localStorage.getItem("Token"),
      name,
      accno,
      bank,
      add1,
      add2,
      city,
      country,
      zip
    
      
    })
  })
  .then(async res =>{ if(res.status===200)
    {
      await res.json().then(
        (body)=>{
          console.log(body.result);
          if(body.result=="Success")
          {
            history.push("/dashboard");
          }
        }
      )
    }})
    .catch(err => {
      console.log(err);
    });
}

