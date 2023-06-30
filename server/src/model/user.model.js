import mongoose from "mongoose";
import bcrypt from "bcrypt";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "Name is required"],
  },

  email: {
    type: String,
    trim: true,
    unique: [true, "Email already exists!"],
    match: [/.+\@.+\..+/, "Please fill a valid email address!"],
    required: [true, "Email is required"],
  },

  created: {
    type: Date,
    default: Date.now,
  },

  hashed_password: {
    type: String,
    required: [true, "Password is required"],
  },

  salt: {
    type: String,
    required: true,
  },
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = bcrypt.genSaltSync(10);
    this.hashed_password = bcrypt.hashSync(password, this.salt);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods = {
  authenticate: function (plainText) {
    return bcrypt.compareSync(plainText, this.hashed_password);
  },
};



export default mongoose.model("User", UserSchema);
