const { register, login, getAllUsers } = require("../controllers/userControllers")
const router = require("express").Router()

router.post("/register", register);
router.post("/login", login);
router.get("/getAllUsers/:id", getAllUsers);

module.exports = router;