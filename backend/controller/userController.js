const users = require("../data/users");
const generateToken = require("../utils/generateToken");



exports.login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    const token = generateToken(user.id);
    res.status(200).json({
      status: "success",
      token,
      username: user.username,
      role: user.role,
    });
  } else {
    res.status(401).json({
      status: "fail",
      message: "Invalid credentials",
    });
  }
};
