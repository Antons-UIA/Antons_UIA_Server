require("dotenv").config();
const { createToken, validateToken } = require("../middlewares/jwt");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const {
  HttpApiResponse,
  HandleError,
  HttpErrorResponse,
} = require("../utils/utils");

// Login route
async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });

    if (!user) return res.send(HttpErrorResponse("User not found"));

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = await createToken(user);
      user.token = token;
      return res.json(HttpApiResponse(user));
    }

    return res.send(HttpErrorResponse("Invalid Password"));
  } catch (err) {
    await HandleError("Auth", "login", err);
    return res.send(HttpErrorResponse(err));
  }
}

async function register(req, res) {
  const { email, password, name } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) return res.send(HttpErrorResponse("User already exists"));
    //process.env.Salt
    const hashedPassword = await bcrypt.hash(password, 10);
    var newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const token = await generateToken(newUser);
    newUser.token = token;
    return res.json(HttpApiResponse(newUser));
  } catch (error) {
    HandleError("Auth", "register", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

async function getProfile(req, res) {
  try {
    // Find user without sending password and version key (__v)
    const userId = req.user.id;
    console.log("[Auth] Get by user-id: " + req.user.id);
    const user = await User.findById(req.user.id).select("-password -__v");
    if (user) {
      return res.send(HttpApiResponse(user));
    } else {
      return res.send(HttpErrorResponse("No user exists with such id"));
    }
  } catch (err) {
    HandleError("Auth", "getProfile", err);
    return res.send(HttpErrorResponse(err.message));
  }
}

module.exports = { login, register, getProfile };
