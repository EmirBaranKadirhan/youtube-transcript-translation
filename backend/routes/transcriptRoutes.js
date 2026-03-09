const express = require("express");
const router = express.Router();
const transcriptController = require("../controller/transcriptController")
const { body } = require("express-validator")
const { transcriptLimiter } = require("../middleware/rateLimiter")

router.post("/get-transcript", transcriptLimiter,
    body("videoUrl").trim().notEmpty().withMessage("URL bos olamaz"),   // withMessage ==> bos gelirse hata paketine bu mesaji koy
    transcriptController.getTranscript)

router.get("/history", transcriptController.getHistory)

module.exports = router;