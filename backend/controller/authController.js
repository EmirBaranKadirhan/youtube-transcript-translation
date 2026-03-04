const bcrypt = require("bcrypt")
const saltRounds = 10;
const User = require("../models/Users")


const checkRegister = async (req, res) => {

    const { username, password, email } = req.body          // hata firlatan bir sey olmadigi icin try-catch icine koymadik !!
    try {

        const register = await User.findOne({ email })

        if (register) {
            return res.status(400).json({ message: "Bu kullanici Kayitli" })
        }

        const isMatch = await bcrypt.hash(password, saltRounds);

        const newRegister = await User.create({
            username: username,
            password: isMatch,
            email: email
        })

        res.status(200).json({
            message: "Kayit Basarili"
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Sunucu hatası" })
    }
}