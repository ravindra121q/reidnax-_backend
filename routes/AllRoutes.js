const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { userModel } = require("../modals/userModel");
const router = express.Router();
const dotenv = require("dotenv");
const { vehicleModel } = require("../modals/vehicleModal");
dotenv.config();

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    return res.send({ message: "User already exists" });
  }
  bcrypt.hash(password, 4, async (err, hash) => {
    if (err) {
      return res.send(err);
    }
    const user = new userModel({ email, password: hash });
    await user.save();
  });
  res.send({ message: "User created successfully" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userExits = await userModel.findOne({ email });
  if (!userExits) {
    return res.send({ message: "User not found" });
  } else {
 bcrypt.compare(password, userExits.password).then(function (result) {
   console.log(password, userExits.password, result);
   if (result) {
     const token = jwt.sign({ userId: userExits._id }, process.env.SECRET_KEY);
     return res.send({ message: "Login successful", accessToken: token });
   } else {
     return res.send({ message: "Wrong credentials" });
   }
 });
  }
});

router.post("/logout", (req, res) => {
  res.send({ message: "Logout successful" });
});

router.post("/map-data", (req, res) => {
    const {bus, car, truck} = req.body;
    try {
        
        const newVehicle = new vehicleModel({bus, car, truck});
        newVehicle.save();
        return res.send({message: "data saved"});
    } catch (error) {
        console.log(error);   
    }
});

router.get("/map-data", async (req, res) => {
    const data = await vehicleModel.find();
    return res.send(data);
});


module.exports = router;
