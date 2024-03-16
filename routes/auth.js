const express = require("express");

// this is the auth api redirected page and here the api will be redirected
const router = express.Router();

// this is the auth API get route
router.get("/", (req, res) => {
    res.status(200).json({msg:"Auth APi"})
});

module.exports = router;
