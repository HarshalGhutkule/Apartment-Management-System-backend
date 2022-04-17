const mongoose = require("mongoose");

const residentSchema = new mongoose.Schema({
    name:{type:String, required:true},
    age:{type:Number, required:true},
    gender:{type:String,required:true,default:"Male"},
    manager_id:{type:mongoose.Schema.Types.ObjectId, ref:"manager", required:true},
},
{
    versionKey:false,
    timestamps:true
});

const Resident = mongoose.model("resident", residentSchema);

module.exports = Resident;