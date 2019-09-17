// first step connect to db
//second create the schema
//third create the class
//forth create the get function

const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("connect to db"))
  .catch(err => console.log("err", err));

const courseSchema = mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  price: Number,
  isPublished: Boolean
});
const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find({ isPublished: true })
    .or([{ price: { $gte: 15 } }, { name: /.*by.*/i }])
    .sort("-price");
}

async function display() {
  const courses = await getCourses();
  console.log(courses);
}
display();
