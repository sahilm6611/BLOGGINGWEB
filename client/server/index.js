const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server running");
});

app.post("/api/signup", (req, res) => {
  const { name, email, password } = req.body;

  res.json({
    message: "Signup successful"
  });
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});