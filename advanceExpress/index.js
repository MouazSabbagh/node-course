const config = require("config");
const express = require("express");
const app = express();
const Joi = require("joi");
const logger = require("./logger/logger");
const morgan = require("morgan");
const startUpDebug = require("debug")("app:startUp");
const dbDebug = require("debug")("app:db");
// the path in post man http://localhost:5000/api/myMovies/whatever
app.use(express.json());

app.use(express.urlencoded({ extended: true })); // this is a built meddle ware function used mostly in forms req, its the same like json but instead the key value in the form will be stored as req.body. so when i want to create post req using the urlencoded.
// with extended = true i can pass array or complex object
app.use(express.static("public")); // note the static folder are served from the root of the site.
// the path will be localhost:5000/readme.txt(i did not put the folder public in the path)

// its better practice to put the custom middle ware function up together

// the third party middle ware , i go to expressjs.com resources their a olt of middle ware functions helmet and morgan are useful.

app.use((req, res, next) => {
  startUpDebug("authentication...");
  next();
  //the next method is a reference to the next method in the req process pipeline
});
app.use(logger);
const port = process.env.PORT || 3000; // this is  an env variable  the port will be set the production mood
// app.listen(port);

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
    type: "funny"
  }
];
app.get("/", (req, res) => {
  res.render("index", {
    title: "express course",
    message: "hello from jade (pug)"
  });
  startUpDebug("debug is working");
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
// the middle ware function is a function determinate the req res cycle, the rout handler is a middleware function also the express.json() because its read the req object the parse req.body and return it.
// the req process pipeline is the way between the req and res object all the functions in middle are
//middle ware function.

// i can create my middle ware function, note that app.use is a method used to install a middle ware function in the req process pipeline

// its very important i set the  environments in node js to determine which features should be enable or disable.
// in node the process obj have the env obj property which has the NODE_ENV property by setting this property i determine which env is running, if i did not set it it will be set to undefined
// console.log(`process.env.NODE_env is ${process.env.NODE_env}`); // this give === undefined
// console.log(app.get("env")); // with the get method in the app obj i get the env, if i didn't set it it will give development by default.

// i want morgan just run in the development env so:
// if (app.get("env") === "development") {
//   app.use(morgan("tiny"));
//   console.log("morgan enable "); // if i set the NODE_ENV to production with the export command morgan will not log
// }
app.listen(port, () => `listening in port ${port}`);

// configuration and env: i should write different configuration for each env and over writing according to the env that is running.
// there is rc npm for  managing config but also there is config which is a good package, i will go with config
// config its an obj with get method so we just set the env and use the dot notation to access its props
console.log(config.get("host.mail"));
app.get("env");

// sometime i want to set passwords for thr database or some other password. i donut store this type of info in the config files direct i set some variables env for those passwords. to that i create a file in the config folder with this name always:custom-environment-variable.json there i store the password property in the variable env
console.log(config.get("mail.password"));

///////////////// debug package is great one to debug my app:
// this package is return a function we call this function passing the name of the space that i am working on it so : const startUpDebug = require(debug)(app:startup)
// dbDebug = require(debug)(app:db)
// then i will set the DEBUG env to the name same that i wish to debug, so in the command line export DEBUG=app:startup or export DEBUG=app:db if i want to check all the debug export DEBUG=*

///////////////////////template engine////////////
//the best one in my opinion is pug, npm i pug then i should set the view engine of the app tp pug =>
// app.set("view engine","pug") the second set is default , where i should store my template:
// app.set("views",./views) that is mean all the template must be stored in the view folder.
// when i want to sent instead of send i use app.render("name of the file i want to send it,{title:"my app,message:"hello}")
app.set("view engine", "pug");
app.set("views", "./views");
