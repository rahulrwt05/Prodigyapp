import jwt from "jsonwebtoken";
import User from "../models/user.js";

const protectRoute = async (req, res, next) => {
  try {
    console.log("Cookies:", req.cookies); // 🛠 Debugging step
    let token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ status: false, message: "No token found. Please log in." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const resp = await User.findById(decodedToken.userId).select(
      "isAdmin email"
    );

    if (!resp) {
      return res
        .status(401)
        .json({ status: false, message: "User not found." });
    }

    req.user = {
      email: resp.email,
      isAdmin: resp.isAdmin,
      userId: decodedToken.userId,
    };

    next();
  } catch (error) {
    console.error("Auth Error:", error);
    return res
      .status(401)
      .json({ status: false, message: "Invalid or expired token." });
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
