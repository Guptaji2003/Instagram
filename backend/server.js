const express=require('express')
// const app=express();
const cors=require("cors")
const connectdb=require("./db/db");
const cookieParser=require("cookie-parser");
const {app,server}=require("./socket/socket.js");
require("dotenv").config();



app.use(cors({ origin: process.env.URL, credentials: true }));
app.use(express.json())
app.use(cookieParser());
app.use(require("./routes/auth.js"))
app.use(require("./routes/createpost.js"))
app.use(require("./routes/messageauth.js"))

const port=process.env.PORT || 5000;
server.listen(port,()=>{
    connectdb();
    console.log("server is running on port " + port)
})