const { BadRequest } = require("../errors/index");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new BadRequest(`Please provide email and password`);
  }
  // in production id is pulled from db
  const id = new Date().getDate();
  const token = await jwt.sign({ id, username }, process.env.JWT_SCR, {
    expiresIn: "30d",
  });
  res.status(201).json({ msg: `user created`, token });
};

const dashboard = async (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello ${req.user.username}!`,
    data: `Your personal random number ${randomNumber}`,
  });
};

module.exports = { login, dashboard };
