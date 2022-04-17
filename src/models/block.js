const mongoose = require("mongoose");

const blockSchema = new mongoose.Schema({
    blockName:{type:String, required:true},
    flat_id:[{type:mongoose.Schema.Types.ObjectId, ref:"flat"}],
},
{
    versionKey:false,
    timestamps:true
});

const Block = mongoose.model("block", blockSchema);

module.exports = Block;