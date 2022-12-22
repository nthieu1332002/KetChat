const Message = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await Message.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        });

        if (data) return res.json({ msg: "Message added successfully." });
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (ex) {
        next(ex);
    }
};

module.exports.getMessages = async (req, res, next) => {
    try {
        console.log("req.body", req.body)
        const { from, to } = req.body;
        const messages = await Message.find({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        console.log("messages",messages)

        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
                
            };
        });
        return res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};

module.exports.getLastMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const msg = await Message.findOne({
            users: {
                $all: [from, to],
            },
        }).sort({ updatedAt: 1 });
        return res.json({
            id: from,
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
        });
    } catch (ex) {
        next(ex);
    }
}

