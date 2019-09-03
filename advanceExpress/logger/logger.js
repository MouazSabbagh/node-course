function log(req, res, next) {
  console.log("the middle ware function is running");
  next();
}
module.exports = log;
