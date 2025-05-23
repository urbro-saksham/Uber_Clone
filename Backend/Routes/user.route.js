const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const userController = require("../Controller/user.controller");
const authMiddleware = require("../Middleware/auth.middleware");

router.post(
  "/register",
  [
    body("email").isEmail().isLength({ min: 5 }).withMessage("Invalid Email"),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("Firstname must be three character long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be 5 characters long"),
  ],
  userController.registerUser
);

router.post(
  "/login",
  [
    body("email").isEmail().isLength({ min: 5 }).withMessage("Invalid Email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be 5 characters long"),
  ],
  userController.loginUser
);

router.get("/Profile", authMiddleware.authUser, userController.getUserProfile);

router.get("/me", authMiddleware.authUser, async (req, res) => {
  res.status(200).json({ user: req.user }); // req.user is set in authUser middleware
});

router.get("/logout", authMiddleware.authUser, userController.logout);

module.exports = router;