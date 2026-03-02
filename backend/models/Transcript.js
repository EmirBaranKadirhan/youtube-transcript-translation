const mongoose = require("mongoose");

const TranscriptSchema = new mongoose.Schema({

    videoId: {                      // YouTube'un verdigi ID (orn: dQw4w9WgXcQ)
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    originalText: {
        type: String,
        required: true
    },
    translatedText: {
        type: String,
        required: true
    },
    selectedLanguage: {
        type: String,
        default: 'tr'
    }
}, { timestamps: true });


module.exports = mongoose.model("Transcript", TranscriptSchema)