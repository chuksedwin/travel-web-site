const mongoose = require("../mongoose_connect");
// Creating the User Schema by Akachi 
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  address: String,
  city: String,
  province: String,
  country: String,
  postalcode: String,
  homephone: Number,
  businessphone: Number

  
});
// Creating the User collection Model
module.exports = mongoose.model("User", UserSchema);
