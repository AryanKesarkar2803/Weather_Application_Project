const {mongoose,users} = require("../models/users")
const jwt = require("jsonwebtoken")
const secretKey = "Secret@456";
const axios = require("axios")

async function connectMongoDB(url){
    await  mongoose.connect(url)
    .then(()=>{console.log("Database Connected")})
    .catch((err)=>{console.log(`Error Connecting database - ${err}`)})
}
async function sendFirstPage(req,res){
    await res.render("firstPage")
}
async function sendSignUpPage(req,res){
    await res.render("signUpPage")
}
async function sendLoginPage(req,res){
    await res.render("loginPage")
}
async function signUPUser(req,res){
    const body = req.body;
    const duplicate_email = await users.findOne({email:body.email.toLowerCase()})
    if(duplicate_email){
        res.json({msg:"Email already Exists ... Use Different Email ID"})
    }else{   
    await users.create({
        name:body.name,
        email:body.email.toLowerCase(),
        password:body.password,
        city:body.city.toLowerCase()
    }).catch((err)=>{res.send(`Error in Creating User - ${err}`)})
    res.redirect("/")
}
}
async function loginUser(req,res){
    const body = req.body;
    const userFound = await users.findOne({email:body.email.toLowerCase(),password:body.password})
    if(!userFound){
        res.redirect("/login")
    }
    else{
        const payload = {
            id:userFound._id,
            name : userFound.name,
            city:userFound.city
        }
        const token = jwt.sign(payload,secretKey)
        res.cookie("uid",token)
        res.redirect("/home")

    }
}
async function sendHomePage(req,res){
    const token = jwt.decode(req.cookies.uid);
    const url = `http://api.openweathermap.org/data/2.5/weather?appid={API_KEY}&q=${token.city}`;
     await axios.get(url)
     .then((response)=>{
        const data = response.data;
         res.render("homePage",{
            city:token.city,
            name:token.name,
            temp:Math.round(data.main.temp-273.15),
            humidity:data.main.humidity,
            wind_speed:(data.wind.speed * 3600)/1000
        })
     })
     .catch((err)=>{
        res.json({msg:`Cannot get weather details . Error - ${err}`})
     })

   
}
async function fetchData(req,res){
    const token = jwt.decode(req.cookies.uid);
    const city_name  = req.body.city_name.toLowerCase();
    const url = `http://api.openweathermap.org/data/2.5/weather?appid={API_KEY}&q=${city_name}`;
     await axios.get(url)
     .then((response)=>{
        const data = response.data;
         res.render("weatherPage",{
            city:data.name,
            name:token.name,
            temp:`${Math.round(data.main.temp-273.15)} degree`,
            humidity:`${data.main.humidity} %`,
            wind_speed:`${(data.wind.speed * 3600)/1000} km/h`
        })
     })
     .catch((err)=>{
        res.json({msg:`Cannot get weather details . Error - ${err}`})
     })



   
}
async function sendWeatherPage(req,res){
    const token = jwt.decode(req.cookies.uid)
    await res.render("weatherPage",{
       name:token.name,
       city:"No Data Available",
       temp:"No Data Available",
       humidity:"No Data Available",
       wind_speed:"No Data Available"
    })
}
async function logoutUser(req,res){
    await res.clearCookie("uid")
    await res.redirect("/")
}
module.exports = {
    sendFirstPage,
    sendSignUpPage,
    sendLoginPage,
    connectMongoDB,
    signUPUser,
    loginUser,
    jwt,
    secretKey,
    sendHomePage,
    fetchData,
    sendWeatherPage,
    logoutUser,
}


