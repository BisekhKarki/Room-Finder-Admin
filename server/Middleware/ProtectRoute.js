const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const protectRoute = async (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const splitToken = token.split(" ")[1];
    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decodedToken = jwt.decode(splitToken, process.env.JWT_SECRET);

    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid Token",
    });
  }
};

module.exports = protectRoute;
