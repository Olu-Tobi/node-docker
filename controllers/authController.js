const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

exports.signUp = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });

    if (user) {
      res.status(422).json({
        error: "User already exists!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await new User({
      username,
      password: hashedPassword,
    }).save();

    req.session.user = newUser;
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(422).json({
        error: "Invalid username or password",
      });
    }

    const doMatch = await bcrypt.compare(password, user.password);

    if (doMatch) {
      req.session.user = user;
      res.status(200).json({
        status: "success",
        data: {
          user: user,
        },
      });
    } else {
      res.status(422).json({
        error: "Invalid username or password",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
