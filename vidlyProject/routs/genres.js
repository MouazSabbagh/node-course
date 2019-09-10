const express = require("express");
const Joi = require("joi");
// const home = require("./home");
const genres = require("../db/allGenres");
const router = express.Router();

router.get("/:id", (req, res) => {
  const genre = genres.find(genre => genre.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("this genre is not exist");
  res.send(genre);
});
router.post("/genre", (req, res) => {
  // check if there is bad request
  const { error } = validate(req.body); // req.body id json object and i want it to be object because of this i use the middleware function router.use(express.json())
  if (error) return res.status(400).send(error.details[0].message);
  const genre = {
    // after when i work with the database the id will be generated alone
    id: genres.length + 1,
    type: req.body.type
  };
  genres.push(genre);
  res.send(genre);
});
router.put("/:id", (req, res) => {
  const genre = genres.find(m => m.id === parseInt(req.params.id));
  if (!genre) return res.status(404).send("this genre is not exist");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  genre.type = req.body.type;
  res.send(genre);
});
router.delete("/:id", (req, res) => {
  const genre = genres.find(m => (m.id = parseInt(req.params.id)));
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});
// the validation function
function validate(genre) {
  const schema = {
    type: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema); // this return an object with two props 1_ error, 2_value
  // one of this prop is truthy. i am interesting in the error object.
  // if error so i want the details property which include the message property which i want to return it in the bad request.
}

module.exports = router;
