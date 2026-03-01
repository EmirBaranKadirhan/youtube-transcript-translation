const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const mongoose = require('mongoose');


app.use(express.json());
app.use(cors());


const connectDB = async () => {
    try {

        await mongoose.connect(process.env.MONGO_URI)
        console.log("🚀 MongoDB bağlantısı başarılı!")

    } catch (error) {
        console.error("❌ MongoDB bağlantı hatası:", error.message);
        process.exit(1);
    }
}

connectDB();

app.listen(process.env.PORT, () => {

    console.log(`Uygulama ${process.env.PORT} portunda başarıyla çalıştı!`)

})