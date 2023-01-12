const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message.js");
const socket = require('socket.io');
const app = express();
require("dotenv").config();

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connection successfully!')
}).catch((err) => {
    console.log(err.message);
})

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started On Port ${process.env.PORT}`);
})

//socket.io

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true,
    }
})

let onlineUsers = []
io.on("connection", (socket) => {
    //add online user
    socket.on("add-user", (userId) => {
        addUser(userId, socket.id)
        io.emit('getUser', onlineUsers)
        console.log("onlineUsers", onlineUsers)
    })

    socket.on("send-msg", (data) => {
        console.log("send msg", data)
        const user = findContact(data.users[1])
        if (user) {
            console.log("emit msg receive")
            socket.to(user.socketId).emit("msg-receive", data)
        }
    })

    socket.on("seen-msg", (data) => {
        const user = findContact(data)
        if (user) {
            socket.to(user.socketId).emit("seen-msg-receive", data)
        }
    })

    socket.on("logout", id => {
        onlineUsers = onlineUsers.filter(user => user.userId !== id)
        io.emit('getUser', onlineUsers)
        console.log("user disconnected...", id)
        console.log("onlineUsers", onlineUsers)
    })
})

const addUser = (userId, socketId) => {
    const check = onlineUsers.some(user => user.userId === userId)
    console.log("check", check)
    if (!check) {
        onlineUsers.push({ userId, socketId });
    }
}

const findContact = (id) => {
    return onlineUsers.find(user => user.userId === id)
}