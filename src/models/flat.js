const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
    flatNumber:{type:Number, required:true},
    block_id:{type:mongoose.Schema.Types.ObjectId, ref:"block", required:true},
    apartment_id:{type:mongoose.Schema.Types.ObjectId, ref:"apartment", required:true},
},
{
    versionKey:false,
    timestamps:true
});

const Flat = mongoose.model("flat", flatSchema);

module.exports = Flat;