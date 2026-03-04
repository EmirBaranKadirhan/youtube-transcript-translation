const express = require("express");
const router = express.Router();
const transcriptController = require("../controller/transcriptController")



router.post("/get-transcript", transcriptController.getTranscript)

router.get("/history", transcriptController.getHistory)

module.exports = router;