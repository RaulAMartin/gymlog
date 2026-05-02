const express = require("express");
const sessionController = require("../controllers/sessionController");

const router = express.Router();

router.get("/", sessionController.getSessions);
router.get("/:id", sessionController.getSession);
router.post("/", sessionController.createSession);
router.put("/:id", sessionController.updateSession);
router.delete("/:id", sessionController.deleteSession);

module.exports = router;
