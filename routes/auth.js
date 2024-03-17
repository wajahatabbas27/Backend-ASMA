const express = require("express");
const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const auth = require("../middlewear/auth");

// this is the auth api redirected page and here the api will be redirected
const router = express.Router();

// @route POST /api/auth
// @desc Authorise User
// @access public
// this is the auth API get route
// User email,password leke aega
// Hm check kreinge apne pass database mein jake email aur password ko match kreinge
// password hash krawa hai database mein to us password ko hmne unhash krna prega database mein aur compare krna hai
// agr sahi hoga to hm JWT return krdeinge all the way
router.post(
  "/",
  [
    check("email", "Enter a Valid Email").isEmail(),
    check("password", "Enter a password").not().isEmpty(),
  ],
  async (req, res) => {
    // Yh Errors jo arhe hnge uper checks ko use krne ke bad unko handle kra wa hai hmne yhn pe
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    //   get Data
    const { email, password } = req.body;

    try {
      // User exist krta hai ya nhi jo login krrha hai
      // Check krrhe hain hm database mein apne
      // Jb bhi database se connect hona hai to wo kaam hm kraeinge try/catch mein hmesha
      // Email se user ko nikal ke larha hai findOne se
      // Check User
      const user = await User.findOne({ email });
      if (!user)
        return res
          .status(400)
          .json({ msg: "User with this Email doesnot Exist" });

      // Check Password
      // hash password jo hai hmara database mein hai usko hmne decode krna hai phr hm usko match kreinge
      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched)
        return res.status(400).json({ msg: "Incorrect Password" });

      // Agr Password match hojaega to JWT return krdeinge hm
      // return JSON WEB TOKEN
      // payload pe jwt create hoga hmare pass
      //   payload jo hm bnarhe hain user.id se to yh hmara middlewear mein kaam aega
      const payload = {
        user: {
          id: user.id,
        },
      };

      // return JWT kreinge hm user ke signup krne ke bad
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        {
          expiresIn: 100000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.log("Error", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

// @route GET /api/auth
// @desc GET User Data
// @access private
// Auth get API after the user login
// Ismein user ka data jo hai wo leke aeinge apne pass lekin JWT jo arha hoga frontend se hmare pass uske liye middlewear bnadeinge hm
// phr hm user ka data database se nikalke bhjdeinge frontend pe
// Auth Middlewear se yh hmare pass user ki id payload se nikal ke leke aega jisse hm apna user ko find krleinge
router.get("/", auth, async (req, res) => {
  try {
    // Id to hai hi nhi hmare pass hm jwt ki jo id hai usse hi to get krrhe hain user ke data ko
    // .select -->> password/__V:0 se hmein yh do chezein nhi send krega
    const user = await User.findById(req.user.id).select({
      password: 0,
      __v: 0,
    });
    res.status(200).json({ user });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
