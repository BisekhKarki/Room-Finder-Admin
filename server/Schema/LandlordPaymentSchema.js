const mongoose = require("mongoose");
const { Schema } = mongoose;

const room_payment_schema = new mongoose.Schema({
  purchase_type: {
    type: String,
    required: true,
  },
  room_id: {
    type: Schema.Types.ObjectId,
    ref: "Room",
  },
  landlord_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  name_of_person: {
    type: String,
    require: true,
  },
  payment_amount: {
    type: String,
    required: true,
  },
  purchase_date: {
    type: Date,
    default: new Date(),
  },
  payment_type: {
    type: String,
    default: "Room_Post",
  },
});

const payment_schema =
  mongoose.models.room_payment_schema ||
  mongoose.model("Room_payment_schema", room_payment_schema);

module.exports = payment_schema;
