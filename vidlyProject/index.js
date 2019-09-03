const express = require("express");
const app = express();
const Joi = require("joi");
app.use(express.json());
const port = (process.env.PORT = 5000 || 3000); // this is variable env the port will be set the production mood
const movies = [
  {
    id: 1,
    type: "action"
  },
  {
    id: 2,
    type: "romance"
  },
  {
    id: 1,
    type: "horror"
  }
];
app.get("/", (req, res) => {
  res.send(movies);
});
app.get("/api/movies/:id", (req, res) => {
  const movie = movies.find(movie => movie.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("this movie is not exist");
  res.send(movie);
});
app.post("api/movies", (req, res) => {
  // check if there is bad request
  const { error } = validate(req.body); // req.body id json object and i want it to be object because of this i use the middleware function app.use(express.json())
  if (error) return res.status(400).send(error.details[0].message);
  const movie = {
    id: movies.length + 1,
    type: req.body.type
  };
  movies.push(movie);
  res.send(movie);
});
app.put("/api/movies/:id", (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("this movie is not exist");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  movie.type = req.body.type;
  res.send(movie);
});
app.delete("/api/movies/:id", (req, res) => {
  const movie = movies.find(m => (m.id = parseInt(req.params.id)));
  const index = movies.indexOf(movie);
  movies.splice(index, 1);
  res.send(movie);
});
app.listen(port);

// the validation function
function validate(movie) {
  const schema = {
    type: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(movie, schema); // this return an object with two props 1_ error, 2_value
  // one of this prop is truthy. i am interesting in the error object.
  // if error so i want the details property which include the message property which i want to return it in the bad request.
}
