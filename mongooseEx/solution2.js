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
  return await Course.find({
    isPublished: true
  })
    .or([{ tags: "frontend" }, { tags: "backend" }])
    .sort({ price: -1 })
    .select({ name: 1, author: 1, price: 1 });
}

async function display() {
  const courses = await getCourses();
  console.log(courses);
}
display();
