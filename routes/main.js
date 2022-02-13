const { login, dashboard } = require("../controllers/main");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();

router.route("/login").post(login);
router.route("/dashboard").get(auth, dashboard);

module.exports = router;
