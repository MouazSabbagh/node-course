const Joi = require("joi");
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

/**************** 
create the genreSchema
*/
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  }
});

/**************** 
  create the genreModel
  */
const Genre = mongoose.model("Genre", genreSchema);

/**************** 
  get all the genres
  */

// the validation function
function validate(genre) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(genre, schema); // this return an object with two props 1_ error, 2_value
  // one of this prop is truthy. i am interesting in the error object.
  // if error so i want the details property which include the message property which i want to return it in the bad request.
}

exports.Genre = Genre;
exports.validate = validate;
