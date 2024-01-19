import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter username"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
  },
  phone: {
    type: String,
    required: [true, "Please enter Phone no"],
  },
  password: {
    type: String,
    required: [true, "Please enter Password"],
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre("save", async function (next) {
  console.log("This:", this);
  const user = this;
  if (!user.isModified("password")) {
    next();
  }

  try {
    const hashed_password = await bcrypt.hash(user.password, 15);
    user.password = hashed_password;
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error.message);
  }
};

const User = mongoose.model("User", UserSchema);

export default User;
