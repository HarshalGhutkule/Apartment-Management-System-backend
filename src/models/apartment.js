const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
    apartmentName:{type:String, required:true},
    block_id:[{type:mongoose.Schema.Types.ObjectId, ref:"block"}],
},
{
    versionKey:false,
    timestamps:true
});

const Apartment = mongoose.model("apartment", apartmentSchema);

module.exports = Apartment;