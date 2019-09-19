const express = require("express");
const mongoose = require("mongoose");
const genres = require("./routes/genres");
const customers = require("./routes/customers");
const app = express();

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("connected to mongo db..."))
  .catch(() => console.error("could not connect to mongo db..."));

app.use(express.json()); // parse the incoming object

app.use("/api/genres", genres);
app.use("/api/customers", customers);

const port = process.env.PORT || 3000; // this is variable env the port will be set the
//production mood

app.listen(port);
