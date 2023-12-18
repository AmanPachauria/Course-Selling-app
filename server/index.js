const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const adminRouter = require("./routes/admin");
const userRouter = require("./routes/user")


const app = express();

app.use(cors());
app.use(express.json());

app.use(cors({
    origin: 'https://yourdeployedsite.com'
}));

app.use("/admin", adminRouter);
app.use("/user", userRouter);

// connect ot MongoDB 
mongoose.connect("mongodb+srv://Course-Selling-App:Course-Selling-App@cluster0.zttzvi3.mongodb.net/Course-Selling-App-Data", {useNewUrlParser: true, useUnifiedTopology: true, dbName: "Course-Selling-App-Data"});


app.listen(3000, () => console.log("Server running on port 3000"));


const mongoUri = process.env.MONGODB_URI || "mongodb+srv://Course-Selling-App:Course-Selling-App@cluster0.zttzvi3.mongodb.net/Course-Selling-App-Data";
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, dbName: "Course-Selling-App-Data" });

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));