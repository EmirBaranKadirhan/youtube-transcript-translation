const rateLimit = require("express-rate-limit")


const transcriptLimiter = rateLimit({
    windowMs: 60 * 1000,   // 1 dakika
    max: 5,                // dakikada max 10 istek
    message: { message: "Çok fazla istek attınız, lütfen bekleyin." }
})

module.exports = { transcriptLimiter }