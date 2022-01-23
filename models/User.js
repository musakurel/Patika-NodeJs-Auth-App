const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [6, "Please enter at least 6 characters"],
  },
});

// Run Function Before Doc Saved to MongoDB

UserSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Login User Method
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
   const auth= await bcrypt.compare(password, user.password);
   if(auth){
       return user
   }throw Error("Incorrect Password")
  }
  throw Error("User not found");
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
