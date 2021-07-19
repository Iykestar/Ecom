const express = require("express");
const router = express.Router();
const { signup, signIn, getUser } = require("../controller/userController");

router.get('/', getUser)
router.post("/signup", signup);
router.post("/signin", signIn);

module.exports = router;