import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:5000/api/login", {
      email,
      password,
    });

    alert(res.data.message);

    // ✅ ADD THIS LINE (redirect)
    window.location.href = "/";

  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="container">
      <h2>Login 🔐</h2>

      <input
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}