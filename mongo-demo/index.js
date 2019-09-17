const mongoose = require("mongoose"); // mongoose is an object
mongoose
  .connect("mongodb://localhost:27017/playground") // mongoose.connect return promise
  .then(() => console.log("connected to mongodb! am i .."))
  .catch(err => console.error("could not connect to mongodb..", err));

// we create a Schema

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean
});
const Course = mongoose.model("Course", courseSchema); // mongoose.model("class", the schema) return class

// to insert documents in db we create an instance of our class and use .save() method

async function createCourse() {
  const course = new Course({
    name: "node",
    author: "Achille",
    tags: ["Node", "backend"],
    isPublished: true
  });
  const result = await course.save();
}

// to get documents, in our Class there are baches of method :.find .findOne .findOneById ...

async function getCourses() {
  // we can filter .find() by passing an object // to get  specific data
  const courses = await Course.find({ author: "Achille" })
    .limit() // we could pass number to limit method for certain the limit.
    .sort() // take an object the prop we want to sort, have two value 1 or -1
    .select(); // if we want to select certain data from our document so its take an object with the data that we want to pass

  console.log(courses);
}
getCourses();

/*
the comparison operator in mongodb 
1- eq => eq
2- ne => not equal
3- gt => greater then
4- gte => greater then or equal to

5- lt => less then
6- lte => less then or equal to
7- in
8- nin
// for example if i want to get the course with price is greater then 10
// .find({price:{$gt:10}}) in the way i use the comparison operator.
// what if i want the course when the price is between 10 and 20$
.find({price:{$gt:10,$lse:20}})
what if i want to get the courses 10 or 15 or 20 $
so .find({price:{$in:[10,15,20]}})


***********************
the logical query operator in mongodb
if i want to get the course when the author is moaz or the course that are published so we use 
query operator .or
so .find()
    .or([{author:moaz},{isPublish:true}])


    ***************************
    regular Expression
    i should learn more about the regex
    .find({author:/^pattern/i}) ^this mean start $in the end mean end
    regex for the word contain pattern /.*pattern.
    *************************
    if i want to get the count of documents in db after the find method.find({what evr})
    .count()

    **************************
    pagination in mongodb
    the method that go hand by hand with the limit method is the skip() method
    const pageNum = 2;
    const pageSize = 10
    .find()
    .skip((pageNum-1)*pageSize)
    .limit(pageSize)
    
    
    
    */
