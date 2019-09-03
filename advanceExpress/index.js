const express = require("express");
const app = express();
const Joi = require("joi");
const logger = require("./logger/logger");
const morgan = require("morgan");
// the path in post man http://localhost:5000/api/myMovies/whatever
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // this is a built meddle ware function used mostly in forms req, its the same like json but instead the key value in the form will be stored as req.body. so when i want to create post req using the urlencoded.
// with extended = true i can pass array or complex object
app.use(express.static("public")); // note the static folder are served from the root of the site.
// the path will be localhost:5000/readme.txt(i did not put the folder public in the path)

// its better practice to put the custom middle ware function up together

// the third party middle ware , i go to expressjs.com resources their a olt of middle ware functions helmet and morgan are useful.
app.use(morgan("tiny"));

app.use((req, res, next) => {
  console.log("authentication...");
  next();
  //the next method is a reference to the next method in the req process pipeline
});
app.use(logger);
const port = (process.env.PORT = 5000 || 3000); // this is variable env the port will be set the production mood

const myMovies = [
  {
    id: 1,
    type: "action"
  },
  {
    id: 2,
    type: "romance"
  },
  {
    id: 3,
    type: "horror"
  },
  {
    id: 4,
    type:
      "my name is moaz and i am the best programer, and i am the best Developer"
  }
];
app.get("/", (req, res) => {
  res.send(myMovies);
});
app.get("/api/myMovies/:id", (req, res) => {
  const movie = myMovies.find(movie => movie.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("this movie is not exist");
  res.send(movie);
});
app.post("/api/myMovies", (req, res) => {
  // check if there is bad request
  const { error } = validate(req.body); // req.body id json object and i want it to be object because of this i use the middleware function app.use(express.json())
  if (error) return res.status(400).send(error.details[0].message);
  const movie = {
    id: myMovies.length + 1,
    type: req.body.type
  };
  myMovies.push(movie);
  res.send(movie);
});
app.put("/api/myMovies/:id", (req, res) => {
  const movie = myMovies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send("this movie is not exist");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  movie.type = req.body.type;
  res.send(movie);
});
app.delete("/api/myMovies/:id", (req, res) => {
  const movie = myMovies.find(m => (m.id = parseInt(req.params.id)));
  const index = myMovies.indexOf(movie);
  myMovies.splice(index, 1);
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
// the middle ware function is a function determinate the req res cycle, the rout handler is a middleware function also the express.json() because its read the req object the parse req.body the return it.
// the req process pipeline is the way between the req and res object all the functions in middle are
//middle ware function.

// i can create my middle ware function, note that app.use is a method used to install a middle ware function in the req process pipeline
