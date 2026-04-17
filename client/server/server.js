const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.log("DB Error ❌", err));

/* =========================
   MODELS
========================= */
const Blog = require("./models/Blog");
const User = require("./models/User");

/* =========================
   TEST ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

/* =========================
   AUTH ROUTES
========================= */

// SIGNUP
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists ❌" });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.json({ message: "User created successfully ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required ❌" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found ❌" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Wrong password ❌" });
    }

    res.json({ message: "Login successful ✅", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   BLOG ROUTES
========================= */

// CREATE BLOG
app.post("/api/blogs", async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Missing fields ❌" });
    }

    const newBlog = new Blog({
      title,
      content,
      likes: 0,
      saved: false
    });

    await newBlog.save();

    res.json({ message: "Blog created ✅" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET BLOGS
app.get("/api/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE BLOG
app.put("/api/blogs/:id", async (req, res) => {
  try {
    const { title, content } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found ❌" });
    }

    res.json({ message: "Updated ✏️", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE BLOG
app.delete("/api/blogs/:id", async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found ❌" });
    }

    res.json({ message: "Deleted 🗑️" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LIKE BLOG
app.put("/api/blogs/like/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found ❌" });
    }

    blog.likes = (blog.likes || 0) + 1;
    await blog.save();

    res.json({ message: "Liked ❤️", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// SAVE BLOG
app.put("/api/blogs/save/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found ❌" });
    }

    blog.saved = !blog.saved;
    await blog.save();

    res.json({ message: "Saved 💾", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   START SERVER
========================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});