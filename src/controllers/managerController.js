const express = require("express");
const Manager = require("../models/manager");
const managerController = require("./crudController");

const router = express.Router();

router.get("",managerController(Manager).get);

router.post("",managerController(Manager).post);

router.get("/:id",managerController(Manager).getOne);

router.patch("/:id",managerController(Manager).patch);

router.delete("/:id",managerController(Manager).delete);

module.exports = router;