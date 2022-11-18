const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

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

        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ msg: "Incorrect email or password.", status: false });
        }
        const passwordCheck = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            return res.json({ msg: "Incorrect Email or Password", status: false });
        }
        delete user.password;
        return res.json({ status: true, user, token: generateToken(user._id) });
    } catch (ex) {
        next(ex);
    }
}

module.exports.getAllUsers = async (req, res, next) => {
    try {
        console.log("req: ", req)
        const users = await User.find({ _id: { $ne: req.params.id } }, { 
            username: 1,
            email: 1,
            avatarImage: 1,
            _id:1,
        })
        return res.json({users})
    } catch (ex) {
        next(ex);
    }
}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}
