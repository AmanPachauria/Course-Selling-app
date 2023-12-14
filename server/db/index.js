const mongoose = require("mongoose");

// Define mongoose schemas 
const userSchema = new mongoose.Schema({
     username: {type: String},
     password: String,
     purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Courses"}]
})

const adminSchema = new mongoose.Schema({
    username: String,
    password: String
});

const courseSchema = new mongoose.Schema({
   title: String,
   description: String,
   imageLink: String,
   price: Number,
   published: Boolean
})


const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Courses = mongoose.model("Courses", courseSchema);

module.exports = {
  User,
  Admin,
  Courses
}