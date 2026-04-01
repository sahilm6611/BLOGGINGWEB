const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

const Blog = require("./models/Blog");

// ✅ MongoDB CONNECT (MISSING HOTA)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ✅ Model import
const User = require("./models/User");

// ✅ TEST ROUTE (debug sathi)
app.get("/test", (req, res) => {
  res.send("Server working ✅");
});

// ✅ SIGNUP ROUTE
app.post("/api/signup", async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const { name, email, password } = req.body;

    const newUser = new User({
      name,
      email,
      password,
    });

    await newUser.save();

    res.json({ message: "User saved ✅" });
  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ error: err.message });
  }
}); 
app.post("/api/blogs", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Missing fields ❌" });
    }

    const newBlog = new Blog({
      title,
      content,
    });

    await newBlog.save();

    res.json({ message: "Blog created ✅" });

  } catch (err) {
    console.log("ERROR FULL:", err); // 🔥 THIS LINE IMPORTANT
    res.status(500).json({ error: err.message });
  }
});
// UPDATE BLOG
app.put("/api/blogs/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    res.json({ message: "Blog updated ✅", updatedBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// DELETE BLOG
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);

    res.json({ message: "Blog deleted 🗑️" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL BLOGS
app.get("/api/blogs", async (req, res) => {
  try {
    console.log("GET BLOGS HIT ✅");

    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});
// ✅ PORT
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
  app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // user find करा
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    // password check करा
    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    res.json({ message: "Login successful ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
    
  }
});
});
