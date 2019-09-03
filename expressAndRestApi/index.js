// rest stand for representation state transfer its just a convention for building the http services.
// so what is this services: every server provide us with four main operation which is create,read,update, and delete. we use the http methods to implement this serveries.
// the HTTP methods are : post,get,update,delete.

// express is a great library for building servers
// big note: the req and the res are OBJECT because of this i use the dot notion to access their value
// here is the fun start
// express module is a function the calling of this function return and object with bunches of methods those methods are: get,post,update,delete
// const express = require("express"); // express module  is a function.
// const app = express(); // the return value of  calling this function is an object with methods, by convection i call this object app. get,post,put,delete,listen to create the server and  more..
// app.get("/", (req, res) => {
//   res.send("I JUST CREATE MY FIRST SERVER");
// }); // the callback in the get method called rout handling function. the req,and the res object have benches of very useful pros also so we could use it.
// app.get("/api/courses", (req, res) => {
//   res.send(`[1, 2, 3,s]`);
// });
// app.get("/api/courses/:id", (req, res) => {
//   res.send(req.params.id);
// });

// const port = process.env.PORT || 3000;

// app.listen(port, () => console.log(`the server is running in port ${port}`));

// installing nodemon for watching any change in the files so no need to run the server and stop it every time we do the changes
// we run the file with nodemon instead with node so nodemon index.js,nodemon is watching all the files in the folder and response

// The environment variables, some variable  have to be set in the production time like the port of the website, for this we use the process global object which is responsible to store the data we we want for after. this object have property called env witch is an obj this object have PORT prop so we can set it.
// so here the PORT id an env variable we set the env variable with command export in the terminal so
// export PORT =
// pramas are :some value what happen is all what we pass after the :will be stored like property in the pramas object, we could add many props to this object with :something/:something else.
//also we could pass query string which is any thing after the ? will be store in the query object which is a prop in the req object
const Joi = require("joi"); // joi is great package to handle ERROR VALIDATION, this return class
const express = require("express");
const app = express(); // app is the server now
app.use(express.json()); // the object in the body of the req is string, express.json()=== Json.stringify
const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" }
];
app.get("/", (req, res) => {
  res.send(courses);
});
app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id)); //when u try to get numbers from the pramas object convert it to number); all the values in the pramas obj are
  if (!course) return res.status(404).send("this course is not exist");
  res.send(course);
});
app.post("/api/courses", (req, res) => {
  // with joi package we defined schema object to validate the object that the user will pass it in the body of the req
  // after i create the schema i will pass the body obj to the validate method in joi to see if its valid.
  // the validationResult is an object
  // with two very important property are error and value.
  // if the validationResult is error so i will have the error object.
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course); // i have to send the course in the body of the res so the user will know the id
  // the object in the body of the request is a string we have to convert it to on with json, express doesn't have this function so we use middle ware function which is app.use(express.json())
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(course => course.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("this course is not exist");
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  course.name = req.body.name;
  res.send(course);
});
app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find(c => (c.id = parseInt(req.params.id)));
  if (!course) return res.status(404).send("this course is not exist");
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

const port = process.env.PORT || 3000;

app.listen(port);

function validate(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}
