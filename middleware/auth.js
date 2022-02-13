require("dotenv").config();
const { Unauthorized } = require("../errors/index");
const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const authHead = req.headers.authorization;
  if (!authHead || !authHead.startsWith("Bearer ")) {
    throw new Unauthorized(`Not authorized`);
  }
  const token = authHead.split(" ")[1];
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SCR);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new Unauthorized(`Unauthorized`);
  }
};

module.exports = auth;
