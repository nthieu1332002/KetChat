const { addMessage, getMessages, seenMessage, addImageMessage, getImageMessage } = require("../controllers/messageController.js");
const router = require("express").Router();

router.post("/addMsg/", addMessage);
router.post("/getMsg/", getMessages);
router.post("/seenMsg/", seenMessage)
router.post("/addImg/", addImageMessage)
router.post("/getImg/", getImageMessage)

module.exports = router;