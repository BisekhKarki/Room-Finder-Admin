const mongoose = require("mongoose");
const { Schema } = mongoose;

const forApproval = new mongoose.Schema({
  basic: {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    description: {
      type: String,
    },
    price: {
      type: String,
    },
  },
  location: {
    street: {
      type: String,
    },
    zip: {
      type: String,
    },
    city: {
      type: String,
    },
    Province: {
      type: String,
    },
    landmark: {
      type: String,
    },
    region: {
      type: String,
    },
  },
  features: {
    parking: {
      type: String,
    },
    Kitchen: {
      type: String,
    },
    balcony: {
      type: String,
    },
    category: {
      type: String,
    },
    waterfacility: {
      type: String,
    },
    direction: {
      type: String,
    },
    floor: {
      type: String,
    },
  },
  images: {
    type: Array,
  },
  contact: {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  landlordId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  payment: {
    type: Boolean,
    default: false,
  },
});

const approveRoom =
  mongoose.models.forApproval || mongoose.model("Rooms_Pending", forApproval);

module.exports = approveRoom;
