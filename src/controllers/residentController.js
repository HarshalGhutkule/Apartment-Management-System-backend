const express = require("express");
const authenticate = require("../middlewares/authenticate");
const Flat = require("../models/flat");
const Resident = require("../models/resident");
const residentController = require("./crudController");

const router = express.Router();

router.get("", residentController(Resident).get);

router.post("", authenticate, async (req, res) => {
  try {
    const user_id = req.user._id;
    const resident = await Resident.create({
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        apartmentName: req.body.apartmentName,
        manager_id: user_id,
    });

    console.log(resident);
    let residentId = await Resident.findOne({name:req.body.name}).lean().exec();

    
    const resident_Id = residentId._id;


    let flat = await Flat.find({flatNumber:req.body.flatNumber}).lean().exec();

    let flag = 0;
    for(let i=0; i<flat.length; i++){
        for(let j=0; j<flat[i].resident_id.length; j++){
            if(flat[i].resident_id[j] === resident_Id){
                flag = 1;
                break;
            }
        }
    }

    if(flat.length === 0) {
        Flat.create({flatNumber:req.body.flatNumber,resident_id:resident_Id});
    }
    else if(flag === 0) {
        let a = await Flat.findOneAndUpdate({flatNumber:req.body.flatNumber}, { $push: { resident_id: resident_Id }},{new:true});
        
    }
    


    return res.status(201).send(resident);
  } catch (err) {
    return res.status(400).send(err.message);
  }
});

router.get("/:id", residentController(Resident).getOne);

router.patch("/:id", residentController(Resident).patch);

router.delete("/:id", residentController(Resident).delete);

module.exports = router;
