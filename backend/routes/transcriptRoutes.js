const express = require("express");
const router = express.Router();
const transcriptController = require("../controller/transcriptController")
const { body } = require("express-validator")


router.post("/get-transcript", body("videoUrl").trim().notEmpty().withMessage("URL bos olamaz"),   // withMessage ==> bos gelirse hata paketine bu mesaji koy
    transcriptController.getTranscript)

router.get("/history", transcriptController.getHistory)

module.exports = router;