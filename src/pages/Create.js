import { useState } from "react";
import axios from "axios";

// ✅ Central API URL
const API = import.meta.env.VITE_API_URL || "https://bloggingweb-5trn.onrender.com";

export default function Create() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = async () => {
    if (!title || !content) {
      alert("Fill all fields");
      return;
    }

    console.log("Sending:", title, content);

    try {
      const res = await axios.post(`${API}/api/blogs`, {
        title,
        content,
      });

      alert(res.data.message);

      window.location.href = "/";
    } catch (err) {
      console.log("ERROR:", err);
      alert(err.response?.data?.message || "Error creating blog ❌");
    }
  };

  return (
    <div className="container">
      <h2>Create Blog ✍️</h2>

      <input
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Content"
        onChange={(e) => setContent(e.target.value)}
      />

      <button onClick={handlePost}>Post</button>
    </div>
  );
}