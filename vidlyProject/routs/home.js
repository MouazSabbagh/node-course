const express = require("express");
const router = express.Router();
const genres = require("../db/allGenres");

router.get("/", (req, res) => {
  res.send(genres);
});

module.exports = router;
