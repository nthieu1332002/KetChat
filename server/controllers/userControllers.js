const User = require("../models/userModel");
const Message = require("../models/messageModel");
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
            _id: 1,
        })
        const userIds = await Promise.all(users.map(user => getLastMessage(req.params.id, user._id.valueOf())))
        let user = users.map(e => {
            let properties = {
                "_id": e._id.valueOf(),
                "username": e.username,
                "email": e.email,
                "lastMsg": "",
                "fromSelf" : ""
              };
            let temp = userIds.find((element) => element.id === e._id.valueOf())
            if (temp.message) {
                properties.lastMsg = temp.message
                properties.fromSelf = temp.fromSelf
            }
            return properties;
        })

        return res.json({ user })
    } catch (ex) {
        next(ex);
    }
}

const getLastMessage = async (from, to) => {
    const msg = await Message.findOne({
        users: {
            $all: [from, to],
        },
    }).sort({ updatedAt: -1 });

    return {
        id: to,
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
    };

}

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
}
