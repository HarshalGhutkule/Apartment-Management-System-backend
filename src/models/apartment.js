const mongoose = require("mongoose");

const apartmentSchema = new mongoose.Schema({
    apartmentName:{type:String, required:true},
},
{
    versionKey:false,
    timestamps:true
});

const Apartment = mongoose.model("apartment", apartmentSchema);

module.exports = Apartment;