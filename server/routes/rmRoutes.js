const express = require("express");
const rmController = require("../controllers/rmController");

const router = express.Router();

router.get("/", rmController.getRms);
router.get("/:id", rmController.getRm);
router.post("/", rmController.createOrUpdateRm);
router.delete("/:id", rmController.deleteRm);

module.exports = router;
