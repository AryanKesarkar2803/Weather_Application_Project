const express = require("express")
const route_1 = express.Router()
const home_router = express.Router()
const {sendFirstPage,sendLoginPage,sendSignUpPage,signUPUser,loginUser,sendHomePage,fetchData,sendWeatherPage,logoutUser} = require("../controllers/controllers.js")


route_1.route('/')
.get(sendFirstPage)

route_1.route("/signup")
.get(sendSignUpPage)
.post(signUPUser)

route_1.route("/login")
.get(sendLoginPage)
.post(loginUser)

home_router.route("/")
.get(sendHomePage)

home_router.route("/getweather/fetch_data")
.post(fetchData)

home_router.route("/getweather")
.get(sendWeatherPage)

home_router.route("/getweather/logout")
.get(logoutUser)


module.exports = {
    route_1,
    home_router,
}









