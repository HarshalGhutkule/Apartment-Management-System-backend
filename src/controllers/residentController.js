const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Apartment = require("../models/apartment");
const Block = require("../models/block");
const Flat = require("../models/flat");
const Resident = require("../models/resident");
const residentController = require("./crudController");

const router = express.Router();

router.get("", residentController(Resident).get);

router.post("", authenticate, async(req,res)=>{
    try{
        const user_id = req.user._id;
        const resident = await Resident.create({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            apartmentName: req.body.apartmentName,
            flatNumber: req.body.flatNumber,
            blockName: req.body.blockName,
            residenttype: req.body.residenttype,
            manager_id: user_id,
        });
        return res.status(201).send(resident);
    }
    catch(err){
        return res.status(400).send(err.message);
    }
})
    

// router.post("", authenticate, async (req, res) => {
//   try {
//     const user_id = req.user._id;
//     const resident = await Resident.create({
//         name: req.body.name,
//         age: req.body.age,
//         gender: req.body.gender,
//         residenttype: req.body.residenttype,
//         manager_id: user_id,
//     });

//     let residentId = await Resident.findOne({name:req.body.name}).lean().exec();

    
//     const resident_Id = residentId._id;


//     let flat = await Flat.find({flatNumber:req.body.flatNumber}).lean().exec();

//     let flag = 0;
//     for(let i=0; i<flat.length; i++){
//         for(let j=0; j<flat[i].resident_id.length; j++){
//             if(flat[i].resident_id[j] === resident_Id){
//                 flag = 1;
//                 break;
//             }
//         }
//     }

//     if(flat.length === 0) {
//         let flatId = await Flat.create({flatNumber:req.body.flatNumber,resident_id:resident_Id});

//         let flat = await Flat.findOne({flatNumber:req.body.flatNumber}).lean().exec();
//         const flat_Id = flat._id;
//         let block = await Block.find({blockName:req.body.blockName}).lean().exec();
//             let flag = 0;
//             for(let i=0; i<block.length; i++){
//                 for(let j=0; j<block[i].flat_id.length; j++){
//                     if(block[i].flat_id[j] === flat_Id){
//                         flag = 1;
//                         break;
//                     }
//                 }
//             }
//             if(block.length === 0) {
//                 let blockId = await Block.create({blockName:req.body.blockName,flat_id:flat_Id});
//                 console.log("blockId",blockId);
//                 let block = await Block.findOne({blockName:req.body.blockName}).lean().exec();
//                 const block_Id = block._id;
//                 console.log("block",block);

//                 let apartment = await Apartment.find({apartmentName:req.body.apartmentName}).lean().exec();

//                 console.log("apartment",apartment);

//                     let flag = 0;
//                     for(let i=0; i<apartment.length; i++){
//                         for(let j=0; j<apartment[i].block_id.length; j++){
//                             if(apartment[i].block_id[j] === block_Id){
//                                 flag = 1;
//                                 break;
//                             }
//                         }
//                     }
//                     if(apartment.length === 0) {
//                         console.log("hey");
//                         let apartmentId = Apartment.create({apartmentName:req.body.apartmentName,block_id:block_Id});
//                     }
//                     else if(flag === 0) {
//                         let a = await Apartment.findOneAndUpdate({apartmentName:req.body.apartmentName}, { $push: { block_id: block_Id }},{new:true});
                        
//                     }
//             }
//             else if(flag === 0) {
//                 let a = await Block.findOneAndUpdate({blockName:req.body.blockName}, { $push: { flat_id: flat_Id }},{new:true});
                
//             }
//     }
//     else if(flag === 0) {
//         let a = await Flat.findOneAndUpdate({flatNumber:req.body.flatNumber}, { $push: { resident_id: resident_Id }},{new:true});
        
//     }
    


//     return res.status(201).send(resident);
//   } catch (err) {
//     return res.status(400).send(err.message);
//   }
// });

router.get("/:id", residentController(Resident).getOne);

router.patch("/:id", authenticate, async(req,res)=>{
    try{
        const user_id = req.user._id;
        const resident = await Resident.findByIdAndUpdate(req.params.id,{
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            apartmentName: req.body.apartmentName,
            flatNumber: req.body.flatNumber,
            blockName: req.body.blockName,
            residenttype: req.body.residenttype,
            manager_id: user_id,
        },{new:true});
        return res.status(200).send(resident);
    }
    catch(err){
        return res.status(400).send(err.message);
    }
})

router.delete("/:id", residentController(Resident).delete);

module.exports = router;
