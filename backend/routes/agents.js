const express = require("express");
const router = express.Router();
const { getAgents, runAgent } = require("../controllers/agentsController");

router.get("/", getAgents);
router.post("/run", runAgent);

module.exports = router;
