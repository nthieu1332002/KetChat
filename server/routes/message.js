const { addMessage, getMessages } = require("../controllers/messageController.js");
const router = require("express").Router();

router.post("/addMsg/", addMessage);
router.post("/getMsg/", getMessages);

module.exports = router;