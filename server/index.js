const express = require("express")
// enable middleware foe enchanced auth  cross origin resource sharing
const cors = require("cors")
//loads dotenv files
const dotenv = require("dotenv")
//connection function for connecting to db
const connectDB  = require("./DBconfig/db")
//getting the defined routes
const authRoutes = require("./Routes/Auth/route")

//getting creating post routes via protected routes
const ProtectedRoutes = require("./Routes/Protected/protectedRoute")

dotenv.config()
const app = express();
app.use(cors());
app.use(express.json()) //parses incoming  json req

connectDB()
app.use("/api/auth",authRoutes)
app.use("/api/posts",ProtectedRoutes)
module.export=app