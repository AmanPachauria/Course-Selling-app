const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user");
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

// const __dirname = path.resolve();


const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.use(express.static(path.join(__dirname, '/admin-client/dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin-client', 'dist', 'index.html'));
  })

// connect ot MongoDB 
mongoose.connect(process.env.MONGO, {useNewUrlParser: true, useUnifiedTopology: true, dbName: "Course-Selling-App-Data"});


app.listen(3000, () => console.log("Server running on port 3000"));