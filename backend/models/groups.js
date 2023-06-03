const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const groupSchema = new mongoose.Schema({
  groupId: {
    type: String,
    required: true,
    unique: true,
  },
  groupName: {
    type: String,
    required: true
  },
  user_id: {
    type: String,
    required: true
  }
  /*members: [
    {
      name: {
        type: String,
        required: true,
      },
      age: {
        type: Number,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      dateOfBirth: {
        type: Date,
        required: true,
      },
    },
  ],*/
}, {timestamps: true});

module.exports = mongoose.model("Group", groupSchema);
