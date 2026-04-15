import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  // ✅ IMPORTANT BASE URL (DEPLOY LINK)
  const BASE_URL = "https://bloggingweb-1-rejs.onrender.com";

  // ✅ FETCH BLOGS
  const fetchBlogs = () => {
    axios.get(`${BASE_URL}/api/blogs`)
      .then((res) => {
        setBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ✅ DELETE BLOG
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ UPDATE BLOG
  const updateBlog = async (id) => {
    const newTitle = prompt("Enter new title");
    const newContent = prompt("Enter new content");

    if (!newTitle || !newContent) return;

    try {
      await axios.put(`${BASE_URL}/api/blogs/${id}`, {
        title: newTitle,
        content: newContent,
      });
      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ LIKE BLOG
  const likeBlog = async (id) => {
    try {
      await axios.put(`${BASE_URL}/api/blogs/like/${id}`);
      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ SAVE BLOG
  const saveBlog = async (id) => {
    try {
      await axios.put(`${BASE_URL}/api/blogs/save/${id}`);
      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h1>All Blogs 🚀</h1>

      {blogs.length === 0 ? (
        <p>No blogs yet 😅</p>
      ) : (
        blogs.map((blog) => (
          <div key={blog._id} style={{ marginBottom: "15px" }}>
            <h3>{blog.title}</h3>
            <p>{blog.content}</p>

            <button onClick={() => updateBlog(blog._id)}>
              Update ✏️
            </button>

            <button onClick={() => deleteBlog(blog._id)}>
              Delete 🗑️
            </button>

            <button onClick={() => likeBlog(blog._id)}>
              ❤️ {blog.likes || 0}
            </button>

            <button onClick={() => saveBlog(blog._id)}>
              {blog.saved ? "Saved 💾" : "Save"}
            </button>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}