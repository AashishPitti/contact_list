// library
const mongoose = require("mongoose");

//connect
mongoose.connect("mongodb://localhost/contact_list_db");

//connection
const db = mongoose.connection;

//If error
db.on("error", console.error.bind(console, "Error in connecting db"));

//if run successfully
db.once("open", function () {
  console.log("Successfully connected");
});
