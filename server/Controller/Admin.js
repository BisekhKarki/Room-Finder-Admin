const UserSchema = require("../Schema/UserSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
dotenv.config();

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
    const getUser = await UserSchema.findById(user.id)
      .select("-password")
      .select("-__v");
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

module.exports = { registerUser, loginUser, getUserDetails };
