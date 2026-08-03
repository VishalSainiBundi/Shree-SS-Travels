// utils/userMessages.js

const USER_MESSAGE = {
  REGISTER_SUCCESS: {
    flag: 0,
    msg: "User registered successfully.",
  },

  LOGIN_SUCCESS: {
    flag: 0,
    msg: "Login successful.",
  },

  OTP_SENT: {
    flag: 0,
    msg: "OTP sent successfully.",
  },

  OTP_VERIFIED: {
    flag: 0,
    msg: "OTP verified successfully.",
  },

  USER_ALREADY_EXISTS: {
    flag: 1,
    msg: "User already exists.",
  },

  USER_NOT_FOUND: {
    flag: 1,
    msg: "User not found.",
  },

  INVALID_CREDENTIALS: {
    flag: 1,
    msg: "Invalid email or password.",
  },

  INVALID_OTP: {
    flag: 1,
    msg: "Invalid OTP.",
  },

  ERROR: {
    flag: 1,
    msg: "Something went wrong. Please try again later.",
  },
};

module.exports = USER_MESSAGE;