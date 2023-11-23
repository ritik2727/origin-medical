const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "90d",
  });
  return token;
};

module.exports = generateToken;
