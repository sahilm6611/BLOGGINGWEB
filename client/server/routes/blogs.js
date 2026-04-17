const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// GET ALL BLOGS
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.status(500).json(err.message);
  }
});
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json("User not found");
    }

    if (user.password !== req.body.password) {
      return res.status(400).json("Wrong password");
    }

    res.json(user);

  } catch (err) {
    res.status(500).json(err.message);
  }
});

// LIKE BLOG
router.put("/like/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json("Blog not found");
    }

    const userId = req.body.userId;

    if (!userId) {
      return res.status(400).json("UserId required");
    }

    if (blog.likes.includes(userId)) {
      blog.likes = blog.likes.filter(id => id !== userId);
    } else {
      blog.likes.push(userId);
    }

    await blog.save();
    res.json(blog);

  } catch (err) {
    console.log("ERROR 👉", err);
    res.status(500).json(err.message);
  }
});

module.exports = router;