const bcrypt = require("bcrypt");
const User = require("../models/userregistration");
const jwt = require("jsonwebtoken");
exports.createUser = async function (req, res) {
  let usernamecheck = await User.findOne({ username: req.body.username });
  let emailcheck = await User.findOne({ email: req.body.email });
  if (!usernamecheck & !emailcheck) {
    let encryptedPassword;
    console.log(req.body);
    try {
      let salt = bcrypt.genSaltSync(10);
      console.log(salt);
      encryptedPassword = bcrypt.hashSync(req.body.password, salt);
      console.log(encryptedPassword);
    } catch (error) {
      console.log(error);
      console.log("error in brcypt");
    }
    const userOb = new User({
      username: req.body.username,
      dob: req.body.dob,
      password: encryptedPassword,
      email: req.body.email,
    });
    console.log(userOb);
    userOb.save(function (err) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.json("User registered succesfully");
      }
    });
  } else {
    res.json({ status: 0, debug_data: " already exist" });
  }
};
exports.getUsers = (request, response) => {
  User.find((err, users_list) => {
    if (err) {
      response.json(err);
    } else {
      response.json({ status: 1, data: { users_list } });
    }
  });
};
exports.checkusername = async (req, res) => {
  let username = req.params.username;
  let userOb = await User.findOne({ username });
  if (!userOb) {
    res.json({ status: 1, debug_data: "user does not exist" });
  } else {
    res.json({ status: 0, debug_data: "user exist" });
  }
};
exports.checkemail = async (req, res) => {
  let email = req.params.email;
  let userOb = await User.findOne({ email });
  if (!userOb) {
    res.json({ status: 1, debug_data: "user does not exist" });
  } else {
    res.json({ status: 0, debug_data: "user exist" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  let userOb = await User.findOne({ email });
  console.log(userOb);
  if (!userOb) {
    res.status(400).json({ status: 0, debug_data: "user not found" });
  } else {
    const passCorrect = await bcrypt.compareSync(password, userOb.password);
    if (!passCorrect) {
      res.status(400).json({
        status: 0,
        debug_data: " Wrong User Credentials ",
      });
    }
    const payload = {
      user: {
        email: email,
      },
    };
    jwt.sign(payload, "secret_string", { expiresIn: 1200 }, (err, token) => {
      if (err) {
        throw err;
      }
      res.status(200).json({ token });
    });
  }
};
