const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/database");
const morgan = require("morgan")
const postRouter = require("./routers/post");
const userRouter = require("./routers/user");
const contactUsrouter = require("./routers/contactUs");

const app = express();

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use("/api/post",postRouter);
app.use("/api/user",userRouter);
app.use("/api",contactUsrouter);

const PORT =  process.env.PORT || 3100;

app.get("/", (req,res) => {
    res.send("Hello Shubham & Sakshi");
})

app.listen(PORT, ()=> {
    console.log(`Server is Running on PORT No ${PORT}`);
})