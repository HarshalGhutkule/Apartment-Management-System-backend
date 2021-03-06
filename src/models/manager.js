const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const managerSchema = new mongoose.Schema({
    userName:{type:String, required:true,unique:true},
    password:{type:String, required:true},
},
{
    versionKey:false,
    timestamps:true
});

managerSchema.pre("save",function(next){
    if(!this.isModified("password")) return next();

    let hash = bcrypt.hashSync(this.password,8);

    this.password = hash;
    return next();
})

managerSchema.methods.checkPassword = function(password){
    return bcrypt.compareSync(password,this.password);
}

const Manager = mongoose.model("manager", managerSchema);

module.exports = Manager;