const mongoose = require("mongoose");

const user = new mongoose.Schema({
  FirstName: {
    type: String,
    // required: true,
  },
  LastName: {
    type: String,
    // required: true,
  },
  Email: {
    type: String,
    // required: true,
  },
  Phone: {
    type: String,
    // required: true,
  },
  Address: {
    type: String,
    // required: true,
  },
  UserType: {
    type: String,
    // required: true,
  },
  Password: {
    type: String,
    // required: true,
  },
});

const userModel = mongoose.models.user || mongoose.model("User", user);
module.exports = userModel;
