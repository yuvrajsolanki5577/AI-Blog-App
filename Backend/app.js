const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./config/database");
const morgan = require("morgan")
const postRouter = require("./routers/post");
const userRouter = require("./routers/user");
const contactUsrouter = require("./routers/contactUs");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./swagger-output.json");

const app = express();

// Database Connectivity
connectDB();

// Morgan console Logs
app.use(morgan("dev"));

// Cors - Allow access from anywhere
app.use(cors());

// Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Api Routes
app.use("/api/post",postRouter);
app.use("/api/user",userRouter);
app.use("/api",contactUsrouter);

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// PORT
const PORT =  process.env.PORT || 2800;

// Home Route
app.get("/", (req,res) => {
    res.send("Hello Shubham Jain || Welcome to AI Blog App Backend !!");
})


// 404 Not Found
app.get("*", (req,res) => {
    res.status(404).send({
        error : `404 Error Occured || URL Not Found !!`
    });
});

// Server listning on that PORT
app.listen(PORT, ()=> {
    console.log(`Server is Running on PORT No ${PORT}`);
})