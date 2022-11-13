const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if (usernameCheck) {
            return res.json({ msg: "This username already used.", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if (emailCheck) {
            return res.json({ msg: "This email already used", status: false });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
}


module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const emailCheck = await User.findOne({ email });
        if (!emailCheck) {
            return res.json({ msg: "Incorrect email or password.", status: false });
        }
        const passwordCheck = await bcrypt.compare(password, emailCheck.password);
        if (!passwordCheck)
            return res.json({ msg: "Incorrect Email or Password", status: false });
        delete emailCheck.password;
        return res.json({ status: true, emailCheck});
    } catch (ex) {
        next(ex);
    }
}