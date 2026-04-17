const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,

  likes: {
    type: [String],
    default: []
  },

  saved: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model("Blog", blogSchema);