import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";

const authValidator = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    res.body = parseBody;
    next();
  } catch (err) {
    const status = 422;
    const message = err.errors[0].message;

    const error = { status, message };

    console.log("Error form middleware:", error);

    next(error);
    // console.log(error.errors[0].message);
  }
};

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .send({ success: false, message: "Token not provided" });
  }
  const jwtToken = token.replace("Bearer", "").trim();

  try {
    const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);

    const userData = await User.findOne({ email: isVerified.email }).select({
      password: 0,
    });

    req.user = userData;
    (req.token = token), (req.userID = userData._id);

    next();
  } catch (error) {
    return res
      .status(401)
      .send({ success: false, message: "Unauthorized. Invalid Token" });
  }
};

export { authValidator, authMiddleware };
