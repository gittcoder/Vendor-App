const { mongoose } = require("./mongoose");



const LoginSchema = new mongoose.Schema({

  Password: {
    type: String,
    required: true,
    trim: true
  },
  FirstName: {
    type: String,
    required: true,
    trim: true
  },
  LastName: {
    type: String,
    required: true,
    trim: true
  },
  Email: {
    type: String,
    required: true,
    trim: true
  },
  Gauth: {
    type: String,
    required: true,
    trim: true
  },
  Token: {
    type: String,
    required: true,
    trim: true
  },
  Vendors:
  {
    type: String,
    required: true,
    trim: true
  }
});

LoginSchema.methods.toJSON = function() {
  const data = this;
  const obj = data.toObject();

  return {
    obj,
    User: obj.email.toString(),
    _id: undefined,
    __v: undefined
  };
};



const Login = mongoose.model("login", LoginSchema);

module.exports = Login;
