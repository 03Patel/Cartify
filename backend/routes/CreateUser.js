const express = require('express');
const router = express.Router();
const User = require('./User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const jwtSecret = "mynameisganeshjipateliambuildingaloginbutton"

//password : 
router.post("/createuser",
  [
    body("name").isLength({ min: 5 }),
    body("password").isLength({ min: 6 }),
    body("email").isEmail()
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      let secPassword = await bcrypt.hash(req.body.password, salt);

      await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword
      });

      res.json({ success: true });
    } catch (err) {
      console.error("❌ Signup Error:", err); // ✅ Full error log
      res.status(500).json({ success: false, message: err.message }); // ✅ Send real error
    }
  }
);

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
