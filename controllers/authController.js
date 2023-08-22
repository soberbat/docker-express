const User = require("../models/userModel");

const bcrypt = require("bcryptjs");

exports.signUp = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
    });
    req.session.user = {
      username: newUser.username,
      password: newUser.password,
    };
    res.status(200).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
    });
  }
};

exports.logIn = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        status: "fail",
        message: "User Not Found",
      });
    }

    const shouldProceed = await bcrypt.compare(password, user.password);

    if (shouldProceed) {
      req.session.user = { username: user.username, password: user.password };
      res.status(200).json({
        status: "success",
      });
    } else {
      res.status(400).json({
        status: "fail",
        message: "Incorrect Username Or Password",
      });
    }
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: "fail",
    });
  }
};
