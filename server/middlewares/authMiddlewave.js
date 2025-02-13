import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ message: "Not authorized. Try logging in again." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const resp = await User.findById(decodedToken.userId).select(
      "isAdmin email"
    );

    if (!resp) {
      return res
        .status(401)
        .json({ message: "User not found. Try logging in again." });
    }

    req.user = {
      email: resp.email,
      isAdmin: resp.isAdmin,
      userId: decodedToken.userId,
    };

    next();
  } catch (error) {
    console.error(error);
    return res
      .status(401)
      .json({ message: "Not authorized. Try logging in again." });
  }
};

const isAdminRoute = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    return res.status(401).json({
      status: false,
      message: "Not authorized as admin. Try login as admin.",
    });
  }
};

export { isAdminRoute, protectRoute };
