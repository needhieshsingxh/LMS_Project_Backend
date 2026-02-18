import express from "express";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import hpp from "hpp";
import xss from "xss";
import mongoSatinize from "express-mongo-sanitize";
import cookieParser from "cookie-parser";
import cors from "cors"

import dotenv from "dotenv";
dotenv.config({
    path: "/",
});

const app = express();
const PORT = process.env.PORT;


//Global rate Limiter
const limiter = rateLimit({
    windowMs: 15 * 60* 1000,
    limit: 100,
    message: "Too many request from this IP, please try later"
})


//security middlewear
app.use("/", limiter);
app.use(helmet());
app.use(mongoSatinize());
app.use(hpp());

if(process.env.NODE_ENV === "development"){
    app.use(morgan("div"));
}


//Global Error Handling
app.use((err, req, res, next)=>{
    console.err(err.stack)
    res.status(err.status || 500).json(
        {
            status: "error",
            message: err.message || "Internal Server error", ...PORT(process.env.NODE_ENV === 'development' && {stack: err.stack})
        }
    )
})



app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credential: true,
    methods: ["GET", "PUT", "DELETE", "PATCH", "POST"],
    allowedHeaders: ["Access-Control-Allow-Origin",
  "Access-Control-Allow-Methods",
  "Access-Control-Allow-Headers",
  "Access-Control-Allow-Credentials",
  "Access-Control-Expose-Headers",
  "Access-Control-Max-Age",
  "Access-Control-Request-Headers",
  "Access-Control-Request-Method"] 
}))
app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded({extended: true}))




app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`);
})