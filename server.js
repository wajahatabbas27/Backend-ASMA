const express = require("express");
const app = express();

// Calling the connectDB function from the db.js file that contains the connectivity of the database.
const connectDB = require("./config/db");

// Database connectivity function called.
connectDB();

// json mein work krne ke liye yh krna zrori hai
app.use(express.json({ extended: false }));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).json({ msg: "This is ASMA" });
});

// app.use("/api/auth", require("./routes/auth"));
// app.use("/api/users", require("./routes/users"));
// app.use("/api/posts", require("./routes/posts"));

app.listen(PORT, () => {
  console.log(`Server has been started\nhttp:localhost:${PORT}`);
});
