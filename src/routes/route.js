const express = require('express');
const { get } = require('mongoose');
const router = express.Router();
const userController= require("../controllers/userController")
const middleware= require("../middleware/auth")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.register)

router.post("/login", middleware.isRegistered, userController.login)

router.get("/users/:userId", middleware.isRegistered, middleware.isLoggedIn, userController.getUserById)

router.put("/users/:userId", middleware.isRegistered, middleware.isLoggedIn, userController.updateUserData)

router.delete("/users/:userId", middleware.isRegistered, middleware.isLoggedIn, userController.deleteUserData)

module.exports = router;