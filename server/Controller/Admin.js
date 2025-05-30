const UserSchema = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();
const userPayment = require("../Schema/UserPaymentSchema");
const landlordPayment = require("../Schema/LandlordPaymentSchema");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
const getToken = async (id, email) => {
  return jwt.sign(
    {
      id: id,
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Fill all the details to register",
      });
    }

    const user = await UserSchema.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User with given email already exists",
      });
    }

    if (password.length < 8) {
      return res.status(404).json({
        success: false,
        message: "Password must at least 8 characters",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    if (!hashedPassword) {
      return res.status(400).json({
        success: false,
        message: "Internal server error",
      });
    }

    const newUser = new UserSchema({
      username,
      email,
      password: hashedPassword,
    });
    newUser.save();

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "Internal server error",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Account Registered Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserSchema.findOne({ email: email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(404).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = await getToken(user._id, email);

    return res.status(200).json({
      success: true,
      message: "Logged In successfully",
      Token: token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getUserDetails = async (req, res) => {
  const user = req.user;

  try {
    const getUser = await UserSchema.findOne({
      _id: user.id,
    })
      .select("-password")
      .select("-__v");
    console.log(getUser);
    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    return res.status(200).json({
      success: true,
      message: getUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const changePassword = async (req, res) => {
  const user = req.user;
  const { newPassword } = req.body;

  // Validate new password exists
  if (!newPassword) {
    return res.status(400).json({
      success: false,
      message: "New password is required",
    });
  }

  // Validate password length
  if (newPassword.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  try {
    const getUser = await UserSchema.findOne({
      _id: user.id,
    });

    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password directly in the database
    const updatedUser = await UserSchema.findOneAndUpdate(
      { _id: user.id },
      {
        $set: {
          password: hashedPassword,
          updatedAt: Date.now(),
        },
      },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Password change error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const fetchUserPayment = async (req, res) => {
  try {
    const paymentDetails = await userPayment.find({}).sort({
      purchase_date: -1,
    });
    if (!paymentDetails) {
      return res.status(400).json({
        success: false,
        message: "No payment availabel",
      });
    }

    return res.status(200).json({
      success: true,
      message: paymentDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const fetchLanlordPayment = async (req, res) => {
  try {
    const paymentDetails = await landlordPayment.find({}).sort({
      purchase_date: -1,
    });
    if (!paymentDetails) {
      return res.status(400).json({
        success: false,
        message: "No payment availabel",
      });
    }

    return res.status(200).json({
      success: true,
      message: paymentDetails,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const generateCode = () => {
  const newCode = Math.floor(1000 + Math.random() * 9000);
  return newCode;
};

let generatedCode = generateCode();
let userEmail = "";

const sendCodeToEmail = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({
        success: true,
        message: "Enter a email",
      });
    }

    const getCode = generatedCode;

    userEmail = email;

    await transporter.sendMail({
      from: "Room Finder 🏠<roomfinder@gmail.com>",
      to: email,
      subject: "Password reset Code",
      html: `
      Your email verification code is: ${getCode}
      `,
    });

    return res.status(200).json({
      success: true,
      message: "Code sent to your email",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyCode = async (req, res) => {
  try {
    const { code } = req.body;
    console.log(code);
    console.log(generatedCode);
    console.log(userEmail);
    if (parseInt(code) === generatedCode) {
      return res.status(200).json({
        success: true,
        message: "Code verified successfully",
        email: userEmail,
      });
    }
    return res.status(400).json({
      success: false,
      message: "Code not verified",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const changeUserPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    console.log("Change", userEmail);
    const user = await UserSchema.findOne({
      email: userEmail,
    });
    console.log(user);

    if (newPassword.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Password must be minimum 8 characters long",
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "No user found",
      });
    }

    const hashedPassowrd = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassowrd;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password changes successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getUserDetails,
  changePassword,
  fetchUserPayment,
  fetchLanlordPayment,
  sendCodeToEmail,
  verifyCode,
  changeUserPassword,
};
