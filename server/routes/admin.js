const express = require("express");
const { Admin, User, Courses } = require("../db");
const jwt = require("jsonwebtoken");
const { AdminSecret } = require("../middleware/AdminAuth");
const { adminAuthenticateJwt } = require("../middleware/AdminAuth");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  Admin.findOne({ username }).then( (admin) => {
       if( admin ) {
          res.status(403).json({message : "Admin already exists"})
       }
       else{
         const obj = { username : username, password: password };
         const newAdmin = new Admin(obj);
         newAdmin.save();

         const token = jwt.sign({ username, role: 'admin'}, AdminSecret, {expiresIn: '1h'});
         res.json({message: "Admin created successfully", token});
       }
  })
});

router.get("/me", adminAuthenticateJwt, async (req, res) => {
   const admin = await Admin.findOne({username: req.user.username});
   
   if( !admin ) {
     res.status(403).json({message : "Admin doesnt exist"});
     return;
   }
   res.json({ username: admin.username })
});

router.post("/login", async (req, res) => {
    const { username, password } = req.headers;

    const admin = await Admin.findOne({username});
    if( admin ){
        const token = jwt.sign({username, role: 'admin'}, AdminSecret, {expiresIn: '1h'});
        res.json({message: "Admin login successfully", token});
    }
    else{
      res.status(403).json({message: "Invalid usernamce or password"});
    }
})

router.post("/courses", adminAuthenticateJwt, async (req, res) => {
  const course = await Courses(req.body);
  await course.save();
  res.json({message: "Courese created successfully", courseId : course.id})
})

router.put("/courses/:courseId", adminAuthenticateJwt, async (req, res) => {
   const course = await Courses.findByIdAndUpdate(req.params.courseId, req.body, {new: true});
   
   if( course ){
      res.json({ message: "Course updated successfully"});
   }
   else{
    rew.status(403).json({message: "Course not found"});
   }
});

router.get("/courses", adminAuthenticateJwt, async ( req, res) => {
    const courses = await Courses.find({});
    res.json({ courses });
});

router.get("/course/:courseId", adminAuthenticateJwt, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await Courses.findById(courseId);
  res.json({course});
})

module.exports = router