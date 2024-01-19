import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

const register = async (req, res) => {
  const { username, email, phone, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .send({ success: false, message: `${email} already registered` });
    }

    // const salt = await bcrypt.genSalt(10)
    // const hash = bcrypt.hashSync()

    // const hashed_password = await bcrypt.hash(password, 15);

    const newUser = new User({
      username,
      email,
      phone,
      password,
    });
    await newUser.save();

    return res.status(200).send({
      success: true,
      token: await newUser.generateToken(),
      userId: newUser._id.toString(),
      newUser,
    });
  } catch (error) {
    return res.status(401).send({ success: false, error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    console.log("USer Exist:", userExist);

    if (!userExist) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid Credentials" });
    }

    // const user1 = await bcrypt.compare(password, userExist.password);
    const user = await userExist.comparePassword(password);

    if (user) {
      return res.status(200).send({
        success: true,
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      return res
        .status(401)
        .send({ success: false, message: "Invalid Email or Password" });
    }
  } catch (error) {
    res.status(401).send({ success: false, error: error.message });
  }
};

const user = async (req, res) => {
  const userData = req.user;
  try {
    return res
      .status(200)
      .send({ success: true, message: "boom guys", userData });
  } catch (error) {
    return res.status(401).send({ success: false, error: error.message });
  }
};

export { register, login, user };
