const Message = require("../models/messageModel");
const {cloudinary} = require("../utils/cloudinary");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: {
                text: message,
                image: ''
            },
            users: [from, to],
            sender: from,
        });
        if (data) return res.json(data);
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        next(ex);
    }
};

module.exports.addImageMessage = async (req, res, next) => {
    try {
        const { from, to, msg, img } = req.body;

        const result = await cloudinary.v2.uploader.upload(img, {
            folder: "KetChatImg",
            width: 500,
            crop: "limit",
            fetch_format: "jpg"
        })
        const data = await Message.create({
            message: {
                text: msg,
                image: result.public_id
            },
            users: [from, to],
            sender: from,
        });
        if (data) return res.json(data);
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        next(ex);
    }
};

module.exports.getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        return res.json(messages);
    } catch (ex) {
        next(ex);
    }
};

module.exports.seenMessage = async (req, res, next) => {
    try {
        const msgId = req.body._id;
        const status = await Message.findByIdAndUpdate(msgId, {
            status: 'seen',
        })
        if (!status) {
            return res.json({ status: false })
        }
        return res.json({ status: true })
    } catch (ex) {
        next(ex);
    }
}

module.exports.getImageMessage = async (req, res, next) => {
    try {
        const { from, to, limit } = req.body;

        const amount = await Message.countDocuments({
            users: {
                $all: [from, to],
            },
            'message.image': {
                $ne: ''
            }
        })
        console.log("amount", amount)

        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
            'message.image': {
                $ne: ''
            }
        })
        .select({'message.image': 1, "_id": 0})
        .sort({ updatedAt: -1 })
        .limit(limit);

        return res.json({messages, imgAmount: amount});
    } catch (ex) {
        next(ex);
    }
};