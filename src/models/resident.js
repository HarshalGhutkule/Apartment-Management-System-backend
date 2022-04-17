const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
    name:{type:String, required:true},
    age:{type:Number, required:true},
    gender:{type:String,required:true,default:"Male"},
    flat_id:{type:mongoose.Schema.Types.ObjectId,ref:"flat",required:true},
    block_id:{type:mongoose.Schema.Types.ObjectId, ref:"block", required:true},
    apartment_id:{type:mongoose.Schema.Types.ObjectId, ref:"apartment", required:true},
    manager_id:{type:mongoose.Schema.Types.ObjectId, ref:"manager", required:true},
},
{
    versionKey:false,
    timestamps:true
});

const Resident = mongoose.model("resident", residentSchema);

module.exports = Resident;