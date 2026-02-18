import express from "express";
import morgan from "morgan";

import dotenv from "dotenv";
dotenv.config({
    path: "/",
});

const app = express();
const PORT = process.env.PORT;

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




app.use(express.json({limit: "10kb"}));
app.use(express.urlencoded())




app.listen(PORT, ()=>{
    console.log("Server is runiing at PORT: " +PORT);
})