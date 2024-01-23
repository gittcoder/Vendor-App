const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config({ path: path.resolve(process.cwd(), "../" + ".env") });

let dbuser, dbhost, dbpassword, dbname, dbport;

if (process.env.NODE_ENV === "production") {
  dbhost = process.env.DB_PRODUCTION_HOST;
  dbport = process.env.DB_PRODUCTION_PORT;
} else {
  dbhost = process.env.DB_HOST;
  dbport = process.env.DB_PORT;
}

dbuser = process.env.DB_USER;
dbpassword = process.env.DB_PASSWORD;
dbname = process.env.DB_NAME;

// const mongoURL = `mongodb+srv://Jaw8g3vMbXyQroQW:5XETiuCmuJYVCLP3@cluster0.9h171cg.mongodb.net/?retryWrites=true&w=majority`;
mongoURL="mongodb://localhost:27017/VendorApp"
mongoose.Promise = global.Promise;

mongoose
  .connect(
    mongoURL,
    { useNewUrlParser: true }
  )
  .catch(err => console.log(err));

mongoose.connection.on("connected", err => console.log("MongoDB Connected"));

mongoose.connection.on("error", err => console.log("error: " + err));

module.exports = { mongoose };
