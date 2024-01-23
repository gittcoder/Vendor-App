require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const cors = require('cors')

if (process.env.NODE_ENV === undefined) process.env.NODE_ENV = "development";
// const Certificates = require("./model/Certificates");
// const Requests = require("./model/Requests");
const Login = require("./model/Login");
// const Vendor = require("./model/VendorSchema");

// parse application/x-www-form-urlencoded
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// logger
app.use((req, res, next) => {
  const now = new Date().toString().slice(4, 24);
  res.on("finish", () => {
    console.log(`${now} ${req.method} ${res.statusCode} ${req.url}`);
  });
  next();
});

// CORS
if (process.env.NODE_ENV !== "production") app.use(require("cors")());



if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(
    `This is a ${
      process.env.NODE_ENV
    } environment.\nServer is up on port ${port}`
  );
});

// app.get("/certificate/data/:id", (req, res) => {
//   let certificateId = req.params.id;
//   console.log(certificateId)
//   Certificates.findById(certificateId)
//     .then(obj => {
//       if (obj === null)
//         res.status(400).send({ err: "Certificate data doesn't exist" });
//       else res.send(obj);
//     })
//     .catch(err => res.status(400).send({ err }));
// });

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '/index.html'));
// });


// app.get("/certificate/verify/:id", (req, res) => {
//   let certificateId = req.params.id;
//   console.log(certificateId);
//   // Certificates.findById(certificateId)
//   //   .then(obj => {
//   //     obj.verifyData().then(verified => {
//   //       if (verified) res.status(200).send({message:"letsgoo"});
//   //       else res.status(401).send();
//   //     });
//   //   })
//   //   .catch(err =>
//   //     res.status(400).send({ err: "No data found for the given certificateId" })
//   //   );
// });

app.post("/login", (req, res) => {
  const { email,pass,gauth,token,fname,lname } = req.body
  // console.log(req.body);
  // console.log(certificateId);
  Login.find({Email:email}).then(data=>{
    if(data.length===0)
    {
      if(gauth===true)
      {
        console.log("NewUser!!!");
        const login = new Login({
          Password:pass, FirstName:fname, LastName:lname, Email:email, Gauth:true, Token:pass,Vendors:"[]"
        });
      
        login
          .save().then(res.status(200).send({result:"Success",privilege:"normal"})).catch(err => {console.log(err);
            res.status(401).send(err)});
      }
      else
      {
          res.status(400).send({result:"Invalid Credentials!!!"});
      }
    }
    else
    {
      
      if((data[0].Gauth=='true' && data[0].Token==token)||pass===data[0].Password)
      {
      console.log(data);
      res.json({result:"Success",privilege:"normal"});
      }
      else if(gauth==true)
      {
        Login.findOneAndUpdate({Email:email},{Gauth:'true',Token:token}).then((data)=>
        {
          console.log(data)
          res.send({result:"Success",privilege:"normal"})
        })
      }
      else
      {
        res.status(400).send({result:"Invalid Credentials!!!"});
      }
    }
  })
    .catch(err =>
      res.status(400).send({ err: "Invalid Credentials!!!" })
    );
    
    
});


app.post("/signup", (req, res) => {
  const {firstname, lastname, email, pass } = req.body;
  console.log(req.body);
  Login.find({Email:email}).then(data=>{
  if(data.length===0)
  {
    console.log("NewUser!!!");
    const login = new Login({
      Password:pass, FirstName:firstname, LastName:lastname, Email:email, Gauth:false, Token:"abcd",Vendors:"[]"
    });
  
    login
      .save().then(res.status(200).send({result:"Success",privilege:"normal"})).catch(err => {console.log(err);
        res.status(400).send(err)});
    
  }
  else
  {
    res.status(400).send({result:"User Exists!!!"});
  }
})

    
    });


    
    



app.post("/AddVendor",(req,res)=>{
  const {email,pass,gauth,token,name,accno,bank,add1,add2,city,country,zip} = req.body;
  Login.find({Email:email}).then(data=>{
    if(data.length!==0)
    {
      // console.log(pass,data.Password)
      if((data[0].Gauth=='true' && data[0].Token==token)||pass===data[0].Password)
      {
        let v = JSON.parse(data[0].Vendors);
        let vendors={Id:v.length+1,Vendor:name,Account:accno,Bank:bank,Address1:add1,Address2:add2,City:city,Country:country,Zip:zip}
        
        v.push(vendors);
        console.log(JSON.stringify(v));
      Login.findOneAndUpdate({Email:email},{Vendors:JSON.stringify(v)}).then((data)=>
      {
        console.log(data)
        res.send({result:"Success"})
      })
    }

  }
  else
  {
    res.status(400).send({status:"User Exists!!!"});
  }
})

})


app.post("/EditVendor",(req,res)=>{
  const {email,pass,gauth,token,index,name,accno,bank,add1,add2,city,country,zip} = req.body;
  Login.find({Email:email}).then(data=>{
    if(data.length!==0)
    {
      if((data[0].Gauth=='true' && data[0].Token==token)||pass===data[0].Password)
      {
        let x=[];
        let v = JSON.parse(data[0].Vendors);
        v[index]={Vendor:name,Account:accno,Bank:bank,Address1:add1,Address2:add2,Country:country,City:city,Zip:zip}
        Login.findOneAndUpdate({Email:email},{Vendors:JSON.stringify(v)}).then((data)=>
        {
          console.log(data)
          res.send({result:"Success"})
        })
    }

  }
  else
  {
    res.status(400).send({status:"User Exists!!!"});
  }
})

})

app.post("/DeleteVendor",(req,res)=>{
  const {email,pass,gauth,token,index} = req.body;
  Login.find({Email:email}).then(data=>{
    if(data.length!==0)
    {
      if((data[0].Gauth=='true' && data[0].Token==token)||pass===data[0].Password)
      {
        let x=[];
        let v = JSON.parse(data[0].Vendors);
        if(v.length===1)
        {
          v=[]
        }
        else
        {
        v=v.splice(index,1)
        }
        console.log(v)
        Login.findOneAndUpdate({Email:email},{Vendors:JSON.stringify(v)}).then((data)=>
        {
          console.log(data)
          res.send({result:"Success"})
        })
    }

  }
  else
  {
    res.status(400).send({status:"User Exists!!!"});
  }
})

})

app.post("/ViewRequests", (req, res) => {
  const { email, pass } = req.body;
 
  console.log(req.body);
  OrgReg.find({emailId:email,Password:pass}).then(data=>{
  if(data.length!==0)
  {
    let r=[]
    console.log("Success!!!");
    
      Requests.find({Email:email}).then(entries2=>{
        // console.log(JSON.stringify(entries2[0]));
        entries2.forEach(data=>{
          console.log(data)
          r.push({_id:data._id,Email:data.Email,ReqTo:data.ReqTo,Message:data.Message,Shared:data.Shared,Status:data.Status,OrgName:data.OrgName})
        })
       res.send([JSON.stringify(r)])
      })
      
   
  }
  else
  {
    res.status(400).send({status:"User Exists!!!"});
  }
})  });


    app.post("/getVendors", (req, res) => {
      const { email, pass,gauth,token } = req.body;
     
      // console.log(req.body);

      Login.find({Email:email}).then(data=>{
      if(data.length!==0)
      {
       console.log(data[0])
        if((gauth=='true' && data[0].Token==token)||pass==data[0].Password)
        {
          console.log(data)
        let r=[]
        console.log("Success!!!");
       res.status(200).send(JSON.stringify([{vendors:data[0].Vendors}]))
        
          
       
        
         
      }
      }
      else
      {
        res.status(400).send({status:"User Exists!!!"});
      }
    })

      
        
        });

module.exports = { app };
