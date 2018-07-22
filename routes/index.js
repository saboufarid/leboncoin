const express = require("express");
const coreRoutes = require("./core.js");
const userRoutes = require("./user.js");
const offerRoutes = require("./offer.js");
const authRoutes = require("./authRoutes.js");

const router = express.Router();

router.use("/api", coreRoutes);
router.use("/api/user", userRoutes);
router.use("/api/offer", offerRoutes);
router.use(authRoutes);

module.exports = router;
