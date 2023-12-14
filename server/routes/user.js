const express = require("express");
const { UserAuthenticateJwt, UserSecret } = require("../middleware/UserAuth");
const { User, Courses, Admin } = require("../db");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose")

const router = express.Router();

    
   router.post("/signup", async (req, res) => {
       const { username, password } = req.body;
       const user = await User.findOne({username});
       if( user ){
           res.status(404).json({ message: "User already exists"});
       }
       else{
          const newUser = new User({username, password});
          await newUser.save();
          const token = jwt.sign({username, role: 'user'}, UserSecret, {expiresIn: '1h'});
          res.json({ message: 'User created successfully', token})
       }
   });

   router.post("/login", async (req, res) => {
        const { username, password } = req.headers;
        const user = await User.findOne({ username, password });
        if( user ){
            const token = jwt.sign({username, role: 'user'}, UserSecret, {expiresIn: '1h'});
            res.json({message: "Logged in successfully", token})
        }
        else{
            res.status(403).json({message: "Invalid username or password"})
        }
   });

   router.get("/courses", UserAuthenticateJwt, async (req, res) => {
        const courses = await Courses.find({published: true});
        res.json({courses});
   })

   router.post("/courses/:courseId", UserAuthenticateJwt, async (req, res) => {
       const course = await Courses.findById(req.params.courseId);
       if( course ){
          const user = await User.findOne({username: req.user.username });
          if( user ) {
            user.purchasedCourses.push(course);
            await user.save();
            res.json({ message: "Course purchased successfully"});
          }
          else{
            res.status(403).json({message: "User not found"});
          }
       }
       else{
          res.status(404).json({message: 'Course not found'});
       }
   });

   router.get("/purchasedCourses", UserAuthenticateJwt, async (req, res) => {
       const user = await User.findOne({ username: req.user.username}).populate("purchasedCourses");
       if( user ){
        res.json({ puchasedCourses : user.purchasedCourses || []})
       }
       else{
          res.status(403).json({message: "User not found"})
       }
   });

module.exports = router