const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/Users");
const jwt = require("jsonwebtoken");


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


const userLogin = async (req, res) => {

    const { password, email } = req.body;

    try {

        const user = await User.findOne({ email: email });

        if (!user) {

            return res.status(404).json({ message: "Kullanici bulunamadi" });
        }
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {

            return res.status(400).json({ message: "Sifre hatali" });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' });

        return res.status(200).json({ message: "Basarili", token: token });






    } catch (error) {
        console.log(error);
    }


}




module.exports = {
    checkRegister,
    userLogin
}