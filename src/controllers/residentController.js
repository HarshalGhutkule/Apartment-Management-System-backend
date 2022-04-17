const express = require("express");
const Resident = require("../models/resident");
const residentController = require("./crudController");

const router = express.Router();

router.get("",residentController(Resident).get);

router.post("",residentController(Resident).post);

router.get("/:id",residentController(Resident).getOne);

router.patch("/:id",residentController(Resident).patch);

router.delete("/:id",residentController(Resident).delete);

module.exports = router;