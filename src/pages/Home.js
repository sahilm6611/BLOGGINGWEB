import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  // ✅ FETCH BLOGS
  const fetchBlogs = () => {
    axios.get("http://localhost:5000/api/blogs")
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
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
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
      await axios.put(`http://localhost:5000/api/blogs/${id}`, {
        title: newTitle,
        content: newContent,
      });

      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ LIKE BLOG (FIXED)
  const likeBlog = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/like/${id}`, {
        userId: "123" // 👈 important
      });
      fetchBlogs();
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ SAVE BLOG
  const saveBlog = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/blogs/save/${id}`);
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

            {/* UPDATE */}
            <button onClick={() => updateBlog(blog._id)}>
              Update ✏️
            </button>

            {/* DELETE */}
            <button onClick={() => deleteBlog(blog._id)}>
              Delete 🗑️
            </button>

            {/* LIKE */}
            <button onClick={() => likeBlog(blog._id)}>
              ❤️ {blog.likes?.length || 0}
            </button>

            {/* SAVE */}
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