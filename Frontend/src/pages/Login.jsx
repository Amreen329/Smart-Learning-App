import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      const { data } = await API.post("/auth/login", {
  email,
  password,
});

console.log("Login Response:", data);

if (!data?.token) {
  setError("Invalid response from server");
  return;
}

login(data);
navigate("/dashboard");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      setError(message);
    }
  };
  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-left">
          <h1>Smart Learning</h1>

          <p>
            Learn Skills <br />
            Track Progress <br />
            Get Placed
          </p>
        </div>

        <div className="login-right">
          <h2>Welcome Back</h2>

          <form onSubmit={handleLogin}>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="submit"
              className="login-btn"
            >
              Login
            </button>

            {error && <div className="form-error">{error}</div>}
          </form>

          <div className="register-link">
            New User? <Link to="/register">Register</Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Login;
