const Manager = require("../models/manager");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');
const Apartment = require("../models/apartment");

const createToken = (user)=>{
    return jwt.sign({ user }, 'shhhhh');
}

const register = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user = await Manager.findOne({userName:req.body.userName}).lean().exec();

        if(user) return res.status(400).send({ message: "Please try another username" });

        user = await Manager.create({userName:req.body.userName,password:req.body.password});

        const token = createToken(user);

        let status = "ok";

        return res.status(201).send({user,token,status});
    }
    catch(err){
        return res.status(400).send({ message: err.message });
    }
}

const login = async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try{
        let user = await Manager.findOne({userName:req.body.userName});

        if(!user) return res.status(400).send({ message: "Please try another username & password" });

        const match = user.checkPassword(req.body.password);

        if(!match) return res.status(400).send({ message: "Please try another username & password" });

        let manager = await Manager.findOne({userName:req.body.userName}).lean().exec();

        const manager_id = manager._id;

        let apartment = await Apartment.find({apartmentName:req.body.apartmentName}).lean().exec();

        if(!apartment) Apartment.create({apartmentName:req.body.apartmentName,manager_id:manager_id,});

        const token = createToken(user);

        let status = "ok";

        return res.status(201).send({user,token,status});
    }
    catch(err){
        return res.status(400).send({ message: err.message });
    }
}

module.exports = {register,login};