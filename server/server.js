const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

// ✅ HOME ROUTE (IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// ✅ Models
const Blog = require("./models/Blog");
const User = require("./models/User");

// ✅ MongoDB CONNECT
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// ✅ TEST ROUTE
app.get("/test", (req, res) => {
  res.send("Server working ✅");
});

// ✅ SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ message: "User saved ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ LOGIN (FIXED POSITION)
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    res.json({ message: "Login successful ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ CREATE BLOG
app.post("/api/blogs", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Missing fields ❌" });
    }

    const newBlog = new Blog({ title, content });
    await newBlog.save();

    res.json({ message: "Blog created ✅" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET ALL BLOGS
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ UPDATE BLOG
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

// ✅ DELETE BLOG
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted 🗑️" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ LIKE BLOG
app.put("/api/blogs/like/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    blog.likes += 1;
    await blog.save();

    res.json({ message: "Liked ❤️", likes: blog.likes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ SAVE BLOG
app.put("/api/blogs/save/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    blog.saved = !blog.saved;
    await blog.save();

    res.json({ message: "Saved 💾", saved: blog.saved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PORT FIX (VERY IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running 🚀");
});
