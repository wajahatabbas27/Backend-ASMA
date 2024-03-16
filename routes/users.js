const express = require("express");

// jo hmne routes bnae hain apne pass server.js mein yh uski extention file hai
// /api/users ki jo file hai wo hmein yhn pe redirect krdeti hai
const router = express.Router();

// this is the get api and it is shown all the way as well
router.get("/", (req, res) => {
  res.status(200).json({ msg: "Users Api" });
});

module.exports = router;
