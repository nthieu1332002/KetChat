const { register, login, getAllUsers, updateAvatar } = require("../controllers/userControllers")
const router = require("express").Router()

router.post("/register", register);
router.post("/login", login);
router.get("/getAllUsers/:id", getAllUsers);
router.post("/updateAvatar", updateAvatar);

module.exports = router;