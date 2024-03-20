const mongoose = require("mongoose");
// config is liye chahiye hai kionke mongo ke uri ko use kreinge hm config ke thorugh bulake.
const config = require("config");

// yh function hai jiske through hm database connect krrhe hain apne pass
const connectDB = async () => {
  try {
    await mongoose.connect(config.get("mongoURI"));
    console.log("MongoDB connected!");
  } catch (err) {
    console.log("Error:", err.message);
    process.exit(1);
  }
};

// export krdia hai hmne apne function ko jo database ka hmne bnaya hai.
module.exports = connectDB;
