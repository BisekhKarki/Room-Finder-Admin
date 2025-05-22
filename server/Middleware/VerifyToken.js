const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const verifyToken = async (req, res) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.redirect("/login");
    }

    const splitToken = token.split(" ")[1];
    if (!token || !token.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }
    const decodedToken = jwt.decode(splitToken, process.env.JWT_SECRET);
    if (decodedToken) {
      return res.status(200).json({
        success: true,
        message: "Verified",
      });
    }
    return res.status(400).json({
      success: false,
      message: "unVerified",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = verifyToken;
