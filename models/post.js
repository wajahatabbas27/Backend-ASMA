const mongoose = require("mongoose");

const Post = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

// post ka model create krdia hai hmne aur hm ab yhi get krleinge posts api mein aur ismein data apna rkhleinge hm all the way
module.exports = mongoose.model("post", Post);
