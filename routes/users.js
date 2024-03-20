const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const config = require("config");

// importing model for the database
// Models ki madad se hm database mein data save kreinge all the way
const User = require("../models/user");

// @route POST /api/users
// @desc Add new user
// @access Publically access
// POST API -->> hai yh kionke signup krke data aega user ka
// name,Email,Password aega user ka req mein post ki.
// Iska hmne Schema dalke Model create krlia hai database ke andar
// bs hmne data jo aega usko validate krna hai phle aur phr us data ko save kreinge database mein
// Password hm ash kreinge bcrypt se aur phr save kreinge
// JWT token hm return krdeinge as a response
router.post(
  "/",
  [
    check("name", "Please Enter a name of almost 3 characters").isLength({
      min: 3,
    }),
    check("email", "Enter a Valid Email").isEmail(),
    check("password", "Enter password between 5-20 characters").isLength({
      min: 5,
      max: 20,
    }),
  ],
  async (req, res) => {
    // Yh Errors jo arhe hnge uper checks ko use krne ke bad unko handle kra wa hai hmne yhn pe
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // req.body mein se hm apna data jo arha hoga wo get krleinge all the way
    const { name, email, password } = req.body;

    try {
      // User already exists so change the user name & email
      // Checking the user in the database before signing Up a new user
      // Checking the user by the findOne method provided by the MongoDB.
      const userAlreadyExist = await User.findOne({ email }).select({
        password: 0,
      });
      // console.log("Already Exist: ",userAlreadyExist);
      if (userAlreadyExist)
        return res.status(400).json({
          msg: "User with this email already exist change the email to signup",
        });

      // creating a new user and saving in Database
      // SignUp krrhe hain new user ko hm yhn pe
      const user = new User({
        name,
        email,
        password,
      });

      // hash kreinge password ko save krne se phle
      // salt create kreinge hm
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      //User ko save kreinge database mein
      await user.save();

      // return JSON WEB TOKEN
      // payload pe jwt create hoga hmare pass
      const payload = {
        user: {
          id: user.id,
        },
      };

      //   return JWT kreinge hm user ke signup krne ke bad
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

module.exports = router;
