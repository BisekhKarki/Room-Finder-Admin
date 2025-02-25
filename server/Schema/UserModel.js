const mongoose = require("mongoose");

const user = new mongoose.Schema({
  FirstName: {
    type: String,
  },
  LastName: {
    type: String,
  },
  Email: {
    type: String,
  },
  Phone: {
    type: String,
  },
  Address: {
    type: String,
  },
  UserType: {
    type: String,
  },
  Password: {
    type: String,
  },
});

const userModel = mongoose.models.user || mongoose.model("User", user);
module.exports = userModel;
