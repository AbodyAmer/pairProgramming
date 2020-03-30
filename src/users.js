const { model, Schema } = require("mongoose");

const user = new Schema({
  email: {
    type: "String",
    required: true,
    unique: true
  },
  password: {
    type: "String",
    required: true
  },
  name: {
    type: "String"
  },
  age: {
    type: "Number"
  }
});

const User = model("User", user);

module.exports = User;
