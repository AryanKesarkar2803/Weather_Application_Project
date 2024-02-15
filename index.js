const express = require("express")
const path = require("path")
const app = express()
app.listen(8000,()=>{console.log(`Server started at port ${8000}`)})
const cookieParser = require("cookie-parser")

const {connectMongoDB} = require("./controllers/controllers.js")
connectMongoDB("mongodb://127.0.0.1:27017/Sample_api")

// Middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.set("view engine","ejs")
app.set("views",path.resolve("views"))


const {verifyUserToken} = require("./middlewares/verifyUserToken.js")
const {route_1,home_router} = require("./routes/routes.js")

app.use("/home",verifyUserToken,home_router)
app.use("/",route_1)











