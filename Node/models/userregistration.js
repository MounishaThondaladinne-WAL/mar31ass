var mongoose = require("mongoose");
var UserSchema = new mongoose.Schema({
  username: { type: String, required: true, maxLength: 20 },
  dob: { type: Date, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
});
module.exports = mongoose.model("User", UserSchema);
