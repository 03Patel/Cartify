const express = require('express');
const router = express.Router();
const User = require('./User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const jwtSecret = "mynameisganeshjipateliambuildingaloginbutton"

//password : 
router.post("/createuser", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // Check if user already exists
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(password, salt);

    // Save new user
    const newUser = new User({
      name,
      email,
      password: secPassword
    });
    await newUser.save();

    res.json({ success: true, message: "User created successfully" });
  } catch (err) {
    console.error("❌ Signup Error:", err.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/loginuser", [
       body("password").isLength({ min: 6 }),
       body("email").isEmail()],
       async (req, res) => {
              const errors = validationResult(req);
              if (!errors.isEmpty()) {
                     return res.status(400).json({ error: errors.array() });
              }
              let email = req.body.email
              try {
                     let userdata = await User.findOne({ email });
                     if (!userdata) {
                            return res.status(400).json({ error: "Email was not found" });
                     }
                     const pwdcompare = await bcrypt.compare(req.body.password, userdata.password)
                     if (!pwdcompare) {
                            return res.status(400).json({ error: "Password is not match" });
                     }

                     const data = {
                            user: {
                                   id: userdata.id
                            }
                     }
                     const authToken = jwt.sign(data, jwtSecret)


                     return res.json({ success: true, authToken });

              } catch (err) {
                     console.log(err)
                     res.json({ success: false });
              }
       })

module.exports = router;
