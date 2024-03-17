const mongoose = require("mongoose");

// kis trhn ka data hmein chahiye hai wo hm yhn pe krleinge ke hmein kis trhn ka data chahiye hai wo hm schema mein define krdeinge all the way
// Required se yh hoga ke iska matlab hai yh zrori lazmi chahiye hai
const User = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// is trhn se model ko export kreinge hm aur jhn pe users ke model ko use krna hoga hm whn pe isko use krleinge all the way
module.exports = mongoose.model("user", User);
