// src/pages/Auth/Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", { email, password });
      login(data);
      toast.success("Login successful!");
      navigate(data.role === "admin" ? "/admin" : "/student");
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-900 via-slate-900 to-gray-900 text-white">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-2 text-white">
          Welcome Back 👋
        </h2>
        <p className="text-center text-gray-300 mb-6">
          Login to your account to continue
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-200 mb-1">Email</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2">
              <FiMail className="text-gray-300 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-200 mb-1">Password</label>
            <div className="flex items-center bg-white/10 border border-white/20 rounded-lg px-3 py-2">
              <FiLock className="text-gray-300 mr-2" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-transparent focus:outline-none text-white placeholder-gray-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-300 hover:text-white ml-2"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-linear-to-r from-indigo-500 to-purple-500 hover:opacity-90 transition-all text-white font-semibold py-2 rounded-lg flex justify-center items-center gap-2"
          >
            {loading ? "Logging in..." : <> <FiLogIn /> Login </>}
          </button>
        </form>

        <p className="text-sm text-center text-gray-300 mt-5">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
