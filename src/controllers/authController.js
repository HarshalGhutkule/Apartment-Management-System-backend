const Manager = require("../models/manager");
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

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

        user = Manager.create(req.body);

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
        let user = await Manager.findOne({userName:req.body.userName}).lean().exec();

        if(!user) return res.status(400).send({ message: "Please try another username & password" });

        let match = user.checkPassword(req.body.password);

        if(!match) return res.status(400).send({ message: "Please try another username & password" });

        user = Manager.create(req.body);

        const token = createToken(user);

        let status = "ok";

        return res.status(201).send({user,token,status});
    }
    catch(err){
        return res.status(400).send({ message: err.message });
    }
}

module.exports = {register,login};