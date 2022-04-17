const mongoose = require("mongoose");

const managerSchema = new mongoose.Schema({
    userName:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    apartment_id:{type:mongoose.Schema.Types.ObjectId, ref:"apartment", required:true},
},
{
    versionKey:false,
    timestamps:true
});

const Manager = mongoose.model("manager", managerSchema);

module.exports = Manager;