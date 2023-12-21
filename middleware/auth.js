const jwt = require("jsonwebtoken");
const User = require("../model/user");

const verifyToken = (roles) => async (req, res, next) => {
  const authorization = req.get("authorization");
  if (!authorization) {
    return res.status(403).json({
      message: "A token is required for authorization",
    });
  }

  const slpitAuthorization = authorization.split(" ");
  const token = slpitAuthorization[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    return res.status(401).json({
      message: error.message,
    });
  }

  const user = await User.findOne({ email: decoded.email });

  const role = user.role;
  if (roles.length && !roles.includes(role)) {
    const error = new Error("Unauthorized");
    console.log("error", error);
  }
  req.user = user;

  next();
};

module.exports = verifyToken;
