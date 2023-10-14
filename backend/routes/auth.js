const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { query, validationResult, body } = require("express-validator");

const bycrptjs = require("bcryptjs");

const jwt = require("jsonwebtoken"); //it is used to create secure communication between user and database jb user login krega toh yahi token s match krega agr ye token match kiya to user login hoga otherwise ni
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "mizanhussain2003";

//Route 1 - Create a User using: POST "/api/auth/createuser". Doesn't require Auth
let sucess = false;
router.post(
  "/createuser",
  [
    //express validator for validation
    body("name", "enter a valid name").isLength({ min: 3 }),
    body("email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //check whether the user with this email exixts already or not
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        
        return res
          .status(400)
          .json({ error: "sorry a user already exists with this email" });
      }
      const salt = await bycrptjs.genSalt(10);
      const secPass = await bycrptjs.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      //for creating auth token is auth token ki help se hmlog user ki id retrive krlege then us id  s baki sare data

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      sucess=true
      res.json({sucess:"true", authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "some error occur" });
    }
  }
);

//Route 2 -authenticate a user using POST /auth/login
router.post(
  "/login",
  [
    //express validator for validation
    body("email").isEmail(),
    body("password", "password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        sucess = false;
        return res
          .status(400)
          .json({ error: "please enter email corrct credentails" });
      }
      const passworCompare = await bycrptjs.compare(password, user.password);
      if (!passworCompare) {
        sucess = false;
        return res
          .status(400)
          .json({ error: "please enter corrct credentails" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      sucess = true;
      res.json({ sucess, authToken });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "some error occur" });
    }
  }
);

// Route 3 - get loggedin USer details auth/getuser
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userid = req.user.id;
    const user = await User.findById(userid).select("-password");
    res.send(user);
  } catch (error) {
    res.status(500).json({ error: "some cxvxerror occur" });
  }
});

module.exports = router;
