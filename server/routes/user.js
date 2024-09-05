import express, { json } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const router = express.Router();

import { User } from "../models/User.js";

router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    return res.json({ message: "User already exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });

  await newUser.save();

  return res.json({ status: true, message: "user registered" });
});

// login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "user not found" });
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "password is incorrect" });
  }

  const token = jwt.sign({ username: user.username }, process.env.KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });

  return res.json({ status: true, message: "Login successful" });
});

// forgot pass

router.post("/reset-pass", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "user not registered" });
    } 

    const token = jwt.sign({id: user._id}, process.env.KEY, { expiresIn: '5m'})
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL,
        pass: process.env.MAIL_PASS,
      },
    });

    var mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: "Password reset",
      text: `http://localhost:5173/set-password/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({message: 'error sending email'})
      } else {
        return res.json({status: true, message: 'email sent'})
      }
    });
  } catch (err) {
    console.log(err);
  }
});


router.post('/set-password/:token', async (req, res) => {
  const {token} = req.params
  const {password} = req.body

  try {
    const decoded = await jwt.verify(token, process.env.KEY)
    const id = decoded.id
    const hashPassword = await bcrypt.hash(password, 10)

    await User.findByIdAndUpdate({_id: id}, {password: hashPassword})
    return res.json({status: true, message: 'Updated password'})

  } catch (error) {
    return res.json({ message: 'Invalid password'})
  }
})

export { router as UserRouter };
