const jwt = require("jsonwebtoken");
require("dotenv").config();

const signAccessToken = async (req, res, next) => {
  const payload = {
    userId: 1,
    name: "Tip javascript",
  };
  const token = await jwt.sign(payload, process.env.KEY_ACCESSTOKEN, {
    expiresIn: "1m",
  });
  return token;
};

const signRefreshToken = async (req, res, next) => {
  const payload = {
    userId: 1,
    name: "Tip javascript",
  };
  const token = await jwt.sign(payload, process.env.KEY_REFRESHTOKEN, {
    expiresIn: "1m",
  });
  return token;
};
const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-token"];
    if (token) {
      const payload = await jwt.verify(token, process.env.KEY_ACCESSTOKEN);
      req.payload = payload;
      return next();
    }
  } catch (error) {
    if(error.name == "TokenExpiredError"){
      return res.status(200).json({
        code: 401,
        message: error.message
      })
    }
    return res.status(200).json({
      code: 500,
      message: error,
    });
  }
};
const refreshToken = async (req, res, next) => {
  return res.status(200).json({
    code: 401,
    message: "Invalid Token",
  });
};

module.exports = {
  signAccessToken,
  signRefreshToken,
  verifyToken,
  refreshToken,
};
