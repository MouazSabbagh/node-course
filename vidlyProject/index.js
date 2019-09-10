const express = require("express");
const genres = require("./routs/genres");
const home = require("./routs/home");
const port = process.env.PORT || 3000; // this is variable env the port will be set the
//production mood

const app = express();
app.use(express.json()); // parse the incoming object
app.use("/", home);
app.use("/api/genres", genres);

app.listen(port);
