const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

// Generate 5 Digit Verify Code
const generateVerifyCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

const create = async (req, res) => {
  try {
    let { name, email, password, c_password, phone } = req.body;

    // Required Fields
    if (!name || !email || !password || !c_password) {
      return res.send({
        flag: 1,
        msg: "All fields are required.",
      });
    }

    name = name.trim();
    email = email.trim().toLowerCase();

    // Name Validation
    if (name.length < 3) {
      return res.send({
        flag: 1,
        msg: "Name must be at least 3 characters.",
      });
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.send({
        flag: 1,
        msg: "Invalid email address.",
      });
    }

    // Check Duplicate Email
    const user = await userModel.findOne({ email });

    if (user) {
      return res.send({
        flag: 1,
        msg: "Email already exists.",
      });
    }

    // Password Validation
    if (password.length < 6) {
      return res.send({
        flag: 1,
        msg: "Password must be at least 6 characters.",
      });
    }

    // Confirm Password
    if (password !== c_password) {
      return res.send({
        flag: 1,
        msg: "Password and Confirm Password do not match.",
      });
    }

    // Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    // Generate Verify Code
    const verifyCode = generateVerifyCode();

    // Save User
    await userModel.create({
      name,
      email,
      password: hashPassword,
      verifycode: verifyCode,
      isVerified: false,
      phone
    });

    return res.send({
      flag: 0,
      msg: "User registered successfully.",
    });

  } catch (error) {
    console.log(error);

    return res.send({
      flag: 1,
      msg: "Something went wrong.",
    });
  }
};

// =================== LOGIN ===================
const login = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.send({
        flag: 1,
        msg: "Email and Password are required.",
      });
    }

    email = email.trim().toLowerCase();

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.send({
        flag: 1,
        msg: "User not found.",
      });
    }

    if (!user.is_verify) {
      return res.send({
        flag: 1,
        msg: "Please verify your account first.",
      });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.send({
        flag: 1,
        msg: "Invalid password.",
      });
    }

    return res.send({
      flag: 0,
      msg: "Login successful.",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.log(error);

    return res.send({
      flag: 1,
      msg: "Something went wrong.",
    });
  }
};

// =================== VERIFY ===================
const verify = async (req, res) => {
  try {
    let { email, verifycode } = req.body;

    if (!email || !verifycode) {
      return res.send({
        flag: 1,
        msg: "Email and Verification Code are required.",
      });
    }

    email = email.trim().toLowerCase();
    verifycode = verifycode.toString().trim();

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.send({
        flag: 1,
        msg: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.send({
        flag: 1,
        msg: "Account already verified.",
      });
    }

    if (user.verifycode !== verifycode) {
      return res.send({
        flag: 1,
        msg: "Invalid verification code.",
      });
    }

    user.is_verify = true;
    user.verifycode = "";

    await user.save();

    return res.send({
      flag: 0,
      msg: "Account verified successfully.",
    });

  } catch (error) {
    console.log(error);

    return res.send({
      flag: 1,
      msg: "Something went wrong.",
    });
  }
};

module.exports = {
  create,
  login,
  verify,
};