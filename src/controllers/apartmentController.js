const express = require("express");
const Apartment = require("../models/apartment");
const apartmentController = require("./crudController");

const router = express.Router();

router.get("",async(req,res)=>{
    try{
        const apartment = await Apartment.find().populate({path:"block_id",select:["blockName","flat_id"],populate:[{path:"flat_id",select:["flatNumber","resident_id"],populate:[{path:"resident_id",select:["name","age","gender","residenttype","manager_id"],populate:[{path:"manager_id",select:["userName"]}]}]}]});
        return res.status(200).send(apartment);
    }
    catch(err){
        return res.status(400).send(err.message);
    }
});

router.post("",apartmentController(Apartment).post);

router.get("/:id",apartmentController(Apartment).getOne);

router.patch("/:id",apartmentController(Apartment).patch);

router.delete("/:id",apartmentController(Apartment).delete);

module.exports = router;