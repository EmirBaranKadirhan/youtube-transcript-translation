const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require('mongoose');
const transcriptRoutes = require("./routes/transcriptRoutes")
const authRoutes = require("./routes/authRoutes")
const authMiddleware = require("./middleware/authMiddleware")

app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes)
app.use('/api/transcript', authMiddleware, transcriptRoutes)


const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("🚀 MongoDB bağlantısı başarılı!")

    } catch (error) {
        console.error("❌ MongoDB bağlantı hatası:", error.message);
        process.exit(1);
    }
}



app.listen(process.env.PORT, () => {

    console.log(`Uygulama ${process.env.PORT} portunda başarıyla çalıştı!`)

})


connectDB();