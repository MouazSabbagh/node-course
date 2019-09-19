const express = require("express");
const { Genre, validate } = require("../models/genre");

const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find().sort({ name: 1 });
  res.send(genres);
});

/**************** 
get all the genres
*/

router.get("/:id", async (req, res) => {
  // if its not work try findOne
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send("this genre is not exist");
  res.send(genre);
});
router.post("/", async (req, res) => {
  // check if there is bad request
  const { error } = validate(req.body); // req.body id json object and i want it to be object because of this i use the middleware function router.use(express.json())
  if (error) return res.status(400).send(error.details[0].message);

  /**************** 
create an instance from the Genre and save it in db
*/

  let genre = new Genre({
    name: req.body.name
  });
  genre = await genre.save(genre);
  res.send(genre);
});

router.put("/:id", async (req, res) => {
  //   const genre = Genre.findOneAndUpdate({ _id: req.params.id }); check this solution if its not
  //work

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );

  if (!genre) return res.status(404).send("this genre is not exist");

  res.send(genre);
});
router.delete("/:id", async (req, res) => {
  //   const genre = Genre.findOneAndRemove({ _id: req.params.id }); check this solution if its not
  //work

  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send("this genre is not exist");

  res.send(genre);
});

module.exports = router;
