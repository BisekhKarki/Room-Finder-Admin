const mongoose = require("mongoose");

const user = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    default: "Admin",
  },
});

const UserSchema = mongoose.models.user || mongoose.model("Admin", user);

module.exports = UserSchema;
