import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <h2 className="logo">BlogNova 🚀</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/create">Create</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </div>
  );
}