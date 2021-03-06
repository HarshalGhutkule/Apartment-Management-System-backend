const express = require("express");
const cors = require("cors");
const connect = require("./configs/db");
const {register,login} = require("./controllers/authController");
const { body } = require('express-validator');
const residentController = require("./controllers/residentController");
const managerController = require("./controllers/managerController");
const apartmentController = require("./controllers/apartmentController");

const app = express();

app.use(cors());
app.use(express.json())

app.post("/register", 
body("userName").isString().notEmpty().isLength({min:3}).withMessage("Username should be atleast of 3 character"),
body("password").isString().custom(async (value)=>{
    let pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    if(pattern.test(value)) return true;
    throw new Error(("Password is not strong"));
}),
register);


app.post("/login", login);
app.use("/resident", residentController);
app.use("/manager", managerController);
app.use("/apartment", apartmentController);

app.listen(process.env.PORT || 3001, '0.0.0.0',async()=>{
    try{
        await connect()
        console.log("Listning on port 3001");
    }
    catch(err){
        console.log(err);
    }
})