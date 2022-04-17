const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
    flatNumber:{type:Number, required:true},
    resident_id:[{type:mongoose.Schema.Types.ObjectId, ref:"resident"}],
},
{
    versionKey:false,
    timestamps:true
});

const Flat = mongoose.model("flat", flatSchema);

module.exports = Flat;