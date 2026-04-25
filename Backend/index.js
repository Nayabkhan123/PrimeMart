const express = require("express");
const app = express();
const cors = require("cors");
const compression = require("compression");

require("dotenv").config();
const dbConnect = require("./config/db")
const router = require('./routers');
const cookieParser = require("cookie-parser");

// Enable compression for all responses
app.use(compression());

app.use(cookieParser());
app.use(cors({
    origin:process.env.FRONTEND_URL,
    credentials:true,
}));

// Increase JSON payload limit if needed
app.use(express.json({ limit: '10mb' }))

app.use("/api",router)



const PORT = 8080 || process.env.PORT
dbConnect().then(()=>{
    app.listen(PORT,'0.0.0.0',()=>{
        console.log(`Server is running at port ${PORT}`)
    })
});
